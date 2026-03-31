import { motion } from "motion/react";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  setShow: (value: boolean) => void;
  children: ReactNode;
}

export function Modal({ setShow, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ willChange: "transform, opacity" }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={() => setShow(false)}
      className=" transform-gpu fixed inset-0 p-6 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs "
    >
      {children}
    </motion.div>,
    document.body,
  );
}
