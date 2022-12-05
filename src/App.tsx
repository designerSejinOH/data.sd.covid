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
import Water from "./components/Water";

import { BoxGeometry, Color, MeshPhysicalMaterial } from "three";
import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
export default function App(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/scene.glb");

  return (
    <>
      <div className="absolute z-10 text-white m-4 ">
        성동구소재 코로나현황 데이터 시각화 프로젝트
      </div>

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
          <Environment preset="sunset" />
          {/* <Lights /> */}
        </Suspense>
        <mesh scale={2.2} position={[0, -0.25, 0]}>
          <group {...props} dispose={null}>
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore
              geometry={nodes.object_3.geometry}
              material={materials.Default}
              position={[0.17, 0.83, -0.75]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_2.geometry}
              material={materials.Default}
              position={[-0.55, 0.83, -0.74]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_1.geometry}
              material={materials.Default}
              position={[0.71, 0.83, 0.62]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_4.geometry}
              material={materials.Default}
              position={[-0.72, 0.83, -0.34]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_6.geometry}
              material={materials.Default}
              position={[0.81, 0.83, -0.18]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_7.geometry}
              material={materials.Default}
              position={[-0.76, 0.83, 0.87]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_5.geometry}
              material={materials.Default}
              position={[0.63, 0.83, -0.7]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_10.geometry}
              material={materials.Default}
              position={[-0.84, 0.83, 0.63]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_9.geometry}
              material={materials.Default}
              position={[-0.57, 0.83, 0.48]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_12.geometry}
              material={materials.Default}
              position={[-0.24, 0.83, -0.11]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_8.geometry}
              material={materials.Default}
              position={[-0.84, 0.83, 0.33]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_15.geometry}
              material={materials.Default}
              position={[0.45, 0.83, 0.74]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_13.geometry}
              material={materials.Default}
              position={[-0.04, 0.83, -0.3]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_11.geometry}
              material={materials.Default}
              position={[-0.31, 0.83, 0.75]}
            />
            <mesh
              castShadow
              receiveShadow
              //@ts-ignore

              geometry={nodes.object_14.geometry}
              material={materials.Default}
              position={[0, 0.57, 0]}
            />
          </group>
        </mesh>
        <boxGeometry args={[10, 2, 4.5]} />
        <meshStandardMaterial color="white" />
        <Water />

        <ContactShadows
          position={[0, -0.2, 0]}
          width={10}
          height={10}
          far={20}
          opacity={0.5}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <OrbitControls autoRotate={true} />
      </Canvas>
    </>
  );
}
