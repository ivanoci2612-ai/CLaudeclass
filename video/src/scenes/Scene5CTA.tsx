import { useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  const line1Scale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 10, stiffness: 90 }, from: 0, to: 1 });
  const line2Scale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 10, stiffness: 90 }, from: 0, to: 1 });
  const line3Scale = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 10, stiffness: 90 }, from: 0, to: 1 });

  const bagOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [70, 95], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [70, 95], [20, 0], { extrapolateRight: "clamp" });

  // Pulsing glow
  const glow = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 1]);

  // Gradient animation
  const hue = interpolate(frame, [0, 119], [200, 280]);

  return (
    <>
    <Audio src={staticFile("audio/scene5.wav")} volume={0.9} />
    <div style={{
      width: "100%", height: "100%",
      background: `radial-gradient(ellipse at center, hsl(${hue}, 80%, 20%) 0%, #050510 70%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fadeIn, position: "relative", overflow: "hidden",
      gap: 0,
    }}>
      {/* Background sparkles */}
      {[...Array(40)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 29 + 5) % 100}%`,
          top: `${(i * 67 + 13) % 100}%`,
          fontSize: i % 5 === 0 ? 20 : 14,
          opacity: interpolate((frame + i * 7) % 30, [0, 15, 30], [0.1, 0.6, 0.1]),
        }}>
          {i % 3 === 0 ? "✨" : i % 3 === 1 ? "⭐" : "🌟"}
        </div>
      ))}

      {/* Backpack emoji */}
      <div style={{ fontSize: 80, opacity: bagOpacity, marginBottom: 30, filter: `drop-shadow(0 0 20px rgba(255,200,100,${glow}))` }}>
        🎒
      </div>

      {/* CTA lines */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {[
          { text: "Pack your bags.", scale: line1Scale, color: "#fde68a" },
          { text: "Buy the ticket.", scale: line2Scale, color: "#fed7aa" },
          { text: "GO.", scale: line3Scale, color: "#ffffff" },
        ].map(({ text, scale, color }, i) => (
          <h1 key={i} style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: i === 2 ? 130 : 72,
            fontWeight: 900,
            color,
            margin: 0,
            letterSpacing: i === 2 ? 20 : 4,
            textTransform: "uppercase",
            transform: `scale(${scale})`,
            textShadow: i === 2
              ? `0 0 80px rgba(255,255,255,${glow}), 0 0 40px rgba(255,220,100,0.8)`
              : "0 2px 20px rgba(0,0,0,0.6)",
          }}>
            {text}
          </h1>
        ))}
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 22,
        color: "#fde68a",
        letterSpacing: 5,
        textTransform: "uppercase",
        marginTop: 36,
        opacity: taglineOpacity,
        transform: `translateY(${taglineY}px)`,
      }}>
        The adventure of a lifetime starts today 🌍
      </p>
    </div>
    </>
  );
};
