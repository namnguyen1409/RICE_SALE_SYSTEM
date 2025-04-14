import { motion, AnimatePresence } from "framer-motion";
import { SunFilled, MoonFilled } from "@ant-design/icons";
import React from "react";

const ThemeChangePopup = ({ show, mode }) => {
  const Icon = mode === "dark" ? MoonFilled : SunFilled;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-32 h-32 rounded-full bg-white dark:bg-black shadow-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Icon
            style={{
              fontSize: 48,
              color: mode === "dark" ? "white" : "black",
              transition: "color 0.3s",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeChangePopup;
