import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useAuth } from "../AuthContext";

const Register = (props) => {
  const { user, login, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.status == 201) {
        console.log(response);
        const { message, user, token } = response.data;
        login(user);
        localStorage.setItem("token", token);
        navigate("/attendance");
        alert(message);
      }
    } catch (error) {
      if (error.response?.data.message) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card-container max-w-md">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="mx-auto mb-5 rounded-full"
        />
        <form onSubmit={handleRegister} className="px-4">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group text-center">
            <button
              className="btn btn-primary rounded-lg bg-blue-500 hover:bg-blue-700 text-white text-lg px-4 py-2"
              disabled={loading}
              type="submit"
            >
              {loading ? <span>Registering...</span> : <span>Register</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
