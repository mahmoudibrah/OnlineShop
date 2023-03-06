import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "./../../Features/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
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
          <h2 >Registartion Form</h2>
          <div className="group mt-3">
            <label htmlFor="first_name" className="mb-1">
              Name :
            </label>
            <input
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              type="text"
              name="first_name"
              id="first_name"
              className="bg-transparent  form-control"
            />
          </div>
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
              {auth.registerStatus === "pending" ? "Submitting" : "Resgister"}
            </button>
          </div>
          {auth.registerStatus === "rejected" ? (
            <p className="mt-3 text-danger">{auth.registerError}</p>
          ) : null}
        </form>
      </div>
    </>
  );
};
