import React from "react";

export default function About() {
  const elements = [
    {
      number: "01",
      symbol: "Ap",
      title: "AP Chemistry",
      desc: "College-Board syllabus, advanced problem-solving, and exam rigor.",
      accent: "Advanced Placement",
    },
    {
      number: "02",
      symbol: "Cg",
      title: "Cambridge IGCSE",
      desc: "Core science literacy, practical inquiry, and foundational syllabus mastery.",
      accent: "Cambridge International",
    },
    {
      number: "03",
      symbol: "As",
      title: "AS & A2 Level",
      desc: "In-depth pre-university chemistry, physical, organic, and inorganic synthesis.",
      accent: "A-Level Excellence",
    },
    {
      number: "04",
      symbol: "Y9",
      title: "Year 9 Preparation",
      desc: "Early foundational science bridge ensuring seamless transition to IGCSE.",
      accent: "Foundation Bridge",
    },
    {
      number: "05",
      symbol: "Ex",
      title: "Edexcel Chemistry",
      desc: "Extensive experience across UK curricula with broad comparative insight.",
      accent: "UK Curriculum",
    },
  ];

  return (
    <section
      id="About"
      className="w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center items-center bg-transparent text-black border-t border-neutral-200/80"
    >
      <div className="max-w-5xl w-full flex flex-col gap-16">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-500">
            Background & Expertise
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
            About Mrs. Christen
          </h2>
          <div className="w-10 h-0.5 bg-neutral-900 mt-1" />
        </div>

        {/* 1. Creative Chemistry Reaction Equation (Teaching Philosophy) */}
        <div className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-neutral-200 bg-white/85 backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              The Teaching Equation
            </span>
            <span className="text-xs font-medium text-neutral-400">
              ΔH &lt; 0 · Catalyzed Success
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 py-4 text-center">
            {/* Reactant 1 */}
            <div className="flex flex-col items-center justify-center px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/90 min-w-[150px] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Reactant 1</span>
              <span className="text-sm font-bold text-neutral-900 mt-0.5">Complex Concepts</span>
            </div>

            {/* Plus Operator */}
            <span className="text-lg font-bold text-neutral-300 select-none">+</span>

            {/* Reactant 2 */}
            <div className="flex flex-col items-center justify-center px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/90 min-w-[150px] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Reactant 2</span>
              <span className="text-sm font-bold text-neutral-900 mt-0.5">Clear Foundations</span>
            </div>

            {/* Catalyst & Responsive Reaction Vector Arrow */}
            <div className="flex flex-col items-center justify-center px-2 py-1 my-1 md:my-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200/90 whitespace-nowrap mb-1.5 shadow-2xs">
                Catalyst: Mrs. Christen · 5+ Yrs
              </span>
              {/* Horizontal Arrow on Desktop */}
              <svg
                className="hidden md:block w-24 h-4 text-neutral-400"
                viewBox="0 0 96 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="0" y1="8" x2="88" y2="8" stroke="currentColor" strokeWidth="1.8" />
                <polyline points="82,3 89,8 82,13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* Downward Arrow on Mobile */}
              <svg
                className="block md:hidden w-4 h-7 text-neutral-400"
                viewBox="0 0 16 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="8" y1="0" x2="8" y2="22" stroke="currentColor" strokeWidth="1.8" />
                <polyline points="3,17 8,23 13,17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Product */}
            <div className="flex flex-col items-center justify-center px-5 py-3 rounded-xl border border-neutral-900 bg-neutral-900 text-white min-w-[170px] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">Target Result</span>
              <span className="text-sm font-bold mt-0.5">Exam Confidence & A*</span>
            </div>
          </div>
        </div>

        {/* 2. Periodic Table Element Tiles (Curricula Specializations) */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-neutral-900">
                Curricula & Specializations
              </h3>
              <p className="text-[11px] text-neutral-500">
                Structured like elements on the Periodic Table
              </p>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              5 Core Syllabi
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {elements.map((el) => (
              <div
                key={el.symbol}
                className="group relative p-5 rounded-2xl border border-neutral-200 bg-white/85 backdrop-blur-sm hover:border-black transition-all hover:shadow-sm flex flex-col justify-between gap-4"
              >
                {/* Element Header */}
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-mono font-bold text-neutral-400 group-hover:text-black transition-colors">
                    {el.number}
                  </span>
                  <span className="text-[9px] font-medium tracking-wider uppercase text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                    {el.accent}
                  </span>
                </div>

                {/* Element Symbol & Title */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900">
                      {el.symbol}
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900">
                      {el.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed mt-1">
                    {el.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Concise Mission Callout Banner */}
        <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm text-center flex flex-col items-center gap-2 shadow-2xs">
          <p className="text-sm sm:text-base font-medium text-neutral-800 max-w-2xl italic leading-relaxed">
            “My mission is to turn Chemistry from a challenging subject into an exciting journey of discovery!”
          </p>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
            — Mrs. Christen Zakaria
          </span>
        </div>
      </div>
    </section>
  );
}
