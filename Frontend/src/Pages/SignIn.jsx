import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../Store/auth";
import { useDispatch } from "react-redux";
const SignIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sign-in",
        Values
      );
      dispatch(authActions.login());
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/profile");
      dispatch(authActions.changeRole(response.data.role));
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="bg-zinc-900 px-12 py-8 flex items-center justify-center h-[85vh]">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">SignIn</p>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label htmlFor="username" className="text-zinc-400">
                Username<span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter The Username"
                required
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="username"
                autoComplete="username"
                value={Values.username}
                onChange={change}
              />
            </div>
          </div>

          <div className="mt-4">
            <div>
              <label htmlFor="password" className="text-zinc-400">
                Password<span className="text-red-700">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter The Password"
                required
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="password"
                autoComplete="password"
                value={Values.password}
                onChange={change}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 rounded px-4 py-2 hover:bg-gray-400 hover:text-zinc-800 w-full"
            >
              SignIn
            </button>
          </div>
        </form>

        <p className="flex items-center justify-center mt-4 text-zinc-200 font-semibold">
          {" "}
          Or
        </p>
        <div className="flex items-center justify-center mt-4 text-zinc-200 font-semibold">
          <p className=" text-zinc-400 font-semibold">Don't have an account?</p>
          <Link to="/signup">
            <u className="hover:text-blue-600 ml-2">SignUp</u>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
