import {
  Box,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import React, { Suspense, useEffect } from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import THREE, { BoxGeometry, Color, MeshPhysicalMaterial } from "three";

import { useCovidData } from "./hooks/useCovidData";
import Water from "./components/Water";
import People from "./components/People";
import Ground from "./components/Ground";
import DataBoard from "./dom/DataBoard";
import { createSecureContext } from "tls";
// import RouteChangeTracker from "./components/RouteChangeTracker";

function Bauble({
  pos,
}: {
  pos: {
    x: number;
    y: number;
    z: number;
    rotation: number;
    w: number;
  };
}) {
  return <People pos={pos} />;
}

export default function App(props: JSX.IntrinsicElements["group"]) {
  // RouteChangeTracker();

  const ref = useRef();
  const { data: covidData } = useCovidData();
  const baubles = [...Array(covidData.ppCount)].map(() => ({
    pos: {
      x: Math.random() * 5 - 2.5,
      y: 0,
      z: Math.random() * 5 - 2.5,
      rotation: Math.random() * 2 * Math.PI,
      w: Math.random() * 0.2,
    },
  }));
  return (
    <>
      <DataBoard />
      <Canvas
        gl={{
          antialias: true,
        }}
        shadows
        dpr={[1, 10]}
        camera={{ position: [40, 20, 10], fov: 50, near: 10, far: 1000 }}
      >
        <Suspense
          fallback={
            <Html center>
              <div id="progress-8"></div>
              <div id="classic-5"></div>
            </Html>
          }
        >
          <color attach="background" args={["lightpink"]} />
          <Environment preset="sunset" />

          <group {...props} dispose={null} scale={[10, 10, 10]}>
            {/* <Cloud position={[-4, -2, -25]} speed={0.5} opacity={1} /> */}
            {/* <Cloud position={[4, 2, -15]} speed={0.5} opacity={0.5} /> */}
            {/* <Cloud position={[-4, 2, -10]} speed={0.5} opacity={1} /> */}
            {/* <Cloud position={[4, -2, -5]} speed={0.5} opacity={0.5} /> */}
            {/* <Cloud position={[4, 2, 0]} speed={0.5} opacity={0.75} /> */}
            <Ground />
            {
              baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */
            }
            <Water covidData={covidData} />
          </group>
        </Suspense>
        <ContactShadows
          position={[0, -0.2, 0]}
          width={10}
          height={10}
          far={20}
          opacity={0.5}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <OrbitControls
          autoRotate={true}
          maxPolarAngle={Math.PI * 0.495}
          enableDamping={true}
          dampingFactor={0.1}
          minDistance={20}
          maxDistance={100}
        />
      </Canvas>
    </>
  );
}
