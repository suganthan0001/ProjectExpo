import React, { useState } from "react";
import Theme from "../Theme";
import { TfiReload } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import {toast} from 'react-hot-toast'

function Navbar() {
  const navigate = useNavigate();

  const myPromise = () => new Promise((resolve) => {
    setTimeout(() => {
      navigate("/login");
      resolve();
    }, 1000);
  });

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              toast.promise(myPromise(), {
                loading: 'Loading...',
                success: 'Logged Out Successfully',
                error: 'Error when logging out',
              });
              
            }}
          >
            <CiLogout className="text-lg lg:text-2xl" />
          </button>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>To solve Queries</a>
              </li>
              <li
                onClick={() => {
                  navigate("/query");
                }}
              >
                <a>New Querie</a>
              </li>
              <li>
                <a>About us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-end gap-4">
          <button className="btn btn-ghost btn-circle">
            <TfiReload className="text-lg lg:text-2xl" />
          </button>
          <Theme styles={"text-sm"} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
