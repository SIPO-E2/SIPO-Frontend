import React, { useEffect } from "react";
import { useApisStore } from "../../../store/apiStore";

const UserClientList = () => {
  const { users, fetchUsers } = useApisStore();

  useEffect(() => {
    fetchUsers(); // Asegúrate de que esta función también carga los clientes asociados
  }, [fetchUsers]);

  return (
    <div>
      <h1>Users and Their Clients</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> (Email: {user.email})
            {user.clients && user.clients.length > 0 ? (
              <ul>
                {user.clients.map((client) => (
                  <li key={client.id}>{client.name}</li>
                ))}
              </ul>
            ) : (
              <p>No clients associated.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserClientList;
