// import React from 'react'

// const Register = () => {
//   return (
//     <div>Register</div>
//   )
// }

// export default Register

import React, { useState } from "react";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Register = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    message: "",
  });

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
    });
  };

  const onChangeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };

  const onChangeConfirmPassword = (e) => {
    setState({
      ...state,
      confirmPassword: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setState({
      ...state,
      message: "",
      loading: true,
    });

    // Check if all fields are filled
    if (
      !state.username ||
      !state.email ||
      !state.password ||
      !state.confirmPassword
    ) {
      setState({
        ...state,
        loading: false,
        message: "All fields are required.",
      });
      return;
    }

    // Check if password and confirm password match
    if (state.password !== state.confirmPassword) {
      setState({
        ...state,
        loading: false,
        message: "Passwords do not match.",
      });
      return;
    }

    // Perform registration
    AuthService.register(state.username, state.email, state.password)
      .then(() => {
        // Redirect or perform any other action upon successful registration
        console.log("Registration successful!");
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setState({
          ...state,
          loading: false,
          message: resMessage,
        });
      });
  };

  const { username, email, password, confirmPassword, loading, message } =
    state;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card-container max-w-md">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="mx-auto mb-5"
        />
        <form onSubmit={handleRegister} className="px-4">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="border rounded-md px-3 py-2 mt-1 mb-5 focus:outline-none focus:ring focus:border-blue-300 w-full"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
            />
          </div>

          <div className="form-group text-center">
            <button
              className="btn btn-primary rounded bg-blue-500 hover:bg-blue-700 text-white text-lg"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
