import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigate();

  async function handleSubmition(e) {
    e.preventDefault();
    try {
      const respons = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        {
          name,
          userName,
        }
      );
      toast.success(respons.data.message);
      navigation("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Registration Fail."
      setErrorMessage(message);
      toast.error(message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmition}
        className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Registration
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="input mb-4"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter username"
          className="input mb-4"
          onChange={(e) => setUserName(e.target.value)}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm text-center my-2">
             {errorMessage}
          </p>
        )}
        <button type="submit" className="btn w-full mb-2">
          Sign Up
        </button>
        <span className="mx-10 text-white">Allready have an account? <Link to="/login" className="text-blue-500">Login</Link></span>
      </form>
    </div>
  );
};

export default RegistrationPage;