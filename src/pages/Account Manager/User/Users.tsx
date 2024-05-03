// User.tsx
import React, { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, fetchUsers, setUsers } = useApisStore((state) => ({
    users: state.users,
    fetchUsers: state.fetchUsers,
    setUsers: state.setUsers,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, searchQuery, true);
  }, [currentPage, searchQuery, fetchUsers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Ensuresss a fresh search from page 1
  };

  return (
    <div>
      <h1>Users</h1>
      <div className="search-section-users">
        <input
          className="search-input"
          type="text"
          placeholder="Search for clients..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Link to="/accountManager/users/new">
        <button>Create User</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> <p>{user.id}</p> Roles:
            {user.roles.map((role, index) => (
              <span key={role.id}>
                {role.name}
                {index < user.roles.length - 1 ? ", " : ""}
              </span>
            ))}
            {user.clients && user.clients.length > 0 ? (
              <ul>
                {user.clients.map((client) => (
                  <div key={client.id}>
                    <p>- {client.name}</p>
                  </div>
                ))}
              </ul>
            ) : (
              <p>No clients associated.</p>
            )}
            <br />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default Users;
