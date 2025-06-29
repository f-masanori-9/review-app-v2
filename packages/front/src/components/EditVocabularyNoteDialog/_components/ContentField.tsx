"use client";

import { TextField } from "@mui/material";

interface ContentFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
}

export function ContentField({
  value,
  onChange,
  placeholder,
  rows,
}: ContentFieldProps) {
  return (
    <TextField
      fullWidth
      multiline
      rows={rows}
      sx={{
        mb: 0.5,
        "& .MuiOutlinedInput-root": {
          padding: "6px 8px",
        },
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
