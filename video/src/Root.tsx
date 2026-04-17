import "./index.css";
import { Composition } from "remotion";
import { TravelComposition } from "./TravelComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TravelInspiration"
        component={TravelComposition}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
