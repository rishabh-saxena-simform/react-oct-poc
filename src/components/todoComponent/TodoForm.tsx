import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { Todo } from "@/types/types";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardTitle } from "../ui/card";
import { addTodo, getTodo, updateTodo } from "@/api/todos";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id, todoId } = useParams<{ id: string; todoId: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(todoId);

  useEffect(() => {
    if (!todoId) return;

    getTodo(Number(todoId))
      .then((response) => {
        setTodo(response.todo);
        setStatus(response.completed);
      })
      .catch((error) => console.log(error));
  }, [todoId]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!todo.trim()) {
      setError("Please enter a todo.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = isEdit
        ? await updateTodo(Number(todoId), todo.trim(), status, Number(id))
        : await addTodo(todo.trim(), status, Number(id));
      setTodoList((prev) => [...prev, data]);
      setTodo("");
      setStatus(false);
      setSuccess(
        isEdit ? "Todo updated successfully!" : "Todo added successfully!",
      );
      if (isEdit) {
        alert("Todo updated successfully!");
        navigate(`/todo/user/${id}`);
      } else {
        alert("Todo added successfully!");
        navigate(`/todo/user/${id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 h-screen flex justify-center items-center shadow-2xl">
      <Card className="w-80 p-6">
        <CardTitle>{isEdit ? "Edit Todo" : "Add Todo"}</CardTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a new todo"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            Mark as completed
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? (isEdit ? "Updating..." : "Adding...") : "Submit"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default TodoForm;
