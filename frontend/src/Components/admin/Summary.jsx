import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { FaUsers, FaChartBar, FaClipboard } from "react-icons";
import { Widget } from "./summary-components/Widget";
import { FaChartBar, FaClipboard, FaUsers } from "react-icons/fa";
import axios from "axios";
import { url } from "../../Features/api";
import { setHeadersAdmin } from "../../Features/api";
import { Chart } from "./summary-components/Chart";
import Transactios from "./summary-components/Transactios";
import AllTimeData from "./summary-components/AllTimeData";

const Summary = () => {

  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);

 

  function compare(a , b){
    if(a._id < b._id) {
      return 1 
    }
    if(a._id > b._id) {
      return -1
    }
    return 0;
  }


  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/users/stats`, setHeadersAdmin());

      res.data.sort(compare)
      setUsers(res.data)
      setUsersPerc(
        ( (res.data[0].total -  res.data[1].total) / res.data[1].total) * 100
        )
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/orders/stats`, setHeadersAdmin());
      res.data.sort(compare)
      setOrders(res.data)
      setOrdersPerc(
        ( (res.data[0].total -  res.data[1].total) / res.data[1].total) * 100
        )
    } catch (error) {
      console.log(error);
    }
  };


  const fetchIncome = async () => {
    try {
      const res = await axios.get(`${url}/orders/income/stats`, setHeadersAdmin());
      res.data.sort(compare)
      setIncome(res.data)
      setIncomePerc(
        ( (res.data[0].total -  res.data[1].total) / res.data[1].total) * 100
        )
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchIncome()
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total ,
      isMoney: false,
      title: "Users",
      color: "rgb(102,180,255)",
      bgColor: "rgba(102,180,255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaChartBar />,
      digits:  orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: income[0]?.total ?    income[0]?.total  / 100 : "",
      isMoney: false,
      title: "Earnings",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40, 0.12)",
      percentage: incomePerc,
    },
  ];
  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is perfomance compared to the previous mouth </p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <Chart/>
      </MainStats>
      <SideStats>
      <Transactios/>
      <AllTimeData
      />
      </SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;
const Title = styled.div`
  p {
    color: rgba(234, 234, 255, 0.68);
  }
`;
const Overview = styled.div`
  background-color: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  /* height: 170px; */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
