import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white">
      <div className="container flex justify-center items-center py-8">
        <section className="flex space-x-4">
          <a href="https://www.facebook.com" className="social-icon transition-colors duration-300 hover:text-red-500">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/home?lang=en" className="social-icon transition-colors duration-300 hover:text-red-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" className="social-icon transition-colors duration-300 hover:text-red-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/home?originalSubdomain=in" className="social-icon transition-colors duration-300 hover:text-red-500">
            <i className="fab fa-linkedin"></i>
          </a>
        </section>
      </div>

      <div className="py-4 text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
        <p>&copy; {new Date().getFullYear()} Aspiring Abroad. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
