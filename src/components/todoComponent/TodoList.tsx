import { TodosFn } from "@/api/user";
import type { Todo } from "@/types/types";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";

const TodoList = () => {
  const [todolist, setTodolist] = useState<Todo[]>([]);
  useEffect(() => {
    TodosFn()
      .then((response) => {
        setTodolist(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-6 ">
      <div className="flex flex-wrap gap-4">
        {todolist.map((items) => (
          <Card key={items.id} className="p-4">
            <div>
              <p>{items.id}</p>
              <p>{items.todo}</p>
              <p>{items.completed}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
