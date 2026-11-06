import images from "./images.json";
import ResultsGallery from "./ResultsGallery";

export default function Reviews({ standalone = false }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="Reviews"
      className="reviews-page shell"
      aria-labelledby="reviews-title"
    >
      <header className="reviews-hero">
        <Heading id="reviews-title" className="reviews-title">
          Student Stories <em>& Results</em>
        </Heading>
        <p>Select an image to enlarge it.</p>
      </header>
      <section
        id="testimonials"
        className="testimonials-section"
        aria-labelledby="testimonials-title"
      >
        <div className="reviews-section-heading">
          <h3 id="testimonials-title" className="reviews-subtitle">
            Student & Parent Testimonials
          </h3>
        </div>
        <ResultsGallery items={images.chats} kind="chats" />
      </section>
      <section
        id="results"
        className="results-section"
        aria-labelledby="results-title"
      >
        <div className="reviews-section-heading">
          <h3 id="results-title" className="reviews-subtitle">
            Chemistry Results
          </h3>
        </div>
        <ResultsGallery items={images.results} kind="results" />
        <p className="results-disclosure">
          Personal details are concealed; grades are unchanged. Individual
          results vary.
        </p>
      </section>
    </section>
  );
}
