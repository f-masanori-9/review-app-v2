import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Textarea,
  Transition,
} from "@headlessui/react";
import { Box } from "@mui/material";
import React, { FC, Fragment, useState } from "react";

interface AddTagDialogProps {
  isOpen: boolean;
  onClose: (inputName: string) => void;
}

export const AddTagDialog: FC<AddTagDialogProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform translate-y-4 opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-75 ease-in"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform translate-y-4 opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={() => {
          onClose(content);
          setContent("");
        }}
        className="relative z-50"
      >
        <Box sx={{ position: "fixed", inset: 0, bgcolor: "black", opacity: 0.3 }} />
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DialogPanel
            style={{
              width: "100vw",
              maxWidth: "24rem",
              borderRadius: "8px",
              backgroundColor: "white",
              padding: "8px",
            }}
          >
            <DialogTitle>タグ追加</DialogTitle>
            <Description style={{ padding: "8px" }}>
              <Textarea
                style={{
                  width: "100%",
                  padding: "8px",
                  borderColor: "#d1d5db",
                  borderRadius: "8px",
                }}
                autoFocus
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="タグ名"
              />
            </Description>
          </DialogPanel>
        </Box>
      </Dialog>
    </Transition>
  );
};