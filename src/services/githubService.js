// services/githubService.js - VERSIÓN CORREGIDA CON UTF-8

const GITHUB_CONFIG = {
  owner: import.meta.env.VITE_GITHUB_OWNER,
  repo: import.meta.env.VITE_GITHUB_REPO,
  token: import.meta.env.VITE_GITHUB_TOKEN,
  branch: 'main',
  dataPath: 'data/news.json',
};

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.headers = {
      'Authorization': `token ${GITHUB_CONFIG.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Codificar string a Base64 con soporte UTF-8 correcto
   */
  encodeBase64UTF8(str) {
    // Convertir string a UTF-8 bytes
    const utf8Bytes = new TextEncoder().encode(str);
    // Convertir bytes a string binario
    const binaryString = String.fromCharCode(...utf8Bytes);
    // Codificar a Base64
    return btoa(binaryString);
  }

  /**
   * Decodificar Base64 a string con soporte UTF-8 correcto
   */
  decodeBase64UTF8(base64) {
    // Decodificar Base64 a string binario
    const binaryString = atob(base64);
    // Convertir string binario a bytes
    const bytes = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
    // Decodificar bytes como UTF-8
    return new TextDecoder().decode(bytes);
  }

  /**
   * Obtener el contenido actual del archivo news.json
   */
  async getNewsData() {
    try {
      const url = `${this.baseURL}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataPath}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        if (response.status === 404) {
          // El archivo no existe aún, devolver estructura vacía
          console.log('📝 Archivo no existe, estructura vacía');
          return { news: [], sha: null };
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Decodificar correctamente con UTF-8
      const decodedContent = this.decodeBase64UTF8(data.content);
      const newsData = JSON.parse(decodedContent);
      
      console.log('✅ Datos cargados ');
      
      return {
        news: newsData.news || [],
        sha: data.sha,
      };
    } catch (error) {
      console.error('❌ Error obteniendo datos de GitHub:', error);
      throw error;
    }
  }

  /**
   * Guardar/actualizar el archivo news.json en GitHub
   */
  async saveNewsData(newsArray, sha = null) {
    try {
      console.log('💾 Guardando datos en GitHub...');
      
      const url = `${this.baseURL}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataPath}`;
      
      // Crear el contenido del archivo con formato bonito
      const fileContent = JSON.stringify({ news: newsArray }, null, 2);
      
      // Codificar correctamente a Base64 con UTF-8
      const encodedContent = this.encodeBase64UTF8(fileContent);

      const body = {
        message: `Actualizar noticias - ${new Date().toLocaleString('es-AR')}`,
        content: encodedContent,
        branch: GITHUB_CONFIG.branch,
      };

      // Si existe SHA, incluirlo (necesario para actualizar)
      if (sha) {
        body.sha = sha;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message}`);
      }

      const result = await response.json();
      console.log('✅ Datos guardados exitosamente en GitHub');
      
      return result;
    } catch (error) {
      console.error('❌ Error guardando en GitHub:', error);
      throw error;
    }
  }

  /**
   * Crear una nueva noticia
   */
  async createNews(newsData) {
    try {
      const { news: currentNews, sha } = await this.getNewsData();
      
      const newId = currentNews.length > 0 
        ? Math.max(...currentNews.map(n => n.id)) + 1 
        : 1;
      
      const newNews = {
        ...newsData,
        id: newId,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };
      
      const updatedNews = [...currentNews, newNews];
      await this.saveNewsData(updatedNews, sha);
      
      return newNews;
    } catch (error) {
      console.error('Error creando noticia:', error);
      throw error;
    }
  }

  /**
   * Actualizar una noticia existente
   */
  async updateNews(id, newsData) {
    try {
      const { news: currentNews, sha } = await this.getNewsData();
      
      const updatedNews = currentNews.map(news => 
        news.id === id 
          ? { ...news, ...newsData, updatedAt: new Date().toISOString() }
          : news
      );
      
      await this.saveNewsData(updatedNews, sha);
      
      return updatedNews.find(n => n.id === id);
    } catch (error) {
      console.error('Error actualizando noticia:', error);
      throw error;
    }
  }

  /**
   * Eliminar una noticia
   */
  async deleteNews(id) {
    try {
      const { news: currentNews, sha } = await this.getNewsData();
      const updatedNews = currentNews.filter(news => news.id !== id);
      await this.saveNewsData(updatedNews, sha);
      return true;
    } catch (error) {
      console.error('Error eliminando noticia:', error);
      throw error;
    }
  }

  /**
   * Obtener una noticia por ID
   */
  async getNewsById(id) {
    try {
      const { news } = await this.getNewsData();
      return news.find(n => n.id === id);
    } catch (error) {
      console.error('Error obteniendo noticia:', error);
      throw error;
    }
  }

  /**
   * Obtener todas las noticias
   */
  async getAllNews() {
    try {
      const { news } = await this.getNewsData();
      return news;
    } catch (error) {
      console.error('Error obteniendo noticias:', error);
      throw error;
    }
  }

  /**
   * Inicializar el repositorio
   */
  async initializeRepo() {
    try {
      const { sha } = await this.getNewsData();
      
      if (!sha) {
        await this.saveNewsData([]);
        console.log('✅ Repositorio inicializado');
      } else {
        console.log('✅ Repositorio ya existe');
      }
    } catch (error) {
      console.error('Error inicializando repositorio:', error);
      throw error;
    }
  }

  /**
   * Verificar conexión
   */
  async testConnection() {
    try {
      const url = `${this.baseURL}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`No se pudo conectar: ${response.status}`);
      }

      const repoData = await response.json();
      console.log('✅ Conexión exitosa con GitHub');
      console.log(`📦 Repositorio: ${repoData.full_name}`);
      
      return {
        success: true,
        repo: repoData.full_name,
        private: repoData.private
      };
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Probar codificación/decodificación con caracteres especiales
   */
  testEncoding() {
    const testStrings = [
      'España ñ á é í ó ú',
      'Tucumán',
      'José García',
      'Año 2025',
      '¿Cómo estás?',
      '¡Hola! Adiós'
    ];

    console.log('🧪 Test de codificación UTF-8:');
    
    testStrings.forEach(str => {
      const encoded = this.encodeBase64UTF8(str);
      const decoded = this.decodeBase64UTF8(encoded);
      const match = str === decoded ? '✅' : '❌';
      console.log(`${match} "${str}" → "${decoded}"`);
    });
  }
}

// Exportar instancia singleton
const githubService = new GitHubService();
export default githubService;