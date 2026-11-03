const curricula = [
  {
    symbol: "Ap",
    title: "AP Chemistry",
    label: "Advanced Placement",
    text: "Build connections between core principles, tackle advanced problems, and prepare for the College Board exam.",
  },
  {
    symbol: "Ig",
    title: "Cambridge IGCSE",
    label: "Cambridge International",
    text: "Make sense of the essentials through clear foundations, practical inquiry, and focused syllabus preparation.",
  },
  {
    symbol: "As",
    title: "AS & A2 Level",
    label: "Pre-university",
    text: "Go deeper into physical, organic, and inorganic chemistry, with the understanding to connect it all.",
  },
  {
    symbol: "Ed",
    title: "Edexcel Chemistry",
    label: "UK Curriculum",
    text: "Develop a structured understanding of the syllabus, supported by purposeful practice and exam technique.",
  },
  {
    symbol: "Y9",
    title: "Year 9 Preparation",
    label: "The foundation",
    text: "Start with curiosity. Build the scientific vocabulary and core knowledge for a confident transition to IGCSE.",
  },
];

export default function About() {
  return (
    <section id="About" className="about-section shell">
      <div className="section-heading">
        <p className="eyebrow">01 / The teacher behind the chemistry</p>
        <span className="section-index" aria-hidden="true">
          A stronger bond with science.
        </span>
      </div>
      <div className="about-intro">
        <h2>
          Complex science.
          <br />
          <em>Human approach.</em>
        </h2>
        <div>
          <p>
            Chemistry is full of connections. My role is to help students see
            them.
          </p>
          <p>
            With over five years of teaching experience across international
            curricula, I break down challenging ideas into clear, manageable
            steps — building understanding first, then the confidence to apply
            it.
          </p>
        </div>
      </div>
      <div className="teaching-equation">
        <div className="equation-header">
          <span className="eyebrow">The teaching equation</span>
          <span>A different kind of reaction</span>
        </div>
        <div className="equation-body">
          <div>
            <span className="equation-label">01 / THE SPARK</span>
            <strong>Curiosity</strong>
          </div>
          <span className="operator" aria-hidden="true">
            +
          </span>
          <div>
            <span className="equation-label">02 / THE METHOD</span>
            <strong>Clarity & practice</strong>
          </div>
          <span className="reaction-arrow" aria-hidden="true">
            ⟶
          </span>
          <div className="equation-result">
            <span className="equation-label">THE RESULT</span>
            <strong>
              Confidence <span aria-hidden="true">↗</span>
            </strong>
          </div>
        </div>
        <p>Guided by patience. Powered by understanding.</p>
      </div>
      <div id="curricula" className="curricula-section">
        <div className="curricula-heading">
          <div>
            <p className="eyebrow">02 / Find your element</p>
            <h2>
              A path for <em>every learner.</em>
            </h2>
          </div>
          <p>
            From first discoveries to advanced chemistry.
            <br />
            Explore the curricula I teach.
          </p>
        </div>
        <div className="element-grid">
          {curricula.map((item, index) => (
            <article className="element-card" key={item.symbol}>
              <div className="element-top">
                <span>0{index + 1}</span>
                <span aria-hidden="true">↗</span>
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
      <blockquote className="mission">
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        <p>
          My mission is to turn Chemistry from a challenging subject into an
          exciting <em>journey of discovery.</em>
        </p>
        <footer>
          Mrs. Christen Zakaria <span> / Chemistry Educator</span>
        </footer>
        <div className="mission-atom" aria-hidden="true">
          ⚛
        </div>
      </blockquote>
    </section>
  );
}
