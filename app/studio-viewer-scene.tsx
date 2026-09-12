"use client";

import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo } from "react";
import { Box3, Vector3 } from "three";

function FittedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const { camera, controls } = useThree();

  useLayoutEffect(() => {
    clone.position.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    clone.updateMatrixWorld(true);

    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fit = 2.1 / maxDim;

    clone.scale.setScalar(fit);
    clone.position.set(-center.x * fit, -box.min.y * fit, -center.z * fit);
    clone.updateMatrixWorld(true);

    const look = new Box3().setFromObject(clone).getCenter(new Vector3());
    camera.position.set(look.x + 1.8, look.y + 1.05, look.z + 2.6);
    camera.lookAt(look);
    camera.updateProjectionMatrix();

    if (controls && "target" in controls) {
      (controls as { target: Vector3 }).target.copy(look);
      (controls as { update?: () => void }).update?.();
    }
  }, [camera, clone, controls]);

  return <primitive object={clone} />;
}

export default function StudioViewerScene({ url }: { url: string }) {
  useEffect(() => {
    useGLTF.preload("/assets/3D_models/m1.glb");
    useGLTF.preload("/assets/3D_models/m2.glb");
    useGLTF.preload("/assets/3D_models/m3.glb");
  }, []);

  return (
    <Canvas
      shadows
      camera={{ fov: 35, position: [1.8, 1.05, 2.6], near: 0.1, far: 50 }}
      gl={{ antialias: true }}
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[-5, 3, -1]}
        angle={0.55}
        penumbra={1}
        intensity={0.45}
      />
      <directionalLight position={[0, 2.5, -5]} intensity={0.35} />

      <Suspense fallback={null}>
        <Environment files="/assets/HDRI/hdr1.exr" environmentIntensity={1} />
        <FittedModel key={url} url={url} />
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.5}
          scale={8}
          blur={2.4}
          far={2.5}
          color="#000000"
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        minDistance={1.6}
        maxDistance={6}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.75}
        enableDamping
      />
    </Canvas>
  );
}
