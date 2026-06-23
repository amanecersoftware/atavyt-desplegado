// ui/Logo.jsx - Mejorado para modo oscuro
import React from "react";
import { Link } from "react-router-dom";
import logoAta from "../assets/images/logoAta.png";

const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <div className="relative group">
        {/* Logo para modo claro */}
        <img
          src={logoAta}
          alt="ATAVYT Logo"
          className="h-16 w-auto dark:hidden transition-all duration-300 group-hover:scale-105"
        />
        
        {/* Logo para modo oscuro - con filtro para mejorar visibilidad */}
        <img
          src={logoAta}
          alt="ATAVYT Logo"
          className="h-16 w-auto hidden dark:block transition-all duration-300 group-hover:scale-105"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    </Link>
  );
};

export default Logo;