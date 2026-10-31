"use client";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const navItems = [
    { name: "Home", id: "Home" },
    { name: "About", id: "About" },
  ];

  useEffect(() => {
    // Tracks active section on scroll
    const handleScroll = () => {
      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 120;
          const bottom = top + section.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("Home")}
          className="text-lg font-bold tracking-tight text-black hover:opacity-80 transition-opacity cursor-pointer"
        >
          Mrs. Christen Zakaria
        </button>

        <ul className="flex items-center gap-8 text-sm font-medium">
          {navItems.map(({ name, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  active === id ? "text-black font-semibold" : "text-neutral-500 hover:text-black"
                }`}
              >
                {name}
                {active === id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
