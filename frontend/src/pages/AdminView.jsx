import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAdmin(response.data.role === "admin");
          if (response.data.role === "admin") {
            const usersResponse = await axios.get(
              "http://localhost:5000/api/users/all",
              {
                withCredentials: true,
              }
            );
            setUsers(usersResponse.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/${
          newRole === "admin" ? "admin" : "removeAdmin"
        }/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Failed to change user role:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div>
      <h1>Admin View</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username}
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button>Delete user</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminView;
