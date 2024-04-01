import React, { useState } from "react";
import loginLight from "../../assets/login-light.png";
import { useLogin } from "../../hooks/login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import useStore from "../zustand/store";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Theme from "../Theme";
function Login() {
  // const { theme, setTheme } = useStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, loginUser } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 1 || password.length < 1) {
      toast.error("Please enter username and password...");
      return;
    }
    let loggedIn = await loginUser(username, password);
    if (loggedIn) {
      navigate("/home");
    } else {
      return;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen gap-5 pr-20">
        <Theme />
        <div className="">
          <img
            src={loginLight}
            alt="login image for light mode"
            className="h-700"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <h1
              className="logoName neonText pb-20"
              style={{ fontSize: "50px" }}
            >
              POWER PULSE
            </h1>

            <h1 className="text-3xl pb-8">WELCOME !</h1>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>

            <button className="btn btn-outline btn-accent" type="submit">
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "LOGIN"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-5 right-5">
        <div className="tooltip tooltip-left" data-tip="For Queries...">
          <button className="btn btn-circle nt text-pink-400 border-dashed border-2 border-neutral-400" onClick={() => {navigate("/query")}}>
            <HiQuestionMarkCircle className="queryIcon nt" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
