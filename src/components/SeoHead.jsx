
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = 'ATAVYT',
  description = 'Asociación Tucumana de Agencias de Viajes y Turismo',
  image = '/og-image.jpg',
  url = window.location.href
}) => {
  return (
    <Helmet>
      {/* meta*/}
      <title>{title} | ATAVYT</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${title} | ATAVYT`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ATAVYT`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;