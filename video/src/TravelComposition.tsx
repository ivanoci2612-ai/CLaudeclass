import { Sequence, useCurrentFrame, interpolate } from "remotion";
import { Scene1Title } from "./scenes/Scene1Title";
import { Scene2Quote } from "./scenes/Scene2Quote";
import { Scene3Stats } from "./scenes/Scene3Stats";
import { Scene4Journey } from "./scenes/Scene4Journey";
import { Scene5CTA } from "./scenes/Scene5CTA";

// 20 seconds × 30fps = 600 frames, 5 scenes × 120 frames each
const SCENE_DURATION = 120;

export const TravelComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // Cross-fade overlay between scenes
  const sceneIndex = Math.floor(frame / SCENE_DURATION);
  const frameInScene = frame % SCENE_DURATION;
  const crossFadeFrames = 15;
  const crossFadeOpacity = sceneIndex > 0 && frameInScene < crossFadeFrames
    ? interpolate(frameInScene, [0, crossFadeFrames], [0, 1], { extrapolateRight: "clamp" })
    : 1;

  return (
    <div style={{ width: "100%", height: "100%", opacity: crossFadeOpacity }}>
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <Scene1Title />
      </Sequence>
      <Sequence from={SCENE_DURATION} durationInFrames={SCENE_DURATION}>
        <Scene2Quote />
      </Sequence>
      <Sequence from={SCENE_DURATION * 2} durationInFrames={SCENE_DURATION}>
        <Scene3Stats />
      </Sequence>
      <Sequence from={SCENE_DURATION * 3} durationInFrames={SCENE_DURATION}>
        <Scene4Journey />
      </Sequence>
      <Sequence from={SCENE_DURATION * 4} durationInFrames={SCENE_DURATION}>
        <Scene5CTA />
      </Sequence>
    </div>
  );
};
