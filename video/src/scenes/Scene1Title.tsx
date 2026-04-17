import { useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile } from "remotion";

export const Scene1Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, from: 0.4, to: 1 });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [30, 55], [30, 0], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [90, 119], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Animated gradient position
  const gradientShift = interpolate(frame, [0, 119], [0, 30]);

  return (
    <>
    <Audio src={staticFile("audio/scene1.wav")} volume={0.9} />
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(${135 + gradientShift}deg, #0a0a2e 0%, #1a1a5e 30%, #0d3b6e 60%, #051020 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fadeOut, overflow: "hidden", position: "relative",
    }}>
      {/* Stars */}
      {[...Array(60)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 37 + 11) % 100}%`,
          top: `${(i * 53 + 7) % 100}%`,
          width: i % 3 === 0 ? 3 : 2,
          height: i % 3 === 0 ? 3 : 2,
          borderRadius: "50%",
          background: "white",
          opacity: interpolate(frame + i * 5, [0, 15, 30], [0.3, 1, 0.3], { extrapolateRight: "clamp" }) * 0.8,
        }} />
      ))}

      {/* Globe emoji */}
      <div style={{
        fontSize: 100,
        opacity: titleOpacity,
        transform: `scale(${titleScale}) rotate(${interpolate(frame, [0, 119], [0, 20])}deg)`,
        marginBottom: 24,
        filter: "drop-shadow(0 0 30px rgba(100,180,255,0.6))",
      }}>🌍</div>

      <h1 style={{
        fontFamily: "'Arial Black', Impact, sans-serif",
        fontSize: 96,
        fontWeight: 900,
        color: "#ffffff",
        textAlign: "center",
        margin: 0,
        letterSpacing: 8,
        textTransform: "uppercase",
        opacity: titleOpacity,
        transform: `scale(${titleScale})`,
        textShadow: "0 0 60px rgba(100,200,255,0.8), 0 4px 20px rgba(0,0,0,0.8)",
      }}>
        THE WORLD<br />IS YOURS
      </h1>

      <p style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 28,
        color: "#7dd3fc",
        letterSpacing: 6,
        textTransform: "uppercase",
        marginTop: 24,
        opacity: subtitleOpacity,
        transform: `translateY(${subtitleY}px)`,
      }}>
        A journey for the bold
      </p>
    </div>
    </>
  );
};
