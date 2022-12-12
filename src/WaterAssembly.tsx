import Water from "./components/Water";
// @ts-ignore
import { motion } from "framer-motion/three";
import React from "react";
import { useCovidData } from "./hooks/useCovidData";

export default function WaterAssembly() {
  const { data: covidData } = useCovidData();
  return (
    <motion.group
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 10,
      }}
      exit={{
        scale: 0,
      }}
    >
      <Water covidData={covidData} />
    </motion.group>
  );
}
