import { useEffect, useState } from "react";

import AdminLayout from "./layouts/AdminLayout";

import { getUsers } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH USERS
  // ======================

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* HEADER */}

        <div className="mb-8">
          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Users
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Total Registered Users: {users.length}
          </p>
        </div>

        {/* TABLE */}

        {loading ? (
          <div>Loading Users...</div>
        ) : (
          <div
            className="
              bg-white
              rounded-2xl
              shadow
              overflow-x-auto
            "
          >
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">User ID</th>

                  <th className="p-4 text-left">Name</th>

                  <th className="p-4 text-left">Email</th>

                  <th className="p-4 text-left">Role</th>

                  <th className="p-4 text-left">Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td
                      className="
                        p-4
                        font-mono
                        text-sm
                        text-gray-600
                      "
                    >
                      {user._id}
                    </td>
                    <td className="p-4">{user.name}</td>

                    <td className="p-4">{user.email}</td>

                    <td className="p-4">
                      <span
                        className="
                            px-3
                            py-1
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            text-sm
                          "
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
