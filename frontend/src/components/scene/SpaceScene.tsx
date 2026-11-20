import { Canvas } from "@react-three/fiber";
import { Starfield } from "./Starfield";
import { useMediaQuery } from "#/hooks";

const DESKTOP_QUERY = "(min-width: 1024px)";

export function SpaceScene() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <div className="fixed inset-0 z-[0] bg-black pointer-events-none">
      {isDesktop && (
        <Canvas camera={{ position: [0, 0, 0], fov: 75 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
          <color attach="background" args={["#050505"]} />
          <Starfield />
        </Canvas>
      )}
    </div>
  );
}
