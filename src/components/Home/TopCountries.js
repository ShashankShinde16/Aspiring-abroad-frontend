import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import { useCountry } from "../CountryContext";
import { Link } from "react-router-dom";

export default function TopCountries() {
  const { updateSelectedCountry } = useCountry();
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (country) => {
    updateSelectedCountry(country);
  };

  return (
    <div className="font-mono flex flex-col lg:flex-row bg-gray-900 text-white" style={{backgroundImage: `url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <div className="pt-6 w-screen flex flex-col justify-center items-center">
        <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${scrollDirection === "down" ? "animated-text" : ""}`}>Top Countries</h1>
        <div className="flex flex-wrap justify-center text-lg mb-4">
          <Link to="/community" onClick={() => handleClick("USA")}>
            <CountryCard colour={"#c51616"} country={"USA"} />
          </Link>
          <Link to="/community" onClick={() => handleClick("UK")}>
            <CountryCard colour={"#307CED"} country={"UK"} />
          </Link>
          <Link to="/community" onClick={() => handleClick("France")}>
            <CountryCard colour={"#08982E"} country={"France"} />
          </Link>
          <Link to="/community" onClick={() => handleClick("Germany")}>
            <CountryCard colour={"#FD7E22"} country={"Germany"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
