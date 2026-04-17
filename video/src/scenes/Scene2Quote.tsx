import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Scene2Quote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [90, 119], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = fadeIn * fadeOut;

  const quoteScale = spring({ frame, fps, config: { damping: 15, stiffness: 60 }, from: 0.8, to: 1 });
  const authorOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });
  const authorY = interpolate(frame, [50, 75], [20, 0], { extrapolateRight: "clamp" });

  // Wandering dots animation
  const dotProgress = interpolate(frame, [0, 119], [0, 1]);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity, padding: "0 80px", boxSizing: "border-box",
      position: "relative", overflow: "hidden",
    }}>
      {/* Animated path/trail */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}>
        <path d="M 0 360 Q 320 200 640 360 Q 960 520 1280 360" stroke="#7dd3fc" strokeWidth="2" fill="none" strokeDasharray="8 12" />
        <path d="M 0 500 Q 400 300 800 500 Q 1000 600 1280 450" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeDasharray="5 15" />
        <circle cx={`${dotProgress * 100}%`} cy="360" r="6" fill="#7dd3fc" opacity="0.8" />
      </svg>

      {/* Compass rose */}
      <div style={{ fontSize: 56, marginBottom: 40, opacity: fadeIn, transform: `rotate(${frame * 0.5}deg)` }}>🧭</div>

      <blockquote style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 52,
        fontStyle: "italic",
        color: "#e0f2fe",
        textAlign: "center",
        lineHeight: 1.5,
        margin: 0,
        transform: `scale(${quoteScale})`,
        textShadow: "0 2px 20px rgba(0,0,0,0.6)",
        maxWidth: 900,
      }}>
        "Not all those who wander are lost."
      </blockquote>

      <div style={{
        marginTop: 40,
        opacity: authorOpacity,
        transform: `translateY(${authorY}px)`,
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{ width: 60, height: 2, background: "#7dd3fc" }} />
        <p style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 24,
          color: "#7dd3fc",
          letterSpacing: 4,
          textTransform: "uppercase",
          margin: 0,
        }}>
          J.R.R. Tolkien
        </p>
        <div style={{ width: 60, height: 2, background: "#7dd3fc" }} />
      </div>
    </div>
  );
};
