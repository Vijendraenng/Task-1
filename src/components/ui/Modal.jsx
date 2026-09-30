import { useEffect, useRef } from "react";

export default function Modal({ title, onClose, children }) {
  const panelRef = useRef(null);

  // Escape closes the modal; focus starts on the panel so keyboard users
  // land somewhere sensible without needing to tab in from the page body.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        tabIndex={-1}
        className="bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 gap-3">
          <h3 className="text-lg font-semibold truncate min-w-0">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl leading-none shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
