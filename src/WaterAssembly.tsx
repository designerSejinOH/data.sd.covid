import Water from "./components/Water";
// @ts-ignore
import { motion } from "framer-motion/three";
import React from "react";

export default function WaterAssembly() {
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
      <Water base={undefined} />
    </motion.group>
  );
}
