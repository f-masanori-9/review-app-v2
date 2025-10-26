'use client';

import { TextField } from '@mui/material';
import React, { type ChangeEventHandler, type FC, useState } from 'react';

export const TextAreaAutoSize: FC<{
  defaultValue: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
}> = ({ defaultValue, onChange, placeholder }) => {
  const [value, setValue] = useState(defaultValue);
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <TextField
      inputRef={ref}
      multiline
      fullWidth
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e as React.ChangeEvent<HTMLTextAreaElement>);
      }}
      placeholder={placeholder}
      sx={{
        '& .MuiOutlinedInput-root': {
          padding: 1.5,
          margin: 0.5,
          border: 'none',
          '&:focus': {
            outline: 'none',
          },
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
        '& .MuiInputBase-input': {
          minHeight: '128px',
          height: 'auto',
          padding: 0,
        },
      }}
    />
  );
};
