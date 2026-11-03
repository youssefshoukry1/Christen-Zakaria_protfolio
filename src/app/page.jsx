import Image from "next/image";
import About from "./About/About";

export default function Home() {
  return (
    <>
      <section id="Home" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> A little curiosity. A world of
            chemistry.
          </p>
          <h1>
            Making
            <br />
            Chemistry
            <br />
            <em>click.</em>
            <span className="heading-spark" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-intro">
            Hi, I’m <strong>Mrs. Christen Zakaria.</strong>
          </p>
          <p className="hero-description">
            Turning complex concepts into clear understanding — and helping
            students approach their next exam with confidence.
          </p>
          <div className="hero-actions">
            <a className="button" href="#About">
              Meet your chemistry teacher <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#curricula">
              Explore curricula <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span>5+ years of teaching experience</span>
            <span className="note-line" />
            <span>One subject. Endless possibilities.</span>
          </div>
        </div>
        <div className="portrait-composition">
          <div className="orbital orbital-one" aria-hidden="true" />
          <div className="orbital orbital-two" aria-hidden="true" />
          <span className="science-note" aria-hidden="true">
            A catalyst for understanding.
          </span>
          <div className="portrait-frame">
            <Image
              src="/prfile-pic.jpeg"
              alt="Mrs. Christen Zakaria, chemistry educator"
              fill
              priority
              sizes="(max-width: 360px) 240px, (max-width: 760px) 274px, (max-width: 1100px) 40vw, 440px"
              className="portrait"
            />
            <div className="portrait-caption">
              <span>THE HUMAN ELEMENT</span>
              <strong>Your guide to the science.</strong>
            </div>
          </div>
          <div className="floating-element" aria-hidden="true">
            <span>
              01 <span>∞</span>
            </span>
            <strong>Cz</strong>
            <small>Christen Zakaria</small>
            <span>CHEMISTRY EDUCATOR</span>
          </div>
          <div className="portrait-stamp">
            <span className="status-dot" /> Curiosity → Confidence
          </div>
        </div>
      </section>
      <div className="curriculum-strip">
        <div className="shell">
          <span className="strip-label">A formula for every stage</span>
          <span>AP Chemistry</span>
          <span>Cambridge IGCSE</span>
          <span>AS & A2 Level</span>
          <span>Edexcel</span>
          <span>Year 9</span>
        </div>
      </div>
      <About />
    </>
  );
}
