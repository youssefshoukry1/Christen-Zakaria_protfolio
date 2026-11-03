const svgProps = {
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Atom() {
  return (
    <svg {...svgProps}>
      <g className="chem-orbit">
        <ellipse cx="60" cy="60" rx="49" ry="19" />
        <ellipse cx="60" cy="60" rx="49" ry="19" transform="rotate(60 60 60)" />
        <ellipse
          cx="60"
          cy="60"
          rx="49"
          ry="19"
          transform="rotate(120 60 60)"
        />
        <circle className="chem-electron" cx="109" cy="60" r="3" />
        <circle className="chem-electron" cx="35.5" cy="102.4" r="3" />
        <circle className="chem-electron" cx="35.5" cy="17.6" r="3" />
      </g>
      <circle cx="60" cy="60" r="6" className="chem-nucleus" />
    </svg>
  );
}

function Flask() {
  return (
    <svg {...svgProps}>
      <path d="M45 14h30M49 14v35L24 94q-5 10 8 10h56q13 0 8-10L71 49V14" />
      <path
        className="chem-liquid"
        d="M36 76q12-6 24 0t24 0l12 18q5 10-8 10H32q-13 0-8-10Z"
      />
      <path d="M75 63h7M80 73h7M85 83h7" />
      <circle className="chem-bubble chem-bubble-one" cx="53" cy="77" r="3" />
      <circle className="chem-bubble chem-bubble-two" cx="65" cy="89" r="2" />
      <circle
        className="chem-bubble chem-bubble-three"
        cx="61"
        cy="56"
        r="2.5"
      />
    </svg>
  );
}

function Molecule() {
  return (
    <svg {...svgProps}>
      <path d="m28 42 32-18 32 18v36L60 96 28 78Zm5 4v27m28 17 26-15m0-30L61 30M28 42 12 32m80 10 16-10M60 96v16" />
      <circle className="chem-nucleus" cx="12" cy="32" r="4" />
      <circle className="chem-nucleus" cx="108" cy="32" r="4" />
      <circle className="chem-nucleus" cx="60" cy="112" r="4" />
    </svg>
  );
}

function Crystal() {
  return (
    <svg {...svgProps}>
      <path d="m25 42 35-20 35 20v40l-35 20-35-20Zm0 0 35 20 35-20M60 62v40" />
      <path strokeDasharray="3 5" d="M60 22v40M25 82l35-20 35 20" />
      {[
        [25, 42],
        [60, 22],
        [95, 42],
        [25, 82],
        [60, 62],
        [60, 102],
        [95, 82],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          className="chem-nucleus"
        />
      ))}
    </svg>
  );
}

export default function ChemistryBg() {
  return (
    <div className="chemistry-background" aria-hidden="true">
      <div className="chem-ambient chem-ambient-one" />
      <div className="chem-ambient chem-ambient-two" />
      <div className="chem-object chem-atom">
        <Atom />
      </div>
      <div className="chem-object chem-flask">
        <Flask />
      </div>
      <div className="chem-object chem-molecule">
        <Molecule />
      </div>
      <div className="chem-object chem-crystal">
        <Crystal />
      </div>
      <div className="chem-object chem-small-atom">
        <Atom />
      </div>
      <span className="chem-formula chem-formula-one">H₂O</span>
      <span className="chem-formula chem-formula-two">PV = nRT</span>
      <span className="chem-formula chem-formula-three">C + O₂ → CO₂</span>
      <span className="chem-particle chem-particle-one" />
      <span className="chem-particle chem-particle-two" />
      <span className="chem-particle chem-particle-three" />
    </div>
  );
}
