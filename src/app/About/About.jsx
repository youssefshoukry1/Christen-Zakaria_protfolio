const lessonSteps = [
  {
    title: "Make sense of the idea",
    text: "We start with a question or an example and connect it to what you already know.",
  },
  {
    title: "Work through an example",
    text: "We solve a question together and talk through why each step works.",
  },
  {
    title: "Try it on your own",
    text: "You use the same idea in a new question, calculation or practical task.",
  },
  {
    title: "See what to work on next",
    text: "We look at your answer together so you know what you’ve understood and what to revisit.",
  },
];

export default function About() {
  return (
    <section id="About" className="about-section shell" aria-labelledby="about-title">
      <div className="about-intro">
        <h2 id="about-title">
          About <em>Mrs. Christen</em>
        </h2>
        <div className="about-description">
          <p>
            I’m Christen Zakaria, a chemistry educator with over five years of
            experience teaching international curricula. I want students to be
            able to explain why a reaction happens, make sense of their results
            and feel comfortable asking questions along the way.
          </p>
        </div>
      </div>
      <section
        id="approach"
        className="lesson-approach"
        aria-labelledby="approach-title"
      >
        <h2 id="approach-title">How we work through a topic</h2>
        <ol className="lesson-steps">
          {lessonSteps.map(({ title, text }) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
