// ui/Section.jsx
import React from "react";

const Section = ({
  children,
  className = "",
  bgColor = "bg-white",
  py = "py-12",
  ...props
}) => {
  // Filtrar la prop 'jsx' que no debe ir al DOM
  const { jsx, ...domProps } = props;
  
  return (
    <section className={`${bgColor} ${py} ${className}`} {...domProps}>
      {children}
    </section>
  );
};

export default Section;