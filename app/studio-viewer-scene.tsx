"use client";

import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo } from "react";
import { Box3, Vector3 } from "three";

const MODEL_URLS = [
  "/assets/3D_models/m1.glb",
  "/assets/3D_models/m2.glb",
  "/assets/3D_models/m3.glb",
] as const;

MODEL_URLS.forEach((url) => useGLTF.preload(url));

function FittedModel({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const { camera, controls } = useThree();

  useLayoutEffect(() => {
    scene.position.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.updateMatrixWorld(true);

    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fit = 2.1 / maxDim;

    scene.scale.setScalar(fit);
    scene.position.set(-center.x * fit, -box.min.y * fit, -center.z * fit);
    scene.updateMatrixWorld(true);

    const look = new Box3().setFromObject(scene).getCenter(new Vector3());
    camera.position.set(look.x + 1.8, look.y + 1.05, look.z + 2.6);
    camera.lookAt(look);
    camera.updateProjectionMatrix();

    if (controls && "target" in controls) {
      (controls as { target: Vector3 }).target.copy(look);
      (controls as { update?: () => void }).update?.();
    }
  }, [camera, controls, scene]);

  return <primitive object={scene} />;
}

function SceneLoader() {
  const { active, progress } = useProgress();

  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-zinc-950/85">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300">
        Loading scene
      </p>
      <div className="h-px w-32 overflow-hidden bg-zinc-800">
        <div
          className="h-full bg-white transition-[width] duration-200"
          style={{ width: `${Math.max(progress, 8)}%` }}
        />
      </div>
      <p className="text-[11px] tabular-nums tracking-widest text-zinc-500">
        {Math.round(progress)}%
      </p>
    </div>
  );
}

export default function StudioViewerScene({
  url,
  active,
}: {
  url: string;
  active: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <SceneLoader />
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 1.25]}
        camera={{ fov: 35, position: [1.8, 1.05, 2.6], near: 0.1, far: 50 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <color attach="background" args={["#2a2a2a"]} />
        <fog attach="fog" args={["#2a2a2a", 8, 18]} />

        <ambientLight intensity={0.1} />
        <spotLight
          position={[5, 8, 4]}
          angle={0.38}
          penumbra={0.85}
          intensity={2.1}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <spotLight
          position={[-5, 3, -1]}
          angle={0.55}
          penumbra={1}
          intensity={0.45}
        />
        <directionalLight position={[0, 2.5, -5]} intensity={0.35} />

        <Suspense fallback={null}>
          <Environment
            files="/assets/HDRI/hdr1.exr"
            environmentIntensity={1}
            frames={1}
          />
          <FittedModel key={url} url={url} />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.45}
            scale={8}
            blur={1.6}
            far={2.5}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          autoRotate={active}
          autoRotateSpeed={0.55}
          minDistance={1.6}
          maxDistance={6}
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 1.75}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
