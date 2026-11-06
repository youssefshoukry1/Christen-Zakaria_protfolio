"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import videos from "./videos.json";
import YouTubePlayer from "./YouTubePlayer";

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const track = useRef(null);
  const indicatorTimer = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const [scrollLine, setScrollLine] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const row = track.current;
    function measure() {
      setScrollLine({
        width: Math.min(100, (row.clientWidth / row.scrollWidth) * 100),
        left:
          (Math.max(
            0,
            Math.min(row.scrollLeft, row.scrollWidth - row.clientWidth),
          ) /
            row.scrollWidth) *
          100,
      });
    }
    function onScroll() {
      measure();
      hideScrollLine();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    row.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      row.removeEventListener("scroll", onScroll);
      clearTimeout(indicatorTimer.current);
    };
  }, []);

  function hideScrollLine() {
    setScrolling(true);
    clearTimeout(indicatorTimer.current);
    indicatorTimer.current = setTimeout(() => setScrolling(false), 600);
  }

  function scrollVideos(direction) {
    const row = track.current;
    const card = row?.querySelector("article");
    if (!card) return;
    hideScrollLine();
    row.scrollBy({
      left:
        direction *
        (card.getBoundingClientRect().width +
          parseFloat(getComputedStyle(row).columnGap)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      id="Videos"
      className="videos-section shell"
      aria-labelledby="videos-title"
    >
      <header className="videos-heading">
        <h2 id="videos-title">
          Video <em>Library</em>
        </h2>
        <p>
          Example videos from{" "}
          <a
            href={videos[0].authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            lang="ar"
            dir="rtl"
          >
            {videos[0].author}
          </a>
          .
        </p>
      </header>
      <div className="video-scroll-controls">
        <button
          type="button"
          onClick={() => scrollVideos(-1)}
          aria-label="Scroll videos left"
          aria-controls="video-track"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => scrollVideos(1)}
          aria-label="Scroll videos right"
          aria-controls="video-track"
        >
          &rarr;
        </button>
      </div>
      <div
        id="video-track"
        ref={track}
        className="video-grid"
        tabIndex={0}
        role="region"
        aria-label="Video library, scroll horizontally"
      >
        {videos.map((video) => (
          <article className="video-card" key={video.id}>
            {activeVideo === video.id ? (
              <YouTubePlayer key={video.id} video={video} />
            ) : (
              <div className="video-player">
                <button
                  className="video-poster"
                  type="button"
                  onClick={() => setActiveVideo(video.id)}
                  aria-label={`Play video: ${video.title}`}
                >
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 78vw, (max-width: 1000px) 44vw, 390px"
                  />
                  <span className="video-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
            <div className="video-information">
              <h3 lang={video.language} dir="auto">
                {video.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
      <div
        className={`video-scroll-line${scrolling ? " is-scrolling" : ""}`}
        aria-hidden="true"
        style={{ visibility: scrollLine.width >= 100 ? "hidden" : undefined }}
      >
        <span
          style={{ width: `${scrollLine.width}%`, left: `${scrollLine.left}%` }}
        />
      </div>
    </section>
  );
}
