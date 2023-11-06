"use client";
import { useEffect } from "react";

type ModifierKey = "Shift";

const useKeyboardShortcut = (
  key: string,
  modifier: ModifierKey,
  callback: () => void
): void => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isModifierPressed = event.shiftKey;
      if (isModifierPressed && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [key, modifier, callback]);
};

export default useKeyboardShortcut;
