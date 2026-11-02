import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "@/pages/NotFoundPage";
import UserPage from "@/pages/Users/UserPage";
import TodosPage from "@/pages/Todos";
import UserDetailPage from "@/pages/Users/UserDetailPage";
import TodoForm from "@/components/todoComponent/TodoForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserPage />,
  },
  {
    path: "/user/:id",
    element: <UserDetailPage />,
  },
  {
    path: "/todo",
    element: <TodosPage />,
  },
  {
    path: "todo/user/:id",
    element: <TodosPage />,
  },
  {
    path: "/todo/add/:id",
    element: <TodoForm />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
