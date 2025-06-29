"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { FC } from "react";
import { Paper, Box } from "@mui/material";

export const DropDownMenu: FC<{
  menuButtonChildren: React.ReactNode;
  items: {
    key: string;
    children: React.ReactNode;
    onClick: () => void;
  }[];
}> = ({ menuButtonChildren, items }) => {
  return (
    <Menu>
      <MenuButton
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {menuButtonChildren}
      </MenuButton>
      <MenuItems anchor="bottom">
        <Paper
          sx={{
            bgcolor: "white",
            p: 1,
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
            width: "80px",
          }}
        >
          {items.map(({ key, children, onClick }) => {
            return (
              <MenuItem key={key}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                  onClick={() => {
                    onClick();
                  }}
                >
                  {children}
                </Box>
              </MenuItem>
            );
          })}
        </Paper>
      </MenuItems>
    </Menu>
  );
};
