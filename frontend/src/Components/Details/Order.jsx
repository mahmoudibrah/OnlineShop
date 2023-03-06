import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeadersAdmin, url } from "../../Features/api";

const Order = () => {
  const params = useParams();

  const [order, setOrder] = useState({});
  const [loadind, setLoadind] = useState(false);

  useEffect(() => {
    setLoadind(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/orders/findOne/${params.id}`,
          setHeadersAdmin()
        );
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoadind(false);
    }
    fetchData();
  }, []);

  console.log(order);

  return (
    <StyledOrder>
      {loadind ? (
        <p>Loading ........</p>
      ) : (
        <OrdersContainer>
          <h2>Order Details</h2>
          <p>
            Delivery status :{" "}
            {order.delivery_status === "pending" ? (
              <Pending>Pending</Pending>
            ) : order.delivery_status === "dispatched" ? (
              <Dispatched>Dispatched</Dispatched>
            ) : order.delivery_status === "delivered" ? (
              <Delivered>Delivered</Delivered>
            ) : (
              "errorr"
            )}
          </p>
          <h3>ordered Products</h3>
          <Items>
            {order.products?.map((product, index) => (
              <Item key={index}>
                <span>{product.description}</span>
                <span>{product.quantity}</span>
                <span>
                  {"$" + (product.amount_total / 100).toLocaleString()}
                </span>
              </Item>
            ))}
          </Items>
          <div>
            <h3>Total price</h3>
            <p> {"$" + (order.total / 100).toLocaleString()}</p>
          </div>
          <div>
            <h3>Shipping Details</h3>
            <p>Customer : {order.shipping?.name} </p>
            <p>City : {order.shipping?.address.city} </p>
            <p>Customer : {order.shipping?.email} </p>
          </div>
        </OrdersContainer>
      )}
    </StyledOrder>
  );
};

export default Order;

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3 {
    margin: 1.5rem 0 0.5rem;
  }
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.16) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.span`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 4px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 4px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background-color: rgb(102, 108, 255, 0.12);
  padding: 3px 4px;
  border-radius: 3px;
  font-size: 14px;
`;
