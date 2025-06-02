import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userApplications, setUserApplications] = useState([]);

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) setJobs(data.jobs);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch logged-in company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });
      if (data.success) setCompanyData(data.company);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Fetch logged-in user data
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        logout(); // Token expired or invalid
      } else {
        toast.error(error.message);
      }
    }
  };

  // Fetch user's applications
  const fetchUserApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setUserData(res.data.user);
        setShowLoginModal(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
      console.error(error?.response?.data?.message);
    }
  };

  //  Register user
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setUserData(res.data.user);
        setShowLoginModal(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
      console.error(error?.response?.data?.message);
    }
  };

  //  Logout user
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [token]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,

    jobs,
    setJobs,

    showLoginModal,
    setShowLoginModal,

    showRecruiterLogin,
    setShowRecruiterLogin,

    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,

    backendUrl,

    userData,
    setUserData,
    userApplications,
    setUserApplications,

    fetchUserData,
    fetchUserApplications,

    token,
    login,
    register,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
