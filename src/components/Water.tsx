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

export default function Water() {
  const [data, cookData] = useState({
    city: "",
    lvl: "",
    date: "",
    pp: 0,
    inpp: 0,
    ppMax: 0,
    ppMin: 0,
    covid: 0,
    nCovid: 0,
    perCovid: 0,
    perNCovid: 0,
  });
  useEffect(() => {
    axios
      .get(
        "https://datacook.org/api/open/dishes?id=4388&token=SK6250UN3SUWvTEWKwOb81225"
      )
      .then((response) => {
        cookData((prevData) => {
          return {
            ...prevData,
            city: response.data.city,
            lvl: response.data.lvl,
            date: response.data.date,
            pp: response.data.pp,
            inpp: response.data.inpp,
            ppMax: response.data.ppMax,
            ppMin: response.data.ppMin,
            covid: response.data.covid,
            nCovid: response.data.nCovid,
            perCovid: response.data.covid / response.data.pp,
            perNCovid: (response.data.nCovid / response.data.pp) * 50,
          };
        });
      });
  }, []);

  const thickness = 1.5 * data.perCovid;
  const material = useRef<CustomShaderMaterialType | null>(null);

  useFrame((state) => {
    if (material?.current) {
      //wave_speed
      material.current.uniforms.uTime.value =
        (-state.clock.elapsedTime / 10) * data.perNCovid * 100;
      // console.log(data);
      // console.log(material.current.uniforms.uTime.value);
    }
  });

  // useWaterControls(material);

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, 0.1, 0]}
      >
        <boxGeometry args={[4, 4, thickness, 64, 64, 1]} />
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
              value: new THREE.Color("#52a7f7"),
            },
            waterHighlight: {
              value: new THREE.Color("#b3ffff"),
            },
            offset: {
              value: 0.7,
            },
            contrast: {
              value: 3.1,
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
  );
}
