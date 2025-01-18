"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { lightTheme, darkTheme } from "@/lib/theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
