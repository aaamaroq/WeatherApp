import Modal from "react-modal";
import React from "react";
import { motion } from "framer-motion";

interface WeatherModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  description: string;
}

function WeatherModal({
  isOpen,
  closeModal,
  title,
  description,
}: WeatherModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center p-4 z-[1000] outline-none"
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-dark p-8 max-w-md w-full text-white shadow-2xl relative"
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-white/80 mb-8 leading-relaxed">
          {description}
        </p>
        <button
          className="w-full py-3 bg-white/20 hover:bg-white/30 transition-colors rounded-xl font-semibold uppercase tracking-widest text-sm"
          onClick={closeModal}
        >
          Got it
        </button>
      </motion.div>
    </Modal>
  );
}

export default WeatherModal;
