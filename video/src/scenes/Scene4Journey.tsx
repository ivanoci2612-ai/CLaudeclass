import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Scene4Journey: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [90, 119], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = fadeIn * fadeOut;

  const pathProgress = interpolate(frame, [10, 90], [0, 1], { extrapolateRight: "clamp" });
  const totalPathLength = 900;
  const strokeDashoffset = totalPathLength * (1 - pathProgress);

  const planeX = interpolate(frame, [10, 90], [60, 1060], { extrapolateRight: "clamp" });
  const planeY = interpolate(frame, [10, 90], [400, 180], { extrapolateRight: "clamp" });

  const quoteOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const quoteScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 70 }, from: 0.7, to: 1 });

  const locationsOpacity = interpolate(frame, [65, 90], [0, 1], { extrapolateRight: "clamp" });

  const locations = ["🗼 Paris", "🏔️ Nepal", "🏝️ Bali", "🏜️ Sahara", "🗽 New York"];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(180deg, #0c1445 0%, #1a2f6e 40%, #2d4a8a 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity, position: "relative", overflow: "hidden",
    }}>
      {/* Animated flight path SVG */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1280 720">
        <path
          d="M 60 400 C 300 350 500 150 640 200 C 780 250 900 100 1060 180"
          stroke="rgba(125,211,252,0.5)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={totalPathLength}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        {/* Dashed trail */}
        <path
          d="M 60 400 C 300 350 500 150 640 200 C 780 250 900 100 1060 180"
          stroke="rgba(125,211,252,0.15)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 12"
        />
        {/* Plane */}
        <text x={planeX} y={planeY} fontSize="36" textAnchor="middle" transform={`rotate(-20, ${planeX}, ${planeY})`}>✈️</text>
        {/* Destination dots */}
        {[[60, 400], [320, 340], [560, 175], [800, 210], [1060, 180]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={pathProgress > (i / 4) ? 6 : 0}
            fill="#7dd3fc" opacity={0.8}
          />
        ))}
      </svg>

      {/* Main quote */}
      <div style={{
        opacity: quoteOpacity,
        transform: `scale(${quoteScale})`,
        textAlign: "center",
        zIndex: 10,
        padding: "0 80px",
      }}>
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: 58,
          fontStyle: "italic",
          color: "#e0f2fe",
          margin: 0,
          lineHeight: 1.4,
          textShadow: "0 2px 30px rgba(0,0,0,0.8)",
        }}>
          "Every journey begins<br />with a single step."
        </h2>
        <p style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 20,
          color: "#7dd3fc",
          letterSpacing: 4,
          textTransform: "uppercase",
          marginTop: 20,
        }}>— Lao Tzu</p>
      </div>

      {/* Locations ticker */}
      <div style={{
        position: "absolute",
        bottom: 60,
        display: "flex",
        gap: 32,
        opacity: locationsOpacity,
      }}>
        {locations.map((loc, i) => (
          <span key={i} style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 18,
            color: "#bae6fd",
            background: "rgba(255,255,255,0.08)",
            padding: "8px 20px",
            borderRadius: 30,
            border: "1px solid rgba(125,211,252,0.3)",
          }}>{loc}</span>
        ))}
      </div>
    </div>
  );
};
