import { useState } from "react";
import { AgentButton } from "./Button";
import { AnimatePresence, motion } from "motion/react";
import { AgentInput } from "./Input";
import { AgentHeader } from "./Header";
import { AgentMessages } from "./Messages";
import { useAgent } from "../../context/AgentContext";

export interface Message {
  role: "user" | "model";
  text: string;
}

export function AgentChat() {
    const {isOpen, isMinimized} = useAgent()

  return (
    <div className="fixed bottom-6 right-6 z-100">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "64px" : "540px",
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`w-95 bg-midnight-dark border border-white/10 rounded-3xl shadow-chronos relative flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300`}
          >
            <AgentHeader  />

            {!isMinimized && (
              <>
                <AgentMessages  />
                <AgentInput />
              </>
            )}
          </motion.div>
        )}
        {!isOpen && <AgentButton />}
      </AnimatePresence>
    </div>
  );
}
