import React from "react";
import "./Styles/RolesList.css";
import { format } from "date-fns";
import StarFilled from "./RolesIcons/star.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPen,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface Role {
  id: string;
  name: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  activeDB: boolean;
}

interface RolesListProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onShowUsers: (role: Role) => void;
  onToggleSettings: (id: string) => void;
  openSettingsIds: Set<string>;
}

const RolesList: React.FC<RolesListProps> = ({
  roles,
  onEdit,
  onDelete,
  onShowUsers,
  onToggleSettings,
  openSettingsIds,
}) => {
  return (
    <div>
      {roles.map((role) => (
        <div key={role.id} className="table-body-roles-list">
          <div className="table-header-left-roles-list">
            <label className="checkbox-container-roles-list">
              <input type="checkbox-roles-list" />
              <span className="checkmark-roles-list"></span>
            </label>
            <p className="title-top-section-text-roles-list">{role.name}</p>
          </div>
          <div className="table-header-right-roles-list">
            <p className="title-top-section-text-roles-list">{role.id}</p>
            <div className="modified-text-roles-list">
              <p className="title-top-section-text-roles-list">
                {format(new Date(role.updatedAt), "dd MMM yyyy")}
              </p>
              <p className="time-text-roles-list">
                {format(new Date(role.updatedAt), "h:mm aa")}
              </p>
            </div>
            <ul
              className="table-shared-image-container-roles-list"
              onClick={() => onShowUsers(role)}
            >
              {role.users.slice(0, 3).map((user, index) => (
                <li key={user.id} style={{ zIndex: role.users.length - index }}>
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="table-shared-image-roles-list"
                  />
                </li>
              ))}
              {role.users.length > 3 && (
                <li className="additional-count">+{role.users.length - 3}</li>
              )}
            </ul>
          </div>
          <div className="icons-section-roles-list">
            <img src={StarFilled} className="star-roles-icon-roles-list" />
            <div
              className="settings-role-list"
              onClick={() => onToggleSettings(role.id)}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="settings-roles-icon-roles-list"
              />
              <div className="custom-dropdown">
                {openSettingsIds.has(role.id) && (
                  <ul className="custom-dropdown-menu">
                    <li className="drop-down-text-role-list-view">
                      <button
                        className="edit-button-client-cards"
                        onClick={() => onShowUsers(role)}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className="drop-down-icon-role-list "
                        />
                        View
                      </button>
                    </li>
                    <li className="drop-down-text-role-list-edit">
                      <button
                        onClick={() => onEdit(role)}
                        className="edit-icon-role-list"
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          className="drop-down-icon-role-list "
                        />
                        Edit
                      </button>
                    </li>
                    <li className="drop-down-text-role-list-delete">
                      <button
                        className="delete-button-client-cards"
                        onClick={() => onDelete(role)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="drop-down-icon-role-list "
                        />
                        Delete
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesList;
