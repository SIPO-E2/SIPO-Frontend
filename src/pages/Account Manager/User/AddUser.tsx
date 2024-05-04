import React, { useEffect, useState, ChangeEvent } from "react";
// import { User } from "../../../types";
import { useApisStore } from "../../../store/apiStore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Styles/AddUser.css";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  roles: string[];
}

const AddUser: React.FC = () => {
  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    roles: [],
  });

  const { createUser, fetchRoles, createUserRole, roles } = useApisStore(
    (state) => ({
      createUser: state.createUser,
      fetchRoles: state.fetchRoles,
      createUserRole: state.createUserRole,
      roles: state.roles,
    })
  );

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleRoleChange = (roleId: string) => {
    setUserData((prevState) => {
      const newRoles = prevState.roles.includes(roleId)
        ? prevState.roles.filter((id) => id !== roleId)
        : [...prevState.roles, roleId];
      return { ...prevState, roles: newRoles };
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "image-upload" && files) {
      const profileImage = URL.createObjectURL(files[0]);
      setUserData({ ...userData, profileImage });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.profileImage
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const newUser = await createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: userData.profileImage,
      });

      if (newUser && userData.roles.length > 0) {
        await Promise.all(
          userData.roles.map((roleId) =>
            createUserRole({ userId: newUser.id, roleId })
          )
        );
        alert("User and roles created successfully!");
      } else {
        alert("User created successfully but no roles assigned!");
      }

      toast.success(`User ${userData.name} added successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setUserData({
        name: "",
        email: "",
        password: "",
        profileImage: "",
        roles: [],
      });
    } catch (error) {
      console.error("Error creating user or roles:", error);
      alert("Error creating user or roles");
      toast.error("Failed to add User. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="main-content-add-user">
      <div className="body-content-add-user">
        <div className="text-left px-5 pt-4 mb-5">
          <h1 className="font-bold">Create a new user</h1>
        </div>
        <div className="flex p-10 gap-4">
          <div className="w-1/4">
            <div className="flex flex-col items-center p-5 bg-white shadow rounded">
              <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded flex justify-center items-center mb-4">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="rounded-md max-w-full max-h-64 object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No image selected</span>
                )}
              </div>

              <div className="w-full flex items-center">
                <input
                  type="text"
                  name="imageURL"
                  value={userData.profileImage || ""}
                  onChange={handleChange}
                  className="border-2 border-gray-300 bg-white h-10 px-2 rounded-l-lg text-sm focus:outline-none w-full"
                  placeholder="Image URL or upload file"
                />
                <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg cursor-pointer">
                  Browse
                  <input
                    type="file"
                    id="image-upload"
                    name="image-upload"
                    className="sr-only"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 mt-0 bg-white p-5 shadow rounded"
          >
            <div className="flex flex-wrap">
              <div className="px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Name:
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter user's name"
                      value={userData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </label>
                </div>
              </div>

              <div className="px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Email
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter user's email"
                      value={userData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </label>
                </div>
              </div>

              <div className="px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter user's password"
                    value={userData.password}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>

              <div className="px-3 sm:w-full">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Roles
                  </label>
                  <div className="flex items-center gap-4">
                    {roles.map((role) => (
                      <div key={role.id}>
                        <label>
                          <input
                            type="checkbox"
                            name="roles"
                            value={role.id}
                            checked={userData.roles.includes(role.id)}
                            onChange={() => handleRoleChange(role.id)}
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />

                          {role.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex px-10 pt-4 w-full justify-end">
          <div className="px-3">
            <Link to="/accountManager/users">
              <button
                type="button"
                className="py-3 px-3 bg-gray-300 hover:bg-gray-500 text-xl
               text-white font-bold rounded"
              >
                Cancel
              </button>
            </Link>
          </div>

          <div className="">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-3 px-3 rounded"
            >
              Create user
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
