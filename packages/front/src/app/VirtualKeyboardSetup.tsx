'use client';

import { useEffect } from 'react';

declare global {
  interface Navigator {
    virtualKeyboard?: {
      overlaysContent: boolean;
    };
  }
}

export function VirtualKeyboardSetup() {
  useEffect(() => {
    if ('virtualKeyboard' in navigator && navigator.virtualKeyboard) {
      navigator.virtualKeyboard.overlaysContent = true;
    }
  }, []);

  return null;
}
