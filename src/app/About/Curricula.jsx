"use client";

import { useState } from "react";

const programmes = [
  {
    symbol: "Y9",
    title: "Year 9 Chemistry",
    group: "Foundation",
    text: "Get ready for IGCSE by learning what matter is made of, how to recognise a chemical change and what to look for in a simple experiment.",
  },
  {
    symbol: "IG",
    title: "Cambridge IGCSE Chemistry",
    group: "Cambridge",
    text: "Connect the core topics to practical work, then practise explaining observations and showing your reasoning in exam questions.",
  },
  {
    symbol: "AS",
    title: "Cambridge AS Level Chemistry",
    group: "Cambridge",
    text: "Go deeper into physical, inorganic and organic chemistry. Work through calculations, interpret experimental data and explain reaction patterns.",
  },
  {
    symbol: "A2",
    title: "Cambridge A2 Level Chemistry",
    group: "Cambridge",
    text: "Build on AS knowledge by tackling questions that draw on several topics and using experimental evidence to justify your conclusions.",
  },
  {
    symbol: "AP",
    title: "AP Chemistry",
    group: "AP",
    text: "Use models, calculations and lab evidence to explain chemical behaviour and practise supporting your answers on AP-style questions.",
  },
];

const filters = ["All programmes", "Foundation", "Cambridge", "AP"];

export default function Curricula() {
  const [filter, setFilter] = useState(filters[0]);
  const visible = filter === filters[0]
    ? programmes
    : programmes.filter(({ group }) => group === filter);

  return (
    <section id="curricula" className="curricula-section shell" aria-labelledby="curricula-title">
      <div className="curricula-heading">
        <h2 id="curricula-title">Chemistry programmes</h2>
        <p>Browse by curriculum to see what you’ll learn and practise at each level.</p>
      </div>
      <div className="content-filters" role="group" aria-label="Filter chemistry programmes">
        {filters.map((label) => (
          <button
            key={label}
            type="button"
            aria-pressed={filter === label}
            aria-controls="programme-list"
            onClick={() => setFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="programme-list" className="element-grid">
        {visible.map(({ symbol, title, group, text }) => (
          <article className="element-card" key={symbol}>
            <span className="element-symbol" aria-hidden="true">{symbol}</span>
            <span className="element-label">{group}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
