import type { User } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { FetchUser } from "@/api/user";
import { Card, CardContent, CardHeader } from "../ui/card";
import Pagination from "../pagination/Pagination";
import useDebounce from "@/hooks/useDebounce";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  const [searchVal, setSearchVal] = useState<User | null>(null);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedUserName = useDebounce(userName, 1000);

  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);
  useEffect(() => {
    FetchUser()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    if (!debouncedUserName.trim()) {
      return;
    }

    searchName(debouncedUserName);
  }, [debouncedUserName]);

  function searchName(userName: string) {
    if (userName.trim() === "") {
      alert("Please enter a username");
      return;
    }

    const result = users.find(
      (element) =>
        userName.trim().toLowerCase() === element.firstName.toLowerCase(),
    );

    console.log(result);
    setSearchVal(result ?? null);
    setSearched(true);
  }
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter a user's first name"
        />

        <Button onClick={() => searchName(userName)}>Search User</Button>
      </div>

      {searched ? (
        searchVal ? (
          <Link
            key={searchVal.id}
            to={`/user/${searchVal.id}`}
            className="block"
          >
            <Card>
              <CardHeader className="text-xl font-semibold">
                User Detail
              </CardHeader>
              <CardContent>
                <p className="mb-2"> User Id:{searchVal.id}</p>
                <p className="mb-2"> firstName:{searchVal.firstName}</p>
                <p className="mb-2"> email:{searchVal.email}</p>
              </CardContent>
            </Card>
          </Link>
        ) : (
          <p>User not found.</p>
        )
      ) : (
        <div className="">
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
              {currentUsers.map((items) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;
