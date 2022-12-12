import React, { useMemo, useRef, useEffect, useState } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import CustomShaderMaterialType from "three-custom-shader-material/vanilla";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import * as oceanShader from "../shaders/ocean";
// @ts-ignore
import { patchShaders } from "gl-noise/build/glNoise.m";

import { useControls } from "leva";
import axios from "axios";
import { colorToRgba } from "@react-spring/shared";
import { MeshPhysicalMaterial } from "three";
import { Html } from "@react-three/drei";
import { useCovidData } from "src/hooks/useCovidData";

export default function Water({ covidData }: { covidData: any }) {
  const data = covidData;
  const thickness = 1 * data.perCovid;
  const material = useRef<CustomShaderMaterialType | null>(null);

  useFrame((state) => {
    if (material?.current) {
      //wave_speed
      material.current.uniforms.uTime.value =
        (-state.clock.elapsedTime / 8) * data.perNCovid * 100;
      // console.log(material.current.uniforms.uTime.value);
    }
  });

  // useWaterControls(material);

  return (
    <>
      <group>
        <mesh
          castShadow
          receiveShadow
          rotation-x={-Math.PI / 2}
          position={[0, -0.5, 0]}
        >
          <boxGeometry args={[8, 8, thickness, 64, 64, 1]} />
          <CustomShaderMaterial
            ref={material}
            baseMaterial={MeshPhysicalMaterial}
            vertexShader={patchShaders(oceanShader.vert)}
            fragmentShader={patchShaders(oceanShader.frag)}
            side={THREE.DoubleSide}
            color={0x68c3c0}
            roughness={0.2}
            metalness={0.1}
            flatShading={false}
            vertexColors
            uniforms={{
              uTime: { value: 0 },
              waterColor: {
                value: new THREE.Color("#8800ff"),
              },
              waterHighlight: {
                value: new THREE.Color("#0496ff"),
              },
              offset: {
                value: 2.0 * data.perCovid,
              },
              contrast: {
                value: 1.0,
              },
              brightness: {
                value: 1,
              },
              uHeight: {
                value: thickness,
              },
            }}
          />
        </mesh>
      </group>
    </>
  );
}
