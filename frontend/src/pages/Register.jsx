import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  function onChange(e) {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function register() {
    // additional validate the inputs

    try {
      const response = await fetch("http://localhost:1099/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstname,
          lastName: data.lastname,
          password: data.password,
          userName: data.username,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        navigate("/login");
        console.log(responseData);
      } else {
        const errorData = await response.json();
        setError(true);
        console.log(errorData);
        //handle error and show it to the user
      }
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div className="padding-x">
      <div className="max-container">
        <div className="flex flex-col items-center h-screen justify-center">
          <h1 className="text-center font-bold text-3xl">Register</h1>
          <form className="flex flex-col gap-y-5 max-w-[600px] w-full mt-5">
            <div className="floating-label-wrapper">
              <input
                name="firstname"
                type="text"
                value={data.firstname}
                placeholder=" "
                onChange={(e) => onChange(e)}
                className="border border-gray-300 rounded-md p-2 w-full outline-blue-200"
              />
              <label
                htmlFor="firstname"
                className="floating-label text-gray-500 "
              >
                First Name
              </label>
            </div>
            <div className="floating-label-wrapper">
              <input
                name="lastname"
                type="text"
                placeholder=" "
                value={data.lastname}
                onChange={(e) => onChange(e)}
                className="border border-gray-300 rounded-md p-2 w-full outline-blue-200"
              />
              <label
                htmlFor="lastname"
                className="floating-label text-gray-500 "
              >
                Last Name
              </label>
            </div>
            <div className="floating-label-wrapper">
              <input
                name="username"
                type="text"
                placeholder=" "
                value={data.username}
                onChange={(e) => onChange(e)}
                className="border border-gray-300 rounded-md p-2 w-full outline-blue-200"
              />
              <label
                htmlFor="firstname"
                className="floating-label text-gray-500 "
              >
                User Name
              </label>
            </div>
            <div className="floating-label-wrapper">
              <input
                name="password"
                type="password"
                placeholder=" "
                value={data.password}
                onChange={(e) => onChange(e)}
                className="border border-gray-300 rounded-md p-2 w-full outline-blue-200"
              />
              <label
                htmlFor="firstname"
                className="floating-label text-gray-500 "
              >
                Password
              </label>
            </div>
            <button
              type="button"
              onClick={register}
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:opacity-50 duration-500 ease-linear "
            >
              Submit
            </button>
          </form>
          <div className="flex gap-2 text-gray-700 mt-6">
            <p>Already have an account? </p>
            <NavLink
              to="/login"
              className="underline hover:opacity-5 duration-500 ease-linear "
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
