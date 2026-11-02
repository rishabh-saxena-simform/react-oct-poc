import type { ThemeContextType } from "@/types/types";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});
