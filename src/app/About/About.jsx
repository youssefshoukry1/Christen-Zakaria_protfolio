const lessonSteps = [
  {
    title: "Concept Understanding",
    icon: "M12 6a3 3 0 0 0-5.8-1A3 3 0 0 0 4 10a3 3 0 0 0 0 5 3 3 0 0 0 3 4 2.5 2.5 0 0 0 5-1V6Zm0 0a3 3 0 0 1 5.8-1A3 3 0 0 1 20 10a3 3 0 0 1 0 5 3 3 0 0 1-3 4 2.5 2.5 0 0 1-5-1M7 9c0 2 1 3 3 3m7 2c0-2-1-3-3-3",
    text: "Build a strong foundation by understanding the scientific principles behind every concept, rather than relying on memorisation.",
  },
  {
    title: "Past Paper Practice",
    icon: "M6 3h9l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 7h7m-7 4h5",
    text: "Integrate exam-style questions from day one to develop problem-solving skills and apply knowledge confidently.",
  },
  {
    title: "Exam Techniques",
    icon: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-4 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
    text: "Master command words, essential keywords, and mark scheme requirements to maximise exam performance.",
  },
  {
    title: "Progress Monitoring",
    icon: "M3 21v-4m4 4v-7m5 7v-5m5 5V9m4 12V6M3 13l5-5 4 3 8-8",
    text: "Track progress through regular quizzes, personalised feedback, and detailed performance reports to identify areas for improvement.",
  },
];

export default function About() {
  return (
    <section id="About" className="about-section shell" aria-labelledby="about-title">
      <div className="about-intro">
        <h2 id="about-title">
          Meet Your <em>Chemistry Educator</em>
        </h2>
        <div className="about-description">
          <p>
            My teaching philosophy is built on a simple principle: Chemistry
            should be understood, not memorised.
          </p>
          <p>
            I focus on making complex concepts clear, developing students’
            analytical and problem-solving skills, and building the confidence
            they need to approach challenging exam questions.
          </p>
          <p>
            My goal is not only to help students achieve excellent academic
            results, but also to develop a deep and lasting understanding of
            Chemistry that extends beyond their exams.
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
          {lessonSteps.map(({ title, text, icon }, index) => (
            <li key={title}>
              <svg
                className="lesson-step-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={icon} />
              </svg>
              <h3>{String(index + 1).padStart(2, "0")}. {title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
