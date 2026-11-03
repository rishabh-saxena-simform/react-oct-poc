import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "@/pages/NotFoundPage";
import UserPage from "@/pages/Users/UserPage";
import TodosPage from "@/pages/Todos/Todos";
import UserDetailPage from "@/pages/Users/UserDetailPage";
import TodoForm from "@/components/todoComponent/TodoForm";
import RootLayout from "@/components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UserPage />,
      },
      {
        path: "user/:id",
        element: <UserDetailPage />,
      },
      {
        path: "todo/user/:id",
        element: <TodosPage />,
      },
      {
        path: "todo/add/:id",
        element: <TodoForm />,
      },
      {
        path: "todo/edit/:id/:todoId",
        element: <TodoForm />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
