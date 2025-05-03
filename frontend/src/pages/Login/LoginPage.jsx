import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmition(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { userName }
      );

      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.name);
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
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
          Login
        </h1>
        <input
          type="text"
          placeholder="Enter your username"
          className="input"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        {errorMessage && (
          <p className="text-red-500 text-sm text-center my-2">
             {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Sign In
        </button>
        <p className="text-sm mt-2 text-center text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-300 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
