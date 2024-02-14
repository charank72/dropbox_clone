import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./Auth/PrivateRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import GeneratePassword from "./components/auth/GeneratePassword";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import Footer from "./components/default/Footer";
import Header from "./components/default/Header";
import Home from "./components/default/Home";
import Pnf from "./components/default/Pnf";
import { AuthContext } from "./components/ontext.js/AuthContext";
import View from "./components/screens/View";
import FileUpload from "./components/user/FileUpload";
import UserDashboard from "./components/user/UserDashboard";

function App() {
  const context = useContext(AuthContext);
  const isLogin = context.isLogin;
  // const isRegister=context.isRegister
  return (
    <div>
      {/* <BrowserRouter>
        <Header />
        <ToastContainer autoClose={4000} position={"top-right"} />
        <Routes> */}
      {/* <Route element={<PrivateRoute/>}> */}
      {/* <Route path="/" element={<Home />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/view/type/:ext/file/:title" element={<View/>}/> */}
      {/* </Route> */}
      {/* <Route path="/register" element={isRegister?<Navigate to={'/login'}/>:<Register/>} />
          <Route path="/login" element={isLogin ?<Navigate to={'/'} />:<Login/>} />
          <Route path="/*" element={<Pnf />} />
        </Routes>
        <Footer />
      </BrowserRouter>  */}

      <BrowserRouter>
        <Header/>
        {/* <ToastContainer autoClose={4000} position={"top-right"} /> */}
        <ToastContainer  autoClose={4000}  position={'top-left'}  />
        <Routes>
          <Route  exact element={<PrivateRoute />}>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard></AdminDashboard>}
            ></Route>
            <Route
              path="/user/dashboard"
              element={<UserDashboard></UserDashboard>}
            ></Route>
            <Route exact path="/view/file/:id" element={<View />} />
            <Route path="/upload/new" element={<FileUpload />} />
          </Route>
          <Route
            path="/generate/password"
            element={isLogin ? <Navigate to={"/"} /> : <GeneratePassword />}
          />
          <Route path="/password/reset" element={isLogin?<Navigate to={'/'}/>:<ResetPassword/>}/>
          <Route
            path="/login"
            element={isLogin ? <Navigate to={`/`} /> : <Login></Login>}
          ></Route>
          <Route
            path="/register"
            element={isLogin ? <Navigate to={`/`} /> : <Register></Register>}
          ></Route>
          <Route path="/*" element={<Pnf></Pnf>}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
