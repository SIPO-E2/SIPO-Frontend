import { User } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface UserCardProps {
  users: User[];
  toggleSettings: (id: number) => void;
  openSettingsIds: Set<number>;
  // onOpenDeletePopup: (userId: number, userName: string) => void;
}

const UserCards: React.FC<UserCardProps> = ({
  users,
  toggleSettings,
  openSettingsIds,
  // onOpenDeletePopup,
}) => {
  return (
    <div className="row">
      {users.map((user) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={user.id}>
          <div className="job-card">
            <div className="card-top">
              <img
                src={user.profileImage}
                alt="User Profile"
                className="company-logo"
              />
              <div
                className="settings-icon-client-cards"
                onClick={() => toggleSettings(user.id)}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
                {openSettingsIds.has(user.id) && (
                  <div className="floating-dropdown show cursor-pointer">
                    <ul>
                      <li className="drop-down-text">
                        <Link to={`/accountManager/users/edit/${user.id}`}>
                          <FontAwesomeIcon
                            icon={faPen}
                            className="drop-down-icon"
                          />
                          Edit
                        </Link>
                      </li>
                      <li className="drop-down-text">
                        <button
                        // onClick={() => onOpenDeletePopup(user.id, user.name)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="drop-down-icon"
                          />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="card-bottom">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCards;
