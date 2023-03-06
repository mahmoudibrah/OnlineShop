import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../Features/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };


useEffect(() => {
  if(auth._id) {
    navigate('/cart')
  }
}, [auth._id])



  return (
    <>
      <div className="container my-4">
        <form onSubmit={handlerSubmit} style={{maxWidth: "350px" , width: "100%" , margin : "auto"}}>
          <h2 >Login Form</h2>
          <div className="group my-2 ">
            <label htmlFor="email" className="mb-1">
              email :
            </label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              name="email"
              id="email"
              className="bg-transparent  form-control"
            />
          </div>
          <div className="group my-2 ">
            <label htmlFor="password" className="mb-1">
              password :
            </label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              name="password"
              id="password"
              className="bg-transparent  form-control"
            />
          </div>
          <div className="group mt-3  d-flex justify-content-end">
            <button type="submit" className="btn btn-info w-100">
              {auth.loginStatus === "pending" ? "Submitting" : "Login"}
            </button>
          </div>
          {auth.loginStatus === "rejected" ? (
            <p className="mt-3 text-danger">{auth.loginError}</p>
          ) : null}
        </form>
      </div>
    </>
  );
};
