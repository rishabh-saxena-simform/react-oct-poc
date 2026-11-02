import { Route, RouterProvider, Routes } from "react-router-dom";
// import { router } from "@/routes";
// import UserPage from "./pages/Users/UserPage";
// import UserInfo from "./pages/Users/UserDetailPage";
// import { NotFoundPage } from "./pages/NotFoundPage";
// import TodosPage from "./pages/Todos";
// import TodoForm from "./components/todoComponent/TodoForm";
import { router } from "./routes";
import { useState } from "react";
import { ThemeContext } from "./context/Theme";


function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
    // <Routes>
    //   <Route path="*" element={<NotFoundPage />} />
    //   <Route path="/" element={<UserPage />} />
    //   <Route path="/user/:id" element={<UserInfo />} />
    //   <Route path="/todo" element={<TodosPage />} />
    //   <Route path="todo/user/:id" element={<TodosPage />} />
    //   <Route path="/todo/add/:id" element={<TodoForm />} />
    //   {/* <Route path="/todo/edit/:userId/:todoId" element={<TodoForm />} />
    //    */}
    //   <Route path="/todo/edit/:id/:todoId" element={<TodoForm />} />
    // </Routes>
  );
}

export default App;
