import { deleteTodo, UserTodo } from "@/api/todos";
import { Button } from "@/components/ui/button";
// import { NewThemeContext } from "@/context/Theme";
import type { Todo } from "@/types/types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TodosPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [userTodo, setUserTodo] = useState<Todo[]>([]);

  async function handleDelete(todoId: number) {
    try {
      await deleteTodo(todoId);

      setUserTodo((prev) => prev.filter((item) => item.id !== todoId));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete todo");
    }
  }
  // const theme = useContext(NewThemeContext);

  useEffect(() => {
    if (!id) return;

    UserTodo(id)
      .then((response) => {
        setUserTodo(response);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="mb-4 font-semibold text-3xl">User {id} Todos</h1>
      {/* <Button className={theme === "light" ? "bg-red-500" : "bg-green-500"}>
        Check
      </Button> */}
      {userTodo.map((items) => (
        <div key={items.id} className="mb-4 rounded border p-4">
          <p>Todo: {items.todo}</p>
          <p>User ID: {items.userId}</p>
          <p>Completed: {String(items.completed)}</p>

          <div className="mt-2 flex gap-2">
            <Button onClick={() => navigate(`/todo/edit/${id}/${items.id}`)}>
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => handleDelete(items.id)}
            >
              Delete Todo
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={() => navigate(`/todo/add/${id}`)}>Add Todo</Button>
    </div>
  );
};

export default TodosPage;
