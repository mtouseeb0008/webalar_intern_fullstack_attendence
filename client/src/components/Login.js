import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login, logout } = useAuth();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    login(null);
    navigate("/login");
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/login`,
        {
          email,
          password,
        }
      );

      console.log(response);

      if (response.status == 200) {
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
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        login(response.data.user);
      } else {
        logoutHandler();
        login(null);
      }
    } catch (error) {
      logoutHandler();
      login(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (localStorage.getItem("token")) return <Navigate to="/attendance" />;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card-container max-w-md">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="mx-auto mb-5 rounded-full"
        />
        <form onSubmit={loginHandler} className="px-4">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </div>

          <div>
            <button
              onClick={loginHandler}
              className="btn btn-primary rounded-lg bg-blue-500 hover:bg-blue-700 text-white text-lg px-4 py-2"
              disabled={loading}
              type="submit"
            >
              {loading ? <span>"Logging..."</span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
