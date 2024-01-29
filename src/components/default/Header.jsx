import axios from "axios";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../ontext.js/AuthContext";

function Header() {
  /*   const context = useContext(AuthContext);
  const isLogin = context.isLogin;
  const isAdmin = context.isAdmin;
  const isUser = context.isUser;
  const currentUser=context.currentUser
  const setIsLogin = context.setIsLogin;
  const setCurrentUser = context.setCurrentUser;
  const setIsUser = context.setIsUser;
  const setIsAdmin = context.setIsAdmin;
  const setToken = context.setToken; */
  const {
    isLogin,
    isAdmin,
    isUser,
    currentUser,
    setIsAdmin,
    setCurrentUser,
    setIsUser,
    setIsLogin,
    setToken,
  } = useContext(AuthContext);
  //logout
  // console.log(isLogin)
  const logoutHandler = async () => {
    if (window.confirm("Are you sure to logout")) {
      await axios
        .get("/api/auth/logout")
        .then((res) => {
          toast.success(res.data.msg);
          localStorage.clear();

          setToken(false);
          setIsLogin(false);
          setIsUser(false);
          setIsAdmin(false);
          setCurrentUser(false);
        })
        .catch((err) => toast.error(err.response.data.msg));
    } else {
      return;
    }
  };

  return (
    <header>
      <nav
        className={
          isLogin
            ? "navbar navbar-expand-md navbar-dark bg-success"
            : "navbar navbar-expand-md navbar-dark bg-secondary"
        }
      >
        <div className="container">
          <NavLink to={"/"} className="navbar-brand">
            MERN PROJECT
          </NavLink>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {isLogin ? (
            <div className="collapse navbar-collapse" id="menu">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to={"/"} className="nav-link">
                    Home
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  {currentUser ? (
                    <NavLink
                      to="/"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <strong className="text-uppercase">
                        {currentUser ? currentUser.name : "Guest"}
                      </strong>
                      <i className="bi bi-person"></i>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={"/"}
                      className="nav-link"
                      onClick={logoutHandler}
                    >
                      Logout
                    </NavLink>
                  )}
                  {isUser ? (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={"/user/dashboard"}
                          className="dropdown-item"
                        >
                          User Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/"}
                          onClick={logoutHandler}
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  ) : null}
                  {isAdmin ? (
                    <ul className="dropdown-menu">
                      <li className="">
                        <NavLink
                          to={"/admin/dashboard"}
                          className="dropdown-item"
                        >
                          Admin Dashboard
                        </NavLink>
                      </li>
                      <li className="">
                        <NavLink
                          to={"/"}
                          className="dropdown-item"
                          onClick={logoutHandler}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  ) : null}
                </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse " id="menu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/register"} className="nav-link">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
