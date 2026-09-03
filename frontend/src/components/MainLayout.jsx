 import React from 'react'
import { Outlet } from 'react-router'
 
 const MainLayout = () => {
   return (
     <div>
    <h1>this is for nav bar</h1>
    <Outlet/>


     </div>
   )
 }
 
 export default MainLayout