import React, { useEffect, useState, ChangeEvent } from "react";
import { User } from "../../../types";
import { useApisStore } from "../../../store/apiStore";
import { Link } from "react-router-dom";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
}

const AddUser: React.FC = () => {
  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const { createUser } = useApisStore((state) => ({
    createUser: state.createUser,
  }));

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    if (name === "image-upload" && target.files) {
      const profileImage = URL.createObjectURL(target.files[0]);
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
      const formData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: userData.profileImage,
      };

      const newUser = await createUser(formData);

      setUserData({
        name: "",
        email: "",
        password: "",
        profileImage: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {userData.profileImage ? (
          <img src={userData.profileImage} alt="Profile" />
        ) : (
          <p>No image uploaded</p>
        )}
      </div>
      <label>
        Name:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter user's name"
          value={userData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter user's email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter user's password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Profile Image:
        <input
          type="file"
          id="image-upload"
          name="image-upload"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
      <Link to="/accountManager/users">
        <button>Back to Users</button>
      </Link>
      <button type="submit">Create User</button>
    </form>
  );
};

export default AddUser;
