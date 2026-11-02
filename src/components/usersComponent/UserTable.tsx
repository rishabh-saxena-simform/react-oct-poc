import type { User } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface userData {
  user: User[];
}

const UserTable = ({ user }: userData) => {
  const navigate = useNavigate();
  return (
    <Table className="p-3">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {user.map((items) => (
          <TableRow key={items.id}>
            <TableCell
              className="font-medium"
              onClick={() => navigate(`/user/${items.id}`)}
            >
              {items.id}
            </TableCell>
            <TableCell>{items.firstName}</TableCell>
            <TableCell>{items.email}</TableCell>
            <TableCell>
              <Button onClick={() => navigate(`/todo/user/${items.id}`)}>
                Todo
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
