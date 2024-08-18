"use client";

import { useEffect, useState } from "react";

const useLocalStorage = (keyItem: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      let itemValue = localStorage.getItem(keyItem) || "";
      return itemValue ? JSON.parse(itemValue) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(keyItem, JSON.stringify(value));
  }, [value, keyItem]);

  return [value, setValue];
};

export default useLocalStorage;
