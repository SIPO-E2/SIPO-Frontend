import React from "react";
import "./Styles/RolesList.css";
import { format } from "date-fns";
import StarFilled from "./RolesIcons/star.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

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
}

const RolesList: React.FC<RolesListProps> = ({ roles }) => {
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
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="settings-roles-icon-roles-list"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesList;
