import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "../pages/Account Manager/Roles/Styles/RoleSlideOver.css";
import StarFilled from "../pages/Account Manager/Roles/RolesIcons/star.svg";
import AddIcon from "../pages/Account Manager/Roles/RolesIcons/add.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faChevronUp,
  faChevronDown,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { Role } from "../types";

interface RoleUsersSlideOverProps {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
}

const RoleUsersSlideOver: React.FC<RoleUsersSlideOverProps> = ({
  role,
  isOpen,
  onClose,
}) => {
  const [dropDown, setDropDown] = useState(true);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={onClose}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        <div className="top-slide-container-roles">
                          <p className="slide-over-title">Info</p>
                          <img
                            src={StarFilled}
                            alt="star"
                            className="star-icon-slide-over-roles"
                          />
                        </div>
                      </Dialog.Title>
                    </div>
                    <div className="gray-section-slide-over">
                      <div className="">
                        <FontAwesomeIcon
                          icon={faAddressBook}
                          className="address-book-icon-slide-over-roles"
                        />
                        <p className="role-title-slide-over">{role.name}</p>
                      </div>
                      <hr className="line-slide-over-roles" />
                      <div className="properties-section-slide-over">
                        <h3 className="properties-title-section-slide-over">
                          Properties
                        </h3>
                        <FontAwesomeIcon
                          icon={dropDown ? faChevronUp : faChevronDown}
                          className="chevron-up-icon-slide-over-roles"
                          onClick={() => setDropDown(!dropDown)}
                        />
                      </div>
                      {dropDown && (
                        <>
                          <div className="properties-row-slide-over-roles">
                            <p className="subtitle-properties-slide-over-roles">
                              ID
                            </p>
                            <p>{role.id}</p>
                          </div>
                          <div className="properties-row-slide-over-roles">
                            <p className="subtitle-properties-slide-over-roles">
                              Created
                            </p>

                            <p>
                              {format(new Date(role.createdAt), "dd MMM yyyy")}
                            </p>
                          </div>
                          <div className="properties-row-slide-over-roles">
                            <p className="subtitle-properties-slide-over-roles">
                              Updated
                            </p>

                            <p>
                              {format(new Date(role.updatedAt), "dd MMM yyyy")}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="user-roles-container-slide-over">
                      <div className="user-roles-top-section">
                        <h3 className="role-user-title-slide-over">
                          Role Share With
                        </h3>
                        <img
                          src={AddIcon}
                          alt="add"
                          className="add-icon-slide-over"
                        />
                      </div>

                      <ul>
                        {role.users.map((user) => (
                          <div
                            key={user.id}
                            className="users-profile-row-roles-slide-over"
                          >
                            <img
                              src={user.profileImage}
                              alt="profile"
                              className="user-profile-image-slide-over"
                            />
                            <div className="user-info-container-slide-over">
                              <p className="user-name-text-slide-over">
                                {user.name}
                              </p>
                              <p className="user-email-text-slide-over">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div className="delete-button-container-slide-over-roles">
                      <button
                        type="button"
                        className="delete-role-button-slide-over"
                      >
                        <div className="delete-button-text-container">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="trash-icon-red-slide-over-roles"
                          />
                          <p className="delete-text-button-roles-slide-over">
                            Delete
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RoleUsersSlideOver;
