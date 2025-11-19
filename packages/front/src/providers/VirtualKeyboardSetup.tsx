'use client';

import { useEffect } from 'react';

export const VirtualKeyboardSetup = () => {
  useEffect(() => {
    if ('virtualKeyboard' in navigator) {
      (navigator as any).virtualKeyboard.overlaysContent = true;
    }
  }, []);

  return null;
};
