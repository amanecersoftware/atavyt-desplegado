
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./context/AuthContext";
import { NewsProvider } from "./context/NewsContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./components/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import NewsImproved from "./pages/NewsImproved";
import NewsDetailImproved from "./pages/NewsDetailImproved";
import Authorities from "./pages/Authorities";
import Statutes from "./pages/Statutes";
import AdminLogin from "./pages/admin/Adminlogin";
import AdminDashboard from "./pages/admin/Admindashboard";
import NewsForm from "./pages/admin/Newsform";

// Scroll to top on route change
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <NewsProvider>
              <Loader onLoadComplete={() => setIsLoading(false)} />

              <div className={isLoading ? 'hidden' : 'block'}>
                <ScrollToTopOnRouteChange />

                <Routes>
                  <Route path="/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/news/create"
                    element={
                      <ProtectedRoute>
                        <NewsForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/news/edit/:id"
                    element={
                      <ProtectedRoute>
                        <NewsForm />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/*"
                    element={
                      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                        <Header />
                        <main className="flex-grow">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/membership" element={<Membership />} />
                            <Route path="/authorities" element={<Authorities />} />
                            <Route path="/statutes" element={<Statutes />} />
                            <Route path="/news" element={<NewsImproved />} />
                            <Route path="/news/:id" element={<NewsDetailImproved />} />
                            <Route path="/contact" element={<Contact />} />
                          </Routes>
                        </main>
                        <Footer />
                      </div>
                    }
                  />
                </Routes>
              </div>
            </NewsProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;