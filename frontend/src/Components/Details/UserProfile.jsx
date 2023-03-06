import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setHeadersAdmin, url } from "../../Features/api";
import { useState } from "react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [loading, setloading] = useState(false);
  const [updatind, setupdatind] = useState(false);

  const params = useParams();
  const [user, setUser] = useState({
    name: "",
    eamil: "",
    isAdmin: false,
    password: "",
  });
  useEffect(() => {
    setloading(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${url}/users/find/${params.id}`,
          setHeadersAdmin()
        );
        setUser({
          ...res.data,
          password: "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    setloading(false);
  }, [params.id]);

  console.log(user);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setupdatind(true);
    try {
      const res = await axios.put(
        `${url}/users/${params.id}`,
        {
          ...user,
        },
        setHeadersAdmin()
      );
      setUser({ ...res.data, password: "" });
      toast.success("Profile Updated...");
    } catch (error) {
      console.log(error);
    }
    setupdatind(false);
  };

  return (
    <StyleProfile>
      {loading ? (
        <p>Loadind ..........</p>
      ) : (
        <ProfileContainer>
          <form onSubmit={handlerSubmit}>
            <h3>User Profile</h3>
            {user.isAdmin ? (
              <isAdmin>Admin</isAdmin>
            ) : (
              <Coustomer>Coustomer</Coustomer>
            )}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor="email"> Eamil : </label>
            <input
              type="email"
              id="email"
              value={user.eamil}
              onChange={(e) => setUser({ ...user, eamil: e.target.value })}
            />
            <label htmlFor="password"> password : </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button>{updatind ? "Updating" : "Update Profile"}</button>
          </form>
        </ProfileContainer>
      )}
    </StyleProfile>
  );
};

export default UserProfile;

const StyleProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 5px;
  padding: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  label {
    margin-bottom: 0.2rem;
    color: gray;
  }
  input {
    margin-bottom: 1rem;
    outline: none;
    border: none;
    border: none;
    border-bottom: 1px solid gray;
  }
`;

const isAdmin = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;

const Coustomer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
