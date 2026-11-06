"use client";

import { useEffect, useRef, useState } from "react";

const HIDE_DELAY = 1500;
function formatTime(value) {
  const seconds = Math.max(0, Math.floor(value || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  return `${hours ? `${hours}:` : ""}${hours ? String(minutes).padStart(2, "0") : minutes}:${String(seconds % 60).padStart(2, "0")}`;
}
let apiPromise;
function loadPlayerAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const started = Date.now();
      const poll = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(poll);
          resolve(window.YT);
        } else if (Date.now() - started > 15000) {
          clearInterval(poll);
          reject(new Error("YouTube unavailable"));
        }
      }, 100);
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => { clearInterval(poll); script.remove(); reject(new Error("YouTube unavailable")); };
        document.head.appendChild(script);
      }
    }).catch(error => { apiPromise = null; throw error; });
  }
  return apiPromise;
}

export default function YouTubePlayer({ video }) {
  const mount = useRef(null);
  const player = useRef(null);
  const playingRef = useRef(false);
  const commandPending = useRef(false);
  const commandTimer = useRef(null);
  const hideTimer = useRef(null);
  const feedbackTimer = useRef(null);
  const pointer = useRef(null);
  const lastTap = useRef(null);
  const tapTimer = useRef(null);
  const scrubbing = useRef(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(false);

  function reveal() {
    clearTimeout(hideTimer.current);
    setVisible(true);
    if (playingRef.current && !scrubbing.current) hideTimer.current = setTimeout(() => setVisible(false), HIDE_DELAY);
  }

  useEffect(() => {
    if (!ready) return;
    function updateTime() {
      if (!player.current) return;
      setDuration(player.current.getDuration() || 0);
      if (!scrubbing.current) setPosition(player.current.getCurrentTime() || 0);
    }
    updateTime();
    const interval = setInterval(updateTime, 250);
    return () => clearInterval(interval);
  }, [ready]);

  useEffect(() => {
    let cancelled = false;
    let instance;
    const container = mount.current;
    const timeout = setTimeout(() => { if (!cancelled) setError(true); }, 20000);
    loadPlayerAPI().then(YT => {
      if (cancelled) return;
      const target = document.createElement("div");
      container.appendChild(target);
      instance = new YT.Player(target, {
        host: "https://www.youtube-nocookie.com",
        videoId: video.id,
        width: "100%", height: "100%",
        playerVars: { controls: 0, autoplay: 1, playsinline: 1, disablekb: 1, rel: 0, origin: window.location.origin },
        events: {
          onReady: event => {
            if (cancelled) return;
            clearTimeout(timeout);
            player.current = event.target;
            event.target.getIframe().title = video.title;
            setError(false);
            setReady(true);
            event.target.playVideo();
          },
          onStateChange: event => {
            if (cancelled) return;
            if (event.data === YT.PlayerState.BUFFERING) setLoading(true);
            else if ([YT.PlayerState.PLAYING, YT.PlayerState.PAUSED, YT.PlayerState.ENDED].includes(event.data)) {
              setLoading(false);
              commandPending.current = false;
              clearTimeout(commandTimer.current);
              const active = event.data === YT.PlayerState.PLAYING;
              playingRef.current = active;
              setPlaying(active);
            }
            reveal();
          },
          onAutoplayBlocked: () => { if (!cancelled) { commandPending.current = false; clearTimeout(commandTimer.current); setLoading(false); reveal(); } },
          onError: () => { if (!cancelled) { clearTimeout(timeout); setError(true); setReady(false); } },
        },
      });
    }).catch(() => { if (!cancelled) { clearTimeout(timeout); setError(true); } });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearTimeout(hideTimer.current);
      clearTimeout(feedbackTimer.current);
      clearTimeout(tapTimer.current);
      clearTimeout(commandTimer.current);
      player.current = null;
      instance?.destroy();
      container.replaceChildren();
    };
  }, [video.id, video.title]);

  function toggle() {
    clearTimeout(tapTimer.current);
    lastTap.current = null;
    if (!player.current || !ready || loading || commandPending.current) return;
    // Ignore repeated activation until YouTube confirms the requested state.
    commandPending.current = true;
    commandTimer.current = setTimeout(() => { commandPending.current = false; }, 2000);
    if (playingRef.current) {
      playingRef.current = false;
      setPlaying(false);
      player.current.pauseVideo();
    }
    else {
      setLoading(true);
      player.current.playVideo();
    }
    reveal();
  }

  function seek(direction) {
    if (!player.current || !ready) return;
    const duration = player.current.getDuration();
    if (!duration) return;
    player.current.seekTo(Math.max(0, Math.min(duration, player.current.getCurrentTime() + direction * 5)), true);
    setFeedback(direction);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 650);
    reveal();
  }

  function finishTap(event) {
    const start = pointer.current;
    pointer.current = null;
    if (!start || start.id !== event.pointerId || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) {
      clearTimeout(tapTimer.current);
      lastTap.current = null;
      reveal();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const side = x < 0.4 ? -1 : x > 0.6 ? 1 : 0;
    const now = performance.now();
    if (side && lastTap.current?.side === side && now - lastTap.current.time < 300) {
      clearTimeout(tapTimer.current);
      seek(side);
      lastTap.current = null;
    } else {
      clearTimeout(tapTimer.current);
      lastTap.current = { side, time: now };
      reveal();
      // Wait briefly on the sides so a double-tap seeks without toggling playback.
      // Touch users reveal the button; only mouse clicks toggle the whole video.
      if (event.pointerType === "mouse") {
        if (side) tapTimer.current = setTimeout(toggle, 300);
        else toggle();
      }
    }
  }

  return (
    <div className="video-player video-player-custom">
      <div className="video-api-mount" ref={mount} />
      <div
        className="video-touch-surface"
        role="group"
        tabIndex={0}
        aria-label="Click to play or pause. On touch screens, tap to show the play/pause button. Double-tap either side to skip 5 seconds. Keyboard: space to play or pause; left or right arrow to skip."
        onFocus={reveal}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if ([" ", "Enter", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
            if (event.key === "ArrowLeft") seek(-1);
            else if (event.key === "ArrowRight") seek(1);
            else toggle();
          }
        }}
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0) return;
          pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
          clearTimeout(hideTimer.current);
        }}
        onPointerUp={finishTap}
        onPointerCancel={() => { clearTimeout(tapTimer.current); pointer.current = null; lastTap.current = null; reveal(); }}
        onPointerMove={event => {
          const start = pointer.current;
          if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) {
            clearTimeout(tapTimer.current);
            pointer.current = null;
            lastTap.current = null;
          }
          if (event.pointerType === "mouse") reveal();
        }}
      />
      {!error && <button
        type="button"
        className={`video-toggle${visible ? " is-visible" : ""}`}
        aria-label={loading ? "Loading video" : playing ? "Pause video" : "Play video"}
        aria-busy={loading}
        disabled={!ready || loading}
        onFocus={reveal}
        onClick={event => { event.stopPropagation(); toggle(); }}
      >
        {loading ? <span className="video-loading" aria-hidden="true" /> : <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={playing ? "M6 5h4v14H6zm8 0h4v14h-4z" : "M8 5v14l11-7z"} />
        </svg>}
      </button>}
      {!error && <div className={`video-timeline${visible ? " is-visible" : ""}`}>
        <span className="video-time">{formatTime(position)} / {formatTime(duration)}</span>
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={Math.min(position, duration || 1)}
          disabled={!ready || !duration}
          aria-label="Seek video"
          aria-valuetext={`${formatTime(position)} of ${formatTime(duration)}`}
          style={{ "--video-progress": `${duration ? Math.min(100, position / duration * 100) : 0}%` }}
          onFocus={reveal}
          onPointerDown={event => {
            scrubbing.current = true;
            clearTimeout(tapTimer.current);
            lastTap.current = null;
            event.currentTarget.setPointerCapture(event.pointerId);
            reveal();
          }}
          onPointerUp={() => { scrubbing.current = false; reveal(); }}
          onPointerCancel={() => { scrubbing.current = false; reveal(); }}
          onLostPointerCapture={() => { scrubbing.current = false; reveal(); }}
          onBlur={() => { scrubbing.current = false; reveal(); }}
          onChange={event => {
            const time = Number(event.target.value);
            setPosition(time);
            player.current?.seekTo(time, true);
            reveal();
          }}
        />
      </div>}
      {feedback !== null && <span className={`video-seek-feedback ${feedback < 0 ? "is-left" : "is-right"}`} role="status">{feedback < 0 ? "-5s" : "+5s"}</span>}
      {error && <a className="video-player-error" href={video.url} target="_blank" rel="noopener noreferrer">Player unavailable. Watch on YouTube ↗</a>}
    </div>
  );
}
