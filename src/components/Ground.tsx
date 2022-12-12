import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";

export default function Ground(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/land.glb");
  const material = new MeshPhysicalMaterial({
    color: "#333",
    roughness: 0.5,
    metalness: 0.5,
  });

  return (
    <group
      {...props}
      dispose={null}
      scale={[2.1, 0.8, 2.1]}
      position={[0, -0.63, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        //@ts-ignore
        geometry={nodes.Cube.geometry}
        //@ts-ignore
        material={material}
        position={[0, 0.17, 0]}
        scale={[1, 0.08, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        //@ts-ignore
        geometry={nodes.Landscape.geometry}
        //@ts-ignore
        material={material}
        position={[0, 0.3, 0]}
      />
      <meshPhysicalMaterial
        attach="material"
        color="black"
        roughness={0.5}
        metalness={0.5}
      />
    </group>
  );
}

useGLTF.preload("/land.glb");
