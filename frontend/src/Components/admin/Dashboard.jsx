import React from 'react'
import {  Outlet  , NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {FaUsers ,FaStore , FaClipboard , FaTachometerAlt} from 'react-icons/fa'

const Dashboard = () => {
  
  // const auth =  useSelector(state => state.auth)
  // console.log(auth.isAdmin) 
  // if(auth.isActive) return <p>Access denied.</p>
  return (
    <>
    <div className="dashboaed  d-flex">
    <nav className='border-end border-4 postion-fixed w-25 d-flex flex-column p-3'>
      <h2 className="mb-3 p-0">Quick Links</h2>
      <NavLink className={({ isActive }) => isActive ?  "link-active" :  "link-inactive"} to={'summary'}>
      <FaTachometerAlt/>
        Summary
   
        </NavLink>
      <NavLink className={({ isActive }) => isActive ?  "link-active" :  "link-inactive"} to={'products'}>
      <FaStore/> Products
        </NavLink>
      <NavLink className={({ isActive }) => isActive ?  "link-active" :  "link-inactive"} to={'orders'}>
      <FaClipboard/> Orders
        </NavLink>
      <NavLink className={({ isActive }) => isActive ?  "link-active" :  "link-inactive"} to={'users'}>
      <FaUsers/> Users
        </NavLink>
    </nav>
    <div className="content ms-3 p-3 w-100">
    <Outlet/>
    </div>  
    </div>
    </>
  )
}

export default Dashboard

  


