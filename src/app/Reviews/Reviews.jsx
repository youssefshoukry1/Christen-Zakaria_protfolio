import images from "./images.json";
import ResultsGallery from "./ResultsGallery";

export default function Reviews() {
  return (
    <section
      id="Reviews"
      className="reviews-page shell"
      aria-label="Student results and feedback"
    >
      <section
        id="results"
        className="results-section"
        aria-labelledby="results-title"
      >
        <div className="reviews-section-heading">
          <h2 id="results-title" className="reviews-subtitle">
            Chemistry exam results
          </h2>
          <p>Filter by course, then select an image to read the result in full.</p>
        </div>
        <ResultsGallery items={images.results} kind="results" />
        <p className="results-disclosure">
          These are individual results. Student names and other identifying
          details are hidden.
        </p>
      </section>
      <section
        id="testimonials"
        className="testimonials-section"
        aria-labelledby="testimonials-title"
      >
        <div className="reviews-section-heading">
          <h2 id="testimonials-title" className="reviews-subtitle">
            What students and parents say
          </h2>
          <p>
            Students describe having time to ask questions and working through
            exercises after a topic is explained. Parents also describe seeing
            their children grow more confident in chemistry.
          </p>
        </div>
        <ResultsGallery items={images.chats} kind="chats" />
      </section>
    </section>
  );
}
