import React from "react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center p-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-6">404</h1>

      <motion.div
        className="text-4xl md:text-6xl font-extrabold tracking-widest"
        animate={{ x: ["-20%", "20%", "-20%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        S - F
      </motion.div>

      <p className="mt-6 text-lg text-gray-400">Page Not Found</p>
    </div>
  );
}
