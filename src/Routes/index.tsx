import {Route,Routes as RoutesReact} from 'react-router-dom';
import {Register} from './../Pages/Register';
import { Login } from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import { useEffect } from 'react';
import { useUser } from '../Providers/User';

const Routes = ()=>{
 const {setAuth,auth}= useUser()
  useEffect(()=>{
    
    if(localStorage.getItem('@burguer-kenzie:token')){
      setAuth(true);
    }else{
      setAuth(false);
    }
  },[auth])
  return(
    <RoutesReact>
      <Route  path="/" element={<Login/>}/>
      <Route  path="register" element={<Register />}/>
      <Route  path="dashboard" element={<Dashboard />}/>
    </RoutesReact>
  ) 
};
export default Routes;