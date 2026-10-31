import React from "react";

export default function ChemistryBg() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      <style>{`
        .ofaa-drift-1 {
          animation: ofaaDrift1 12s ease-in-out infinite;
          will-change: transform;
        }
        .ofaa-drift-2 {
          animation: ofaaDrift2 15s ease-in-out infinite;
          will-change: transform;
        }
        .ofaa-drift-3 {
          animation: ofaaDrift3 13s ease-in-out infinite;
          will-change: transform;
        }
        .ofaa-spin-slow {
          animation: ofaaSpin 30s linear infinite;
          transform-origin: center;
          will-change: transform;
        }

        @keyframes ofaaDrift1 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          33% { transform: translate3d(40px, -30px, 0) rotate(6deg); }
          66% { transform: translate3d(-30px, 25px, 0) rotate(-5deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        @keyframes ofaaDrift2 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          33% { transform: translate3d(-35px, -40px, 0) rotate(-6deg); }
          66% { transform: translate3d(35px, 30px, 0) rotate(5deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }

        @keyframes ofaaDrift3 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(25px, -20px, 0) scale(1.05); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes ofaaSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* 1. Top-Left: 3D Isometric Crystal Cube */}
      <div className="absolute top-[8%] left-[4%] sm:left-[8%] ofaa-drift-1 scale-75 sm:scale-95">
        <svg width="75" height="85" viewBox="0 0 75 85" fill="none">
          <polygon points="12,32 50,32 50,70 12,70" stroke="#71717a" strokeOpacity="0.25" strokeWidth="1.6" fill="none" />
          <polygon points="26,16 64,16 64,54 26,54" stroke="#71717a" strokeOpacity="0.16" strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
          <line x1="12" y1="32" x2="26" y2="16" stroke="#71717a" strokeOpacity="0.25" strokeWidth="1.6" />
          <line x1="50" y1="32" x2="64" y2="16" stroke="#71717a" strokeOpacity="0.25" strokeWidth="1.6" />
          <line x1="12" y1="70" x2="26" y2="54" stroke="#71717a" strokeOpacity="0.16" strokeWidth="1.4" strokeDasharray="3 3" />
          <line x1="50" y1="70" x2="64" y2="54" stroke="#71717a" strokeOpacity="0.25" strokeWidth="1.6" />
          <circle cx="12" cy="32" r="4.2" fill="#71717a" fillOpacity="0.28" />
          <circle cx="50" cy="32" r="4.2" fill="#71717a" fillOpacity="0.28" />
          <circle cx="12" cy="70" r="4.2" fill="#71717a" fillOpacity="0.28" />
          <circle cx="50" cy="70" r="4.2" fill="#71717a" fillOpacity="0.28" />
          <circle cx="26" cy="16" r="3.6" fill="#71717a" fillOpacity="0.22" />
          <circle cx="64" cy="16" r="3.6" fill="#71717a" fillOpacity="0.22" />
          <circle cx="26" cy="54" r="3" fill="#71717a" fillOpacity="0.18" />
          <circle cx="64" cy="54" r="3.6" fill="#71717a" fillOpacity="0.22" />
        </svg>
      </div>

      {/* 2. Top-Right: Atomic Orbital Model with Rotating Electrons */}
      <div className="absolute top-[8%] right-[4%] sm:right-[8%] ofaa-drift-2 scale-75 sm:scale-95">
        <div className="ofaa-spin-slow">
          <svg width="85" height="85" viewBox="0 0 85 85" fill="none">
            <g transform="translate(42.5, 42.5)">
              <circle cx="0" cy="0" r="5" fill="#71717a" fillOpacity="0.32" />
              <ellipse cx="0" cy="0" rx="36" ry="15" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="36" ry="15" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.5" transform="rotate(60)" />
              <ellipse cx="0" cy="0" rx="36" ry="15" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.5" transform="rotate(120)" />
              <circle cx="36" cy="0" r="3.2" fill="#71717a" fillOpacity="0.28" />
              <circle cx="-18" cy="31.2" r="3.2" fill="#71717a" fillOpacity="0.28" />
              <circle cx="-18" cy="-31.2" r="3.2" fill="#71717a" fillOpacity="0.28" />
            </g>
          </svg>
        </div>
      </div>

      {/* 3. Mid-Left: Bent Molecule (H2O) — Visible on PC/Tablet, Hidden on Phones */}
      <div className="hidden sm:block absolute top-[52%] left-[3%] sm:left-[7%] ofaa-drift-3 scale-75 sm:scale-95">
        <svg width="65" height="55" viewBox="0 0 65 55" fill="none">
          <circle cx="32.5" cy="18" r="6.5" fill="#71717a" fillOpacity="0.28" />
          <line x1="32.5" y1="18" x2="14" y2="40" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.8" />
          <line x1="32.5" y1="18" x2="51" y2="40" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.8" />
          <circle cx="14" cy="40" r="4.2" fill="#71717a" fillOpacity="0.25" />
          <circle cx="51" cy="40" r="4.2" fill="#71717a" fillOpacity="0.25" />
        </svg>
      </div>

      {/* 4. Bottom-Right: Tetrahedral Geometry (Methane CH4) */}
      <div className="absolute top-[75%] right-[4%] sm:right-[8%] ofaa-drift-1 scale-75 sm:scale-95">
        <svg width="70" height="75" viewBox="0 0 70 75" fill="none">
          <circle cx="35" cy="40" r="6" fill="#71717a" fillOpacity="0.3" />
          <line x1="35" y1="40" x2="35" y2="12" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.8" />
          <line x1="35" y1="40" x2="12" y2="56" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.8" />
          <line x1="35" y1="40" x2="58" y2="56" stroke="#71717a" strokeOpacity="0.24" strokeWidth="1.8" />
          <line x1="35" y1="40" x2="38" y2="66" stroke="#71717a" strokeOpacity="0.18" strokeWidth="2.2" strokeDasharray="2 3" />
          <circle cx="35" cy="12" r="4" fill="#71717a" fillOpacity="0.26" />
          <circle cx="12" cy="56" r="4" fill="#71717a" fillOpacity="0.26" />
          <circle cx="58" cy="56" r="4" fill="#71717a" fillOpacity="0.26" />
          <circle cx="38" cy="66" r="3.5" fill="#71717a" fillOpacity="0.2" />
        </svg>
      </div>
    </div>
  );
}
