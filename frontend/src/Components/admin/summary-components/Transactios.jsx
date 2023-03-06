import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { setHeadersAdmin, url } from "../../../Features/api";
import moment from 'moment';

const Transactios = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(orders);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${url}/orders/?new=true`,
          setHeadersAdmin()
        );
        setOrders(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <StyeledTransactios>
        {isLoading ? (
          <p>Transactios Loading ..... </p>
        ) : (
          <>
          <h3>Latest Transactios</h3>
          {orders?.map((order , index)=> <Transactio key={index}>
            <p>{order.shipping.name}</p>
            <p>{(order.total / 100).toLocaleString()}</p>
            <p>{moment(order.createdAt).fromNow()}</p>
          </Transactio>)}
          </>
          
        )}
      </StyeledTransactios>
    </>
  );
};

export default Transactios;

const StyeledTransactios = styled.div`
  background-color: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;

const Transactio = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background-color: rgba(38, 198, 249, 0.12);
  p{
    flex: 1;
  }
  &:nth-child(even) {
    background-color: rgba(102, 108, 255, 0.12);
  }
`;
