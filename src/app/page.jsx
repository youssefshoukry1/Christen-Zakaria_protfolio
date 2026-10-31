"use client";
import React from "react";
import Image from "next/image";
import About from "./About/About";

export default function Home() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="Home"
        className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full gap-8 lg:gap-14 px-6 sm:px-12 pt-24 pb-16 bg-transparent text-black"
      >
        {/* Circular Profile Picture (Edge-to-Edge) */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 shrink-0 rounded-full overflow-hidden border-2 border-neutral-200 shadow-sm">
          <Image
            src="/prfile-pic.jpeg"
            alt="Mrs. Christen Zakaria"
            fill
            priority
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
            className="object-cover object-[center_36%]"
          />
        </div>

        {/* Content Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg gap-3">
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-neutral-100 text-neutral-700 rounded-full border border-neutral-200">
            Chemistry Educator
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
            Mrs. Christen Zakaria
          </h1>

          <p className="text-base sm:text-lg font-medium text-neutral-700">
            Making Chemistry Click
          </p>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
            5+ years specializing in AP, Cambridge (IGCSE, AS & A2), and Year 9. Simplifying complex concepts into confident exam mastery.
          </p>

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              onClick={scrollToAbout}
              className="px-5 py-2.5 rounded-xl bg-black text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />
    </>
  );
}
