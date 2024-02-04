import axios from "axios";
import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/styles.css";

function Register() {//context
  const fname = useRef();
  const femail = useRef();
  const fmobile = useRef();
  const fpassword = useRef();
  //navigate
  const navigate = useNavigate();
  //submitHandler()
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data = {
        name: fname.current.value,
        email: femail.current.value,
        mobile: fmobile.current.value,
        password: fpassword.current.value,
      };

      console.log(data);
      await axios.post(`/api/auth/register`, data).then((res) => {
        toast.success(res.data.msg);
        navigate("/login");
      });
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h3 className="display-3 text-primary">Register</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
                <div className="form-group mt-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    autoComplete="c"
                    name="name"
                    id="name"
                    ref={fname}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    ref={femail}
                    autoComplete="d"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="mobile">mobile</label>
                  <input
                    type="number"
                    ref={fmobile}
                    name="mobile"
                    id="mobile"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="pass">password</label>
                  <input
                    type="password"
                    name="pass"
                    ref={fpassword}
                    id="pass"
                    className="form-control"
                    autoComplete="no"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Register"
                  />
                </div>
              </form>
              <div className="card-footer mt-4">
                <div className="text-center text-danger">
                  <strong>Are you old user</strong>{" "}
                  <NavLink to={"/login"} className="btn btn-link">
                    Login Here
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
