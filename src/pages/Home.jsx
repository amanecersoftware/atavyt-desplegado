import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "./Services";
import Testimonials from "../components/Testimonials";
import Map from "../components/Map";
import InstitutionalSection from "../components/InstitutionalSection";
import SocialFeed from "../components/SocialFeed";
import TravelNews from "../components/TravelNews";
import Partners from "../components/Partners";
import useScrollReveal from "../components/useScrollReveal";
import HeroImproved from "../components/HeroImproved";

const Home = () => {
    useScrollReveal();
  return (
    <div>
      <HeroImproved />
      <About />
      <Services />
      <InstitutionalSection /> 
      <TravelNews />
      <Partners />
      <Testimonials />
      <Map />
      <SocialFeed />
    </div>
  );
};

export default Home;
