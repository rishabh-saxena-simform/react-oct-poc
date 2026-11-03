import { Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./routes";
import { useEffect, useState } from "react";
import { ThemeContext } from "./context/Theme";

function App() {
  const [theme, setTheme] = useState(() => {
    const themeVal = localStorage.getItem("theme");
    const finalTheme = themeVal ?? "dark";

    return finalTheme;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;
