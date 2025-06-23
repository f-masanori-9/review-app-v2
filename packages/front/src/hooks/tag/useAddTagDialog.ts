import { useState } from "react";

export const useAddTagDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
};