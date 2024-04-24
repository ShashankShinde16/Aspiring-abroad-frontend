import React,{useEffect, useState} from "react";

export default function CountryCard({ colour, country, onClick }) {
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

  return (
    <div 
      className={`sm:w-72 w-80 border border-gray-800 m-2 sm:m-6 p-4 sm:p-6 rounded-3xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer overflow-hidden ${scrollDirection === "down" ? "animated-text" : ""}`}
      style={{ background: colour}}
      onClick={onClick}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <p className="text-white text-center font-semibold text-xl mb-2">{country}</p>
        </div>
      </div>
    </div>
  );
}
