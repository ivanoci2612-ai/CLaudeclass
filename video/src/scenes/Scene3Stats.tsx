import { useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";

const Stat: React.FC<{ emoji: string; value: string; label: string; delay: number }> = ({ emoji, value, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 10, stiffness: 80 }, from: 0, to: 1 });
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      transform: `scale(${scale})`, opacity,
      background: "rgba(255,255,255,0.07)",
      borderRadius: 20, padding: "28px 40px",
      border: "1px solid rgba(255,255,255,0.15)",
      minWidth: 220,
    }}>
      <span style={{ fontSize: 48 }}>{emoji}</span>
      <span style={{ fontSize: 44, fontWeight: 900, color: "#f0abfc", fontFamily: "Arial Black, sans-serif", marginTop: 8 }}>{value}</span>
      <span style={{ fontSize: 16, color: "#e9d5ff", letterSpacing: 2, textTransform: "uppercase", marginTop: 6, textAlign: "center" }}>{label}</span>
    </div>
  );
};

export const Scene3Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [90, 119], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = fadeIn * fadeOut;

  const titleY = interpolate(frame, [0, 30], [40, 0], { extrapolateRight: "clamp" });

  return (
    <>
    <Audio src={staticFile("audio/scene3.wav")} volume={0.9} />
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, #1a0533 0%, #2d1b69 40%, #1e1b4b 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity, gap: 50, padding: "0 60px", boxSizing: "border-box",
    }}>
      <h2 style={{
        fontFamily: "Arial Black, Impact, sans-serif",
        fontSize: 42,
        color: "#f0abfc",
        letterSpacing: 6,
        textTransform: "uppercase",
        margin: 0,
        transform: `translateY(${titleY}px)`,
        textShadow: "0 0 30px rgba(240,171,252,0.5)",
      }}>
        Young Travellers Are Changing the World
      </h2>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        <Stat emoji="✈️" value="380M+" label="Young travellers yearly" delay={20} />
        <Stat emoji="🌏" value="195" label="Countries to explore" delay={40} />
        <Stat emoji="🎒" value="87%" label="Say travel changed them" delay={60} />
      </div>

      <p style={{
        fontFamily: "Georgia, serif",
        fontSize: 26,
        color: "#ddd6fe",
        textAlign: "center",
        margin: 0,
        opacity: interpolate(frame, [70, 95], [0, 1], { extrapolateRight: "clamp" }),
        fontStyle: "italic",
        maxWidth: 800,
      }}>
        The world is calling — and the young are answering.
      </p>
    </div>
    </>
  );
};
