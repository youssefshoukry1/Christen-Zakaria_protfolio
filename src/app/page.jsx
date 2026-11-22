import Image from "next/image";
import Reviews from "./Reviews/Reviews";
import About from "./About/About";
import Curricula from "./About/Curricula";
import Videos from "./Videos/Videos";
import Faq from "./components/Faq";

export default function Home() {
  return (
    <>
      <section id="Home" className="hero shell">
        <div className="hero-copy">
          <h1>
            Chemistry
            <br />
            <em>step by step.</em>
            <span className="heading-spark" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-intro">
            Hi, I’m <strong>Mrs. Christen Zakaria.</strong>
          </p>
          <p className="hero-description">
            I help students from Year 9 through Cambridge and AP Chemistry
            make sense of reactions, work through unfamiliar questions and
            explain their answers with confidence.
          </p>
          <div className="hero-actions">
            <a className="button" href="#testimonials">
              Student &amp; Parent Testimonials <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#results">
              See student results <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="portrait-composition">
          <div className="orbital orbital-one" aria-hidden="true" />
          <div className="orbital orbital-two" aria-hidden="true" />
          <div className="portrait-frame">
            <Image
              src="/prfile-pic.jpeg"
              alt="Mrs. Christen Zakaria, chemistry educator"
              fill
              priority
              sizes="(max-width: 360px) 240px, (max-width: 760px) 274px, (max-width: 1100px) 40vw, 440px"
              className="portrait"
            />
          </div>
          <div className="floating-element" aria-hidden="true">
            <span>
              01 <span>∞</span>
            </span>
            <strong>Cz</strong>
          </div>
        </div>
      </section>
      <div className="curriculum-strip">
        <div className="shell">
          <span>Year 9</span>
          <span>Cambridge IGCSE</span>
          <span>Cambridge AS Level</span>
          <span>Cambridge A2 Level</span>
          <span>AP Chemistry</span>
        </div>
      </div>
      <About />
      <Reviews />
      <Curricula />
      <Videos />
      <Faq />
    </>
  );
}
