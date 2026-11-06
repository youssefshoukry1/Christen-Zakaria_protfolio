const curricula = [
  {
    symbol: "Y9",
    title: "Year 9 Chemistry",
    label: "PRE-IGCSE FOUNDATION",
    text: "Build strong foundations in chemistry through key chemical concepts, including atomic structure, elements, compounds, chemical reactions, and practical investigation.",
  },
  {
    symbol: "IG",
    title: "Cambridge IGCSE Chemistry",
    label: "CAMBRIDGE INTERNATIONAL",
    text: "Develop essential chemical knowledge, strengthen practical laboratory skills, and master examination techniques through structured syllabus preparation.",
  },
  {
    symbol: "AS",
    title: "Cambridge AS Level Chemistry",
    label: "CAMBRIDGE INTERNATIONAL",
    text: "Develop a deeper understanding of physical, inorganic, and organic chemistry through analytical thinking, practical applications, and exam-focused learning.",
  },
  {
    symbol: "A2",
    title: "Cambridge A2 Level Chemistry",
    label: "CAMBRIDGE INTERNATIONAL",
    text: "Master advanced chemical concepts, apply complex problem-solving strategies, and connect theoretical knowledge with practical and experimental skills.",
  },
  {
    symbol: "AP",
    title: "AP Chemistry",
    label: "COLLEGE BOARD",
    text: "Explore college-level chemistry through chemistry-focused inquiry, quantitative reasoning, laboratory investigations, and advanced College Board exam preparation.",
  },
];

export default function About() {
  return (
    <section id="About" className="about-section shell">
      <div className="about-intro">
        <h2>
          About <em>Mrs. Christen</em>
        </h2>
        <div className="about-description">
          <p>
            With over five years of teaching experience across international
            curricula, I break down challenging ideas into clear, manageable
            steps — building understanding first, then the confidence to apply
            it.
          </p>
        </div>
      </div>
      <div
        className="teaching-equation"
        role="group"
        aria-label="Teaching approach"
      >
        <div className="equation-body">
          <div>
            <strong>Curiosity</strong>
          </div>
          <span className="operator" aria-hidden="true">
            +
          </span>
          <div>
            <strong>Clarity & practice</strong>
          </div>
          <span className="reaction-arrow" aria-hidden="true">
            ⟶
          </span>
          <div className="equation-result">
            <strong>
              Confidence <span aria-hidden="true">↗</span>
            </strong>
          </div>
        </div>
      </div>
      <div id="curricula" className="curricula-section">
        <div className="curricula-heading">
          <h2>Curricula</h2>
        </div>
        <div className="element-grid">
          {curricula.map((item, index) => (
            <article className="element-card" key={item.symbol}>
              <div className="element-top">
                <span>0{index + 1}</span>
              </div>
              <span className="element-symbol" aria-hidden="true">
                {item.symbol}
              </span>
              <span className="element-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
