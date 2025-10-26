import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(5,30,60,0.6)] backdrop-blur-sm z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-[500px] max-w-[90%] overflow-hidden transform translate-y-[-10px] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-[#004b9b] to-[#0077ff] text-white px-5 py-3">
          {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
          <button
            className="text-white text-2xl hover:scale-110 transition-transform duration-150"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-6 text-gray-800">{children}</div>
      </div>
    </div>
  );
}
