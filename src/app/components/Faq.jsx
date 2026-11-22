const questions = [
  {
    question: "Where should I start before IGCSE?",
    answer: "Year 9 Chemistry introduces atoms, elements, compounds and reactions. It also gives you practice making observations and drawing conclusions from simple investigations.",
  },
  {
    question: "How do I prepare for chemistry exams?",
    answer: "Once you understand a topic, we work through exam-style questions together. We use feedback on your answers to decide what to practise next, from setting out calculations to explaining observations.",
  },
  {
    question: "Where can I see examples of student results?",
    answer: (
      <>
        Browse the <a href="#results">student results gallery</a> and use the
        course filters to find examples from the level you’re interested in.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" className="faq-section shell" aria-labelledby="faq-title">
      <h2 id="faq-title">Common questions</h2>
      {questions.map(({ question, answer }) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </section>
  );
}
