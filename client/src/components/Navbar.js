import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
const Navbar = () => {
  const { user, login, logout } = useAuth();

  const navitem = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Register",
      path: "/register",
    },
    {
      title: "GitHub",
      path: "https://github.com/mtouseeb0008",
    },
  ];

  const authNavItem = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Attendance",
      path: "/attendance",
    },
    {
      title: "AttendanceList",
      path: "/attendancelist",
    },
  ];
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    login(null);
    navigate("/login");
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
  return (
    <div className=" w-full flex items-center justify-between px-2 py-3 bg-black text-white">
      <h1>Attendance Portal</h1>

      <div className=" flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            {authNavItem.map((item, index) => (
              <Link to={item.path} key={index}>
                {item.title}
              </Link>
            ))}
            <Link to={"/login"} onClick={logoutHandler}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {navitem.map((item, index) => (
              <Link to={item.path} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
