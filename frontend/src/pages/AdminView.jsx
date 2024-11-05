import React, { useEffect, useState } from 'react';

const AdminView = ({ isAdmin, fetchUsers, assignRole }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers().then(setUsers);
    }
  }, [isAdmin, fetchUsers]);

  const handleRoleChange = (userId, newRole) => {
    assignRole(userId, newRole).then(() => {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    });
  };

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div>
      <h1>Admin View</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminView;