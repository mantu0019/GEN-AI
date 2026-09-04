 import { useAuth } from '../features/auth/hook/useAuth'
import Loading from './Loading'
import { Navigate, Outlet, Route } from 'react-router'

const ProtectedRoutes = () => {
   const {authData,isLoading}  =useAuth()
   

 if(isLoading){
    return <Loading/>
 }


    return  authData ? <Outlet/> : <Navigate to={"/"}/>
}

export default ProtectedRoutes

 