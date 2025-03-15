import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Manisha",
    image: assets.profile_pic,
    email: "manishabudige@gmail.com",
    phone: "9848730008",
    gender: "Female",
    dob: "2001-12-09",
    address: "Hyderabad, India",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-6 max-w-lg mx-auto bg-black text-white rounded-lg shadow-lg mt-32">
      <div className="flex flex-col items-center">
        <img
          src={userData.image}
          className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
          alt="Profile"
        />
        {isEdit ? (
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <h2 className="text-xl font-semibold">{userData.name}</h2>
        )}
      </div>

      <hr className="my-4 border-gray-500" />

      <div className="space-y-2">
        <p className="font-semibold text-gray-300">Contact Information</p>
        <p>Email: {userData.email}</p>
        <p>Phone: {isEdit ? (
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={userData.phone}
            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
          />
        ) : (
          userData.phone
        )}</p>
      </div>

      <hr className="my-4 border-gray-500" />

      <div className="space-y-2">
        <p className="font-semibold text-gray-300">Basic Information</p>
        <p>Gender: {isEdit ? (
          <select
            className="border p-2 rounded w-full text-black"
            onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            value={userData.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          userData.gender
        )}</p>

        <p>Date of Birth: {userData.dob}</p>

        <p>Location/Address: {isEdit ? (
          <input
            type="text"
            className="border p-2 rounded w-full text-black"
            value={userData.address}
            onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
          />
        ) : (
          userData.address
        )}</p>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setIsEdit(!isEdit)}
      >
        {isEdit ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default MyProfile;

