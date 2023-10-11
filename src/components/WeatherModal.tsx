import Modal from "react-modal";
import React from "react";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    maxWidth: "600px",
    width: "auto",
    maxHeight: "160px",
    height: "auto",
    margin: "0 auto",
    padding: "1.25rem",
    borderRadius: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)",
  },
  header: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  closeButton: {
    alignSelf: "flex-end",
    fontSize: "1.25rem",
    cursor: "pointer",
  },
  body: {
    marginBottom: "1rem",
  },
  button: {
    padding: "0.625rem 1.25rem",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
  },
};

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
  const handleModalClose = () => {
    closeModal();
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={handleModalClose}
    >
      <div style={customStyles.header}>{title}</div>
      <div style={customStyles.body}>
        <div>
          <span>{description}</span>
        </div>
      </div>
      <button style={customStyles.button} onClick={handleModalClose}>
        Close
      </button>
    </Modal>
  );
}

export default WeatherModal;
