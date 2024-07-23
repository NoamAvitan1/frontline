import React from "react";

/**
 * @typedef {Object} GenericModalProps
 * @property {React.ReactNode} children 
 * @property {boolean} isOpen 
 */

/**
 * @param {GenericModalProps} props
 * @returns {JSX.Element}
 */ 
export const GenericModal = ({ childern, isOpen }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center tooltip vanish">
        {childern}
      </div>
    )
  );
};
