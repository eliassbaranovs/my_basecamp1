import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-6">
              User Management
            </h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 mt-7">
              All Users
            </span>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-600 md:rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="relative py-4 px-6"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {users.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <h2 className="font-medium text-gray-800 dark:text-white">
                                {user.username}
                              </h2>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <select
                              value={user.role}
                              onChange={(e) =>
                                handleRoleChange(user._id, e.target.value)
                              }
                              className="px-3 py-1.5 text-sm border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default AdminView;
