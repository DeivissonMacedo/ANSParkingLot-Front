import React from "react";
import "./Dialog.css"; // se quiser separar estilos depois

export const DialogBox = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="dialog-header">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);

export const DialogFooter = ({ children }) => (
  <div className="dialog-footer">{children}</div>
);
