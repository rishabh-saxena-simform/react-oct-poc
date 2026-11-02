// export interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   gender: string;
// }
export interface User {
  id: number;
  firstName: string;
  email: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
export interface Todo {
  id:number
  todo: string;
  completed: boolean;
  userId: number;
}
export interface TodoArr {
  todo:Todo[]
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
export interface TodoItem {
  todo: string;
  status: string;
}
export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}