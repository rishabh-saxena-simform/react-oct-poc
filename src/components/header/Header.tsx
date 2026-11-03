import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "@/context/Theme";
import { Button } from "../ui/button";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
      isActive ? "bg-muted text-foreground" : "text-muted-foreground"
    }`;

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
      <div className="flex items-center gap-6">
        <span className="text-lg font-semibold tracking-tight">
          Todo App
        </span>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={navLinkClass} end>
            Users
          </NavLink>
        </nav>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={toggleTheme}>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>
    </header>
  );
};

export default Header;
