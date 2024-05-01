import React from "react";
import "./Styles/RolesList.css";
import { format } from "date-fns";
import StarFilled from "./RolesIcons/star.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPen,
  faTrash,
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
  toggleSettings: (id: string) => void;
  openSettingsIds: Set<string>;
  onOpenDeletePopup: (roleId: string, roleName: string) => void;
}

const RolesList: React.FC<RolesListProps> = ({
  roles,
  toggleSettings,
  openSettingsIds,
  onOpenDeletePopup,
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
            <ul className="table-shared-image-container-roles-list">
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
              onClick={() => toggleSettings(role.id)}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="settings-roles-icon-roles-list"
              />
              <div className="custom-dropdown">
                {openSettingsIds.has(role.id) && (
                  <ul className="custom-dropdown-menu">
                    <li className="drop-down-text-role-list-edit">
                      <button>
                        <Link to={`/accountManager/roles/${role.id}`}>
                          <FontAwesomeIcon
                            icon={faPen}
                            className="drop-down-icon-role-list-edit"
                          />
                          Edit
                        </Link>
                      </button>
                    </li>
                    <li className="drop-down-text-role-list-delete">
                      <button
                        className="delete-button-client-cards"
                        onClick={() => onOpenDeletePopup(role.id, role.name)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="drop-down-icon-role-list-delete"
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
