import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { Todo } from "@/types/types";
import { useParams } from "react-router-dom";
import { Card, CardTitle } from "../ui/card";
import { addTodo } from "@/api/todos";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams<{ id: string }>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!todo.trim()) {
      setError("Please enter a todo.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await addTodo(todo.trim(), status, Number(id));
      setTodoList((prev) => [...prev, data]);
      setTodo("");
      setStatus(false);
      setSuccess("Todo added successfully!");
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
        <CardTitle>Add Todo</CardTitle>
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
            {loading ? "Adding..." : "Submit"}
          </Button>
        </form>
      </Card>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TodoForm;
