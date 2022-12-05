import {
  Box,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Leva } from "leva";
import React, { Suspense } from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Lights from "./components/Lights";
import Water from "./components/Water";

import {
  Color,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshNormalMaterial,
  MeshToonMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshDepthMaterial,
} from "three";
import { useControls } from "leva";

export default function App() {
  const ref = useRef();

  const { Base } = useControls(
    "Material",
    {
      Base: {
        options: {
          MeshPhysicalMaterial,
          MeshBasicMaterial,
          MeshMatcapMaterial,
          MeshNormalMaterial,
          MeshStandardMaterial,
          MeshPhongMaterial,
          MeshToonMaterial,
          MeshLambertMaterial,
          MeshDepthMaterial,
        },
        value: MeshPhysicalMaterial,
      },
    },
    []
  );

  return (
    <>
      <Leva />
      <Canvas
        gl={{
          antialias: true,
        }}
        camera={{
          position: [4, 4, 4],
        }}
      >
        <color attach="background" args={["#000"]} />
        <Suspense fallback={null}>
          {["MeshPhysicalMaterial", "MeshStanderedMaterial"].includes(
            Base.name
          ) ? (
            <Environment preset="sunset" />
          ) : (
            <Lights />
          )}
        </Suspense>
        <mesh>
          <boxGeometry args={[5, 1.2, 5]} />
          <meshStandardMaterial color={"white"} />
        </mesh>
        <Water base={Base} />
        <ContactShadows
          position={[0, -0.2, 0]}
          width={10}
          height={10}
          far={20}
          opacity={0.5}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <OrbitControls />
      </Canvas>
    </>
  );
}
