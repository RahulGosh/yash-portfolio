import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { pointerNX, pointerNY } from "@/lib/pointer";

/**
 * Layer 1 — low-poly wireframe orb.
 * Idle rotation + spring-source pointer tilt (reads shared normalized pointer).
 * Kept intentionally cheap: wireframe basic materials, no lights, no textures.
 */
function OrbMeshes() {
  const outer = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);
  const tiltX = useRef(0);
  const tiltY = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Smooth toward pointer tilt targets (frame-rate independent lerp)
    tiltX.current += (pointerNY.get() * 0.55 - tiltX.current) * Math.min(1, delta * 3.2);
    tiltY.current += (pointerNX.get() * 0.7 - tiltY.current) * Math.min(1, delta * 3.2);

    if (outer.current) {
      outer.current.rotation.y += delta * 0.18;
      outer.current.rotation.x = Math.sin(t * 0.21) * 0.16 + tiltX.current;
      outer.current.rotation.z = tiltY.current * 0.4;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.34;
      inner.current.rotation.x = Math.cos(t * 0.27) * 0.3 - tiltX.current * 0.6;
      inner.current.rotation.z = tiltY.current * 0.25;
    }
  });

  return (
    <>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.52, 1]} />
        <meshBasicMaterial wireframe color="#7a5cff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.78, 0]} />
        <meshBasicMaterial wireframe color="#ff3df2" transparent opacity={0.26} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial color="#522ffe" transparent opacity={0.9} />
      </mesh>
    </>
  );
}

export default function WireOrb({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <OrbMeshes />
      </Canvas>
    </div>
  );
}
