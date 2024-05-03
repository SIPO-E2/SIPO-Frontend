// User.tsx
import React, { useEffect, useState } from "react";
import { useApisStore } from "../../../store/apiStore";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
import UserCards from "./UserCards";
import DeleteUser from "./DeleteUser";
import "./Styles/Users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SelectedUser {
  id: number | null;
  name: string;
}

const Users = () => {
  const { users, fetchUsers, setUsers } = useApisStore((state) => ({
    users: state.users,
    fetchUsers: state.fetchUsers,
    setUsers: state.setUsers,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 102;

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, searchQuery, true);
  }, [currentPage, searchQuery, fetchUsers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Ensuresss a fresh search from page 1
  };

  /* --------------------- Settings pop up ----------------------------- */

  const [openSettingsIds, setOpenSettingsIds] = useState(new Set<number>());

  const toggleSettings = (id: number) => {
    setOpenSettingsIds(
      (prev) =>
        new Set(
          prev.has(id) ? [...prev].filter((item) => item !== id) : [...prev, id]
        )
    );
  };

  /* --------------------- Delete pop up ---------------------*/

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({
    id: null,
    name: "",
  });

  const handleOpenDeletePopup = (userId: number, userName: string) => {
    setSelectedUser({ id: userId, name: userName });
    setDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupOpen(false);
    setSelectedUser({ id: null, name: "" });
  };

  /* --------------------- Render Deleting --------------------- */

  // Function to handle the deletion of a client
  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    setDeletePopupOpen(false); // Close the popup after deletion
  };

  return (
    <div className="main-users">
      <div className="body-content-users">
        <div className="header-content-users">
          <h1 className="section-title-users">Users</h1>
          <Link to="/accountManager/users/new">
            <button className="add-button-users">+ Add User</button>
          </Link>
        </div>

        <div className="users-search-section">
          <FontAwesomeIcon icon={faSearch} className="users-search-icon" />
          <input
            className="users-search-input"
            type="text"
            placeholder="Search for clients..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <UserCards
          users={users}
          toggleSettings={toggleSettings}
          openSettingsIds={openSettingsIds}
          onOpenDeletePopup={handleOpenDeletePopup}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={setCurrentPage}
      />

      {isDeletePopupOpen && (
        <DeleteUser
          key={selectedUser.id}
          userId={selectedUser.id as number}
          userName={selectedUser.name}
          onClose={handleCloseDeletePopup}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default Users;
