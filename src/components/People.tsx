import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";

export default function People({
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
  const { nodes, materials } = useGLTF("/buildingSet.glb");

  return (
    <group dispose={null}>
      <group
        position={[pos.x, pos.y, pos.z]}
        rotation-y={Math.PI * pos.rotation}
        scale={[pos.w, pos.w, pos.w]}
      >
        <group position={[1.78, 1.15, 0]}>
          <mesh
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.Cube004.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.Cube004_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-1.04, 1.15, 1.69]}>
          <mesh
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.Cube005.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.Cube005_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-0.99, 1.15, -1.67]}>
          <mesh
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.Cube006.geometry}
            material={materials["Material.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.Cube006_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/buildingSet.glb");
