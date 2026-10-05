"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";

const ThemeSynchronizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeSynchronizer>{children}</ThemeSynchronizer>
    </Provider>
  );
};
