import { motion } from "motion/react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  setShow: (value: boolean) => void;
  children: ReactNode;
}

export function Modal({ setShow, children }: ModalProps) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={() => setShow(false)}
      className="fixed inset-0 p-6 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs "
    >
      {children}
    </motion.div>,
    document.body,
  );
}
