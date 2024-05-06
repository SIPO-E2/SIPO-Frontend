import { User } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Styles/UserCards.css";

interface UserCardProps {
  users: User[];
  toggleSettings: (id: number) => void;
  openSettingsIds: Set<number>;
  onOpenDeletePopup: (userId: number, userName: string) => void;
}

const UserCards: React.FC<UserCardProps> = ({
  users,
  toggleSettings,
  openSettingsIds,
  onOpenDeletePopup,
}) => {
  const backgroundImages = [
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_10.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_11.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_12.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_13.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_15.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_16.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_17.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_18.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_19.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_20.jpg",
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_21.jpg",
  ];

  const getRandomBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  };
  return (
    <div className="row">
      {users.map((user) => (
        <div
          className="col-lg-4 col-md-6 col-sm-12 mb-4 user-cards-container"
          key={user.id}
        >
          <div className="card-users">
            <div className="background">
              <img src={getRandomBackgroundImage()} alt="Colorful background" />
            </div>
            <div className="profile">
              <img
                src={
                  user.profileImage &&
                  (user.profileImage.startsWith("blob") ||
                    user.profileImage.startsWith("C:"))
                    ? "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                    : user.profileImage
                }
                alt="Profile Picture"
                className="profile-image-image-user-cards"
              />
            </div>
            <div className="info">
              <h1 className="user-name-title">{user.name}</h1>
              <p className="user-email-title">{user.email}</p>
              <div className="user-action-container">
                <Link to={`/admin/users/${user.id}`}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className="edit-icon-user-cards"
                  />
                </Link>
                <button onClick={() => onOpenDeletePopup(user.id, user.name)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon-user-cards"
                  />
                </button>
              </div>
              <hr className="custom-hr-card" />
              <div className="statistics">
                <div>
                  <span>Roles</span>
                  <strong>{user.roles.length}</strong>
                </div>
                <div>
                  <span>Projects</span>
                  <strong>{user.projects.length}</strong>
                </div>
                <div>
                  <span>Clients</span>
                  <strong>{user.clients.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCards;
