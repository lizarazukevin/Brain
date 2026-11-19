import { Canvas } from "@react-three/fiber";
import { Starfield } from "./Starfield";

export function SpaceScene() {
  return (
    <div className="fixed inset-0 z-[0] bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />

        <Starfield />
      </Canvas>
    </div>
  );
}
