import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchUserById } from "@/api/user";
import type { User } from "@/types/types";
import { ThemeContext } from "@/context/Theme";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError("");

    FetchUserById(id)
      .then((response) => {
        console.log(response);
        setUser(response);
      })
      .catch((error) => {
        setError("User details not loading");
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found</p>;
  const { theme } = useContext(ThemeContext);

  return (
    <div
    className={`p-6 h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="mb-4 font-semibold text-3xl">User Profile Page</h1>
      <div className="border-2 border-gray-200 p-4 rounded-2xl">
        <p className="font-semibold">
          {" "}
          UserId :<span className="font-normal">{user.id}</span>
        </p>
        <p className="font-semibold">
          First Name: <span className="font-normal">{user.firstName}</span>
        </p>
        <p className="font-semibold">
          Email: <span className="font-normal">{user.email}</span>
        </p>
      </div>
    </div>
  );
};

export default UserDetailPage;
