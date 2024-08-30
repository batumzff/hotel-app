import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
  const { user } = useSelector(state => state.auth)
  // const user = true
user &&  console.log("private", user);
  return user ? <Outlet/> : <NavLink to="/login"/>
}

export default PrivateRouter