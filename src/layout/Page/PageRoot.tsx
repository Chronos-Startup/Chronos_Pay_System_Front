import { motion } from "motion/react";
import { motionPage } from "../../constants/constants";
import {  ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}
export function PageRoot({ children }: PageProps) {
  return (
    <motion.div {...motionPage} className="w-full p-6 min-h-screen flex flex-col gap-10 overflow-x-hidden">
      {children}
    </motion.div>
  );
}
