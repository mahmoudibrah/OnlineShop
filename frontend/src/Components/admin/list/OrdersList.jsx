import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productDelete } from "./../../../Features/productSlice";
import EditProduct from "../EditProduct";
import { ordersEdit, ordersFetch } from "./../../../Features/ordersSlice";
import moment from "moment";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(ordersFetch());
  }, [dispatch]);

  // console.log(list);
  const rows =
    list &&
    list.map((order, index) => {
      return {
        id: order._id,
        cName: order.shipping.name,
        amount: (order.total / 100)?.toLocaleString(),
        dStatus: order.delivery_status,
        data: moment(order.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "cName",
      headerName: "Name",
      width: 120,
    },
    { field: "amount", headerName: "Amount", width: 100 },
    {
      field: "dStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dStatus === "pending" ? (
              <Pending>pending</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched>Dispatched</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>Delivered</Delivered>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    {
      field: "data",
      headerName: "Data",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Actios>
            <DispatchBtn onClick={() => handlerOrderDispatch(params.row.id)}>
              Dispatch
            </DispatchBtn>
            <DeliveryBtn onClick={() => handlerOrderDeliver(params.row.id)}>Deliver</DeliveryBtn>
            <View onClick={() => navigate(`/order/${params.row.id}`)}>View</View>
          </Actios>
        );
      },
    },
  ];

  const handlerOrderDispatch = (id) => {
    dispatch(ordersEdit({ id, delivery_status: "dispatched" }));
  };
  const handlerOrderDeliver = (id) => {
    dispatch(ordersEdit({ id, delivery_status: "delivered" }));
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
};

export default OrdersList;

const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 249);
`;
const DeliveryBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;
const View = styled.button`
  background-color: rgb(114, 255, 40);
`;
const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14x;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14x;
`;
const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14x;
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
