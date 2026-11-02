
import type { Todo, User, UsersResponse } from "@/types/types";
import { apiGet } from "./apiClient";

export async function FetchUser(): Promise<User[]> {
  const data = await apiGet<UsersResponse>(
    "https://dummyjson.com/users"
  );

  return data.users;
}

export function FetchUserById(id: string): Promise<User> {
  return apiGet<User>(`https://dummyjson.com/users/${id}`);
}

export async function TodosFn(): Promise<Todo[]> {
  const data = await apiGet<TodosArr>(
    "https://dummyjson.com/todos"
  );

  return data.todos;
}
