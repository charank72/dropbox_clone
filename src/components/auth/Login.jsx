import axios from "axios";
import "../default/Home";
import React, { useContext, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../ontext.js/AuthContext";
import "./css/styles.css";
function Login() {
  const context = useContext(AuthContext);
  const setIsLogin = context.setIsLogin;
  const setToken = context.setToken;

  const [view, setView] = useState("email");
  const femail = useRef();
  const fmobile = useRef();
  const fpassword = useRef();

  //navigate instance
  const navigate = useNavigate();
  const viewHandler = (val) => {
    setView(val);
  };

  const authenticateUser = async (user,e) => {
    await axios
      .post("/api/auth/login", user)
      .then((res) => {
        toast.success(res.data.msg);
        setIsLogin(res.data.success);
        setToken(res.data.token);

        localStorage.setItem("CC-TOKEN", res.data.authToken);
        localStorage.setItem("CC-STATUS", res.data.success);

        window.location.href = "/";
        navigate("/");
      })
      .catch((err) => toast.error(err.response.data.msg));
  };
  //submit handler

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (view === "email") {
        let data = {
          email: femail.current.value,
          password: fpassword.current.value,
        };
        console.log(data);
        authenticateUser(data);
        // navigate('/')
      } else {
        let data = {
          mobile: fmobile.current.value,
          password: fpassword.current.value,
        };
        console.log(data);
        authenticateUser(data);
        // navigate('/')
        // window.location.href='/'
      }

      // {setIsLogin?<NavLink to={'/'}/>:<NavLink to={'/login'}/>}
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mt-3">
          <h3 className="display-3 text-secondary">Login</h3>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <div className="btn-group d-flex justify-content-center">
                <button
                  className="btn btn-info"
                  onClick={() => viewHandler("email")}
                >
                  Email
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => viewHandler("mobile")}
                >
                  Mobile
                </button>
              </div>
            </div>
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
                {view === "email" ? (
                  <div className="form-group mt-2">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      ref={femail}
                      className="form-control"
                      required
                    />
                  </div>
                ) : (
                  <div className="form-group mt-2">
                    <label htmlFor="">Mobile</label>
                    <input
                      type="number"
                      name="mobile"
                      id="mobile"
                      ref={fmobile}
                      className="form-control"
                      required
                    />
                  </div>
                )}
                <div className="form-group mt-2">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={fpassword}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="submit"
                    value="Login"
                    className="form-control btn btn-outline-info mt"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <div className="text-start text-info">
                <NavLink className={'btn btn text-success'} to={'/generate/password'}>forgot password</NavLink>
              </div>
              
              <div className="text-end  text-danger">
                {/* <strong>Are you a new user</strong> */}
                <NavLink to={`/register`} className="btn btn-link">
                  Register Here
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
/* 

     <div className='login'>
      <div>
        <h1 style={{textAlign:'center'}}>Login here</h1>
      </div>
      <form >
        <div className="form">
          <div className="form-group">
            <label htmlFor="mb">Enter your mobile/email</label>
            <input type="text"name='mb' autoFocus id='mb' required/>
          </div>
          <div className="form-group">
            <label htmlFor="pass">Enter your password</label>
            <input type="password"name='pass' id='pass' required/>
          </div>
        </div>
        <div>
          <button type='subimt'>Login</button>
        </div>
      </form>
    </div>*/
