import { FetchUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/types/types";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserTable from "@/components/usersComponent/UserTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThemeContext } from "@/context/Theme";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  const [searchVal, setSearchVal] = useState<User | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    FetchUser()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function searchName() {
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
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme);

  return (
    <div
      className={`p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter a user's first name"
        />

        <Button onClick={searchName}>Search User</Button>
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Change Theme
        </Button>
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
          <UserTable user={users} />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default UserPage;
