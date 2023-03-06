import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productDelete } from "./../../../Features/productSlice";
import EditProduct from "../EditProduct";
import { userDelete, usersFetch } from "./../../../Features/usersSlice";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  const rows =
    list &&
    list.map((item, index) => {
      return {
        id: item._id,
        uName: item.name,
        uEmail: item.email,
        isAdmin: item.isAdmin,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "uName",
      headerName: "Name",
      width: 150,
    },
    { field: "uEmail", headerName: " Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actios>
            <Delete onClick={()=>handlerDelete(params.row.id)}>Delete</Delete>
            <View onClick={()=> navigate(`/user/${params.row.id}`)}>View</View>
          </Actios>
        );
      },
    },
  ];
  const handlerDelete = (id) => {
    dispatch(userDelete(id));
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actios = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(144, 255, 40);
`;

const Admin = styled.div`
    color :  rgb(253, 181, 40);
  background-color: rgb(253, 181, 40 , 0.12);
  padding: 3px 5px;
border-radius: 3px;
font-size: 14px;
`

const Customer = styled.div`
color :  rgb(38, 188, 249);
background-color: rgb(38, 188, 249, 0.12);
padding: 3px 5px;
border-radius: 3px;
font-size: 14px;
`
