import type { Todo, TodoItem, Todos, TodosArr } from "@/types/types";
import { apiGet } from "./apiClient";

export async function TodosFn(): Promise<Todo[]> {
  const data = await apiGet<TodosArr>("https://dummyjson.com/todos");

  return data.todos;
}

export async function UserTodo(id: string): Promise<Todos[]> {
  const data = await apiGet<TodosArr>(`https://dummyjson.com/todos/user/${id}`);

  return data.todos;
}
export async function addTodo(
  todo: string,
  status: boolean,
  userId: number,
): Promise<Todo> {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: todo,
      completed: status,
      userId: userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  const data: Todo = await response.json();

  return data;
}

export async function updateTodo(
  todoId: number,
  todo: string,
  status: boolean,
  userId: number,
): Promise<Todo> {
  const response = await fetch(`https://dummyjson.com/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: todo,
      completed: status,
      userId: userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  const data: Todo = await response.json();

  return data;
}


export async function deleteTodo(id: number) {
  const response = await fetch(
    `https://dummyjson.com/todos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  const data = await response.json();

  return data;
}

