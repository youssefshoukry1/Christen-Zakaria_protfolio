"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";

export default function ResultsGallery({ items, kind }) {
  const dialog = useRef(null);
  const gallery = useRef(null);
  const galleryId = useId();
  const titleId = useId();
  const [selected, setSelected] = useState(items[0]);
  const [filter, setFilter] = useState("All results");
  const isResults = kind === "results";
  const filters = [
    "All results",
    ...new Set(items.map((item) => item.course).filter(Boolean)),
  ];
  const visible = items.filter(
    (item) => !isResults || filter === "All results" || item.course === filter,
  );
  const title = (item) =>
    isResults
      ? `${item.course}${item.course.toLowerCase().includes("chemistry") ? "" : " Chemistry"} — grade ${item.grade}`
      : item.title;
  function scrollGallery(direction) {
    const track = gallery.current;
    const card = track?.querySelector("figure");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  function openImage(item) {
    setSelected(item);
    dialog.current.showModal();
  }
  function moveImage(direction) {
    const current = visible.findIndex((item) => item.id === selected.id);
    setSelected(
      visible[(current + direction + visible.length) % visible.length],
    );
  }
  return (
    <>
      {isResults && (
        <>
          <div
            className="results-filters"
            role="group"
            aria-label="Filter chemistry results"
          >
            {filters.map((label) => (
              <button
                key={label}
                type="button"
                aria-pressed={filter === label}
                onClick={() => setFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="review-scroll-controls">
        <span aria-live="polite">
          {visible.length} {isResults ? "results" : "testimonials"}
        </span>
        <div>
          <button
            type="button"
            onClick={() => scrollGallery(-1)}
            aria-label="Scroll gallery left"
            aria-controls={galleryId}
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => scrollGallery(1)}
            aria-label="Scroll gallery right"
            aria-controls={galleryId}
          >
            &rarr;
          </button>
        </div>
      </div>
      <div
        key={filter}
        id={galleryId}
        ref={gallery}
        tabIndex={0}
        role="region"
        aria-label={
          isResults
            ? "Chemistry results, scroll horizontally"
            : "WhatsApp testimonials, scroll horizontally"
        }
        className={`original-gallery ${isResults ? "original-results" : "original-chats"}`}
      >
        {visible.map((item) => (
          <figure key={item.id}>
            <button
              type="button"
              className="result-preview"
              onClick={() => openImage(item)}
              aria-label={`Enlarge: ${title(item)}`}
              aria-haspopup="dialog"
            >
              <Image
                src={item.image}
                alt={
                  isResults
                    ? `${item.course} result showing chemistry grade ${item.grade}${item.score != null ? ` and exam score ${item.score}` : ""}.`
                    : `Original WhatsApp feedback: ${item.title}.`
                }
                width={item.width}
                height={item.height}
                sizes="(max-width: 760px) 46vw, (max-width: 1296px) 44vw, 590px"
              />
              <span className="result-expand" aria-hidden="true">
                ↗
              </span>
            </button>
            {isResults && (
              <figcaption>
                <strong>
                  {item.course} · Grade {item.grade}
                </strong>
                {(item.score != null || item.session) && (
                  <span>
                    {item.score != null
                      ? `Exam score ${item.score}`
                      : item.session}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <dialog
        className="result-dialog original-dialog"
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") moveImage(1);
          if (event.key === "ArrowLeft") moveImage(-1);
        }}
      >
        <div className="result-dialog-inner">
          <div className="result-dialog-heading">
            <h2 id={titleId}>{title(selected)}</h2>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current.close()}
              aria-label="Close image"
            >
              ×
            </button>
          </div>
          <Image
            key={selected.id}
            src={selected.image}
            alt={
              isResults
                ? `Enhanced original statement: ${selected.course}, chemistry grade ${selected.grade}.`
                : `Original WhatsApp message: ${selected.title}.`
            }
            width={selected.width}
            height={selected.height}
            sizes="(max-width: 760px) 90vw, 860px"
            quality={95}
          />
          <div className="gallery-controls">
            <button
              type="button"
              onClick={() => moveImage(-1)}
              aria-label="Previous image"
            >
              ← Previous
            </button>
            <span aria-live="polite">
              {visible.findIndex((item) => item.id === selected.id) + 1} /{" "}
              {visible.length}
            </span>
            <button
              type="button"
              onClick={() => moveImage(1)}
              aria-label="Next image"
            >
              Next →
            </button>
          </div>
          <a className="text-link" href={selected.image} download>
            Download image <span aria-hidden="true">↓</span>
          </a>
        </div>
      </dialog>
    </>
  );
}
