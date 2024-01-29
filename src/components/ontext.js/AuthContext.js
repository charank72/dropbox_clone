import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

function AuthProvider(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [token, setToken] = useState(false);

  const checkAuth = async () => {
    if (localStorage.getItem("CC-TOKEN") && localStorage.getItem("CC-STATUS")) {
      let aToken = localStorage.getItem("CC-TOKEN");
      let aStatus = localStorage.getItem("CC-STATUS");
      setToken(aToken);
      setIsLogin(aStatus);
      if (aStatus) {
        setIsLogin(true);
      }

      await axios
        .get(`/api/auth/current/user`, {
          headers: {
            Authorization: aToken,
          },
        })
        .then((res) => {
          setCurrentUser(res.data.user);
          if (res.data.user.role === "user") setIsUser(true);
          if (res.data.user.role === "admin") setIsAdmin(true);
        })
        .catch((err) => toast.error(err.response.data.message));
    } else {
      setToken(false);
      setIsLogin(false);
      setIsUser(false);
      setIsAdmin(false);
      setCurrentUser(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // unmount
    // return () => {
    //   checkAuth()
    // }
  }, [isAdmin, isUser]);

  return (
    <div>
      <AuthContext.Provider
        value={{
          isAdmin,
          isUser,
          isLogin,
          currentUser,
          token,
          setToken,
          setIsAdmin,
          setIsUser,
          setIsLogin,
          setCurrentUser,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  );
}

export default AuthProvider;
