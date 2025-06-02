import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    showLoginModal,
    setShowLoginModal,
    setShowRecruiterLogin,
    userData,
    setUserData,
    logout,
    login,
    register,
  } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", formData);
      login(formData.email, formData.password);
    } else {
      console.log("Signing up with:", formData);
      register(formData.name, formData.email, formData.password);
    }
  };
  const toggleForm = () => setIsLogin((prev) => !prev);
  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt="image"
        />
        {userData ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi, {userData.name}</p>
            <button onClick={logout} className="text-red-500 underline text-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600 cursor-pointer"
            >
              RecruiterLogin
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 text-lg"
              onClick={() => setShowLoginModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="mt-4 text-sm text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleForm}
                className="text-blue-600 underline cursor-pointer"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
