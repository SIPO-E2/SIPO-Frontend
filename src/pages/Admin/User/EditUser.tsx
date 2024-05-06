import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApisStore } from "../../../store/apiStore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Styles/EditUser.css";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  roles: string[];
}

const EditUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchUserById,
    updateUser,
    fetchRoles,
    roles: allRoles,
    deleteUserRole,
    createUserRole,
  } = useApisStore((state) => ({
    fetchUserById: state.fetchUserById,
    updateUser: state.updateUser,
    fetchRoles: state.fetchRoles,
    roles: state.roles,
    deleteUserRole: state.deleteUserRole,
    createUserRole: state.createUserRole,
  }));

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    roles: [],
  });

  useEffect(() => {
    const loadUserData = async () => {
      const user = await fetchUserById(Number(id));
      if (user) {
        setUserData({
          name: user.name,
          email: user.email,
          password: "",
          profileImage: user.profileImage,
          roles: user.roles.map((role) => role.id),
        });
      }
    };
    loadUserData();
  }, [fetchUserById, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleChange = (roleId: string) => {
    setUserData((prevData) => ({
      ...prevData,
      roles: prevData.roles.includes(roleId)
        ? prevData.roles.filter((id) => id !== roleId)
        : [...prevData.roles, roleId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Elimina todos los roles del usuario
      await Promise.all(
        allRoles.map((role) =>
          deleteUserRole({ userId: Number(id), roleId: role.id })
        )
      );

      // Crea solo los roles seleccionados para el usuario
      await Promise.all(
        userData.roles.map((roleId) =>
          createUserRole({ userId: Number(id), roleId })
        )
      );

      // Actualiza los datos del usuario
      await updateUser({
        id: Number(id),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: userData.profileImage,
      });

      toast.success(`User ${userData.name} updated successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/admin/users");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Error updating user");
      toast.error("Failed to updated User. Please try again.", {
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
    <div className="main-content-edit-user ">
      <div className="body-content-edit-user ">
        <div className="text-left px-5 pt-4 mb-5">
          <h1 className="font-bold">Edit User</h1>
        </div>
        <div className="flex p-10 gap-4">
          <div className="w-1/4">
            <div className="flex flex-col items-center p-5 bg-white shadow rounded">
              <div className="w-full h-64 border-2 border-gray-300 border-dashed rounded flex justify-center items-center mb-4">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt={userData.name}
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>

              <div className="px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="block text-left font-bold sm:text-lg pb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
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
                    value={userData.password}
                    onChange={handleInputChange}
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
                    {allRoles.map((role) => (
                      <div key={role.id}>
                        <input
                          type="checkbox"
                          id={`role-${role.id}`}
                          checked={userData.roles.includes(role.id)}
                          onChange={() => handleRoleChange(role.id)}
                          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`role-${role.id}`}>{role.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex px-10 pt-4 w-full justify-end">
              <div className="px-3">
                <Link to="/admin/users">
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
                  type="submit" // Changed to type 'submit'
                  className="flex bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-3 px-3 rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
