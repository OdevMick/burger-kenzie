
import {createContext,useContext,useState,ReactNode, useEffect} from 'react';
import toast from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';
import api from '../../Services/api';
import { useProducts } from '../Products';
import jwt_decode from 'jwt-decode';
interface DecodeSub{
  sub:string;
}
export interface UserDataLogin{
  email?:string;
  password?:string;
  id?:number;
}
interface UserProviderTools{
  tokenAuth:string;
  handleLoginApi:(data:InfoLogin,navigate:NavigateFunction)=>void;
  user:number;
  auth:boolean;
  setAuth:React.Dispatch<React.SetStateAction<boolean>>;
  setTokenAuth:React.Dispatch<React.SetStateAction<string>>;
  setUser:React.Dispatch<React.SetStateAction<number>>;

}
interface UserProviderProps{
  children:ReactNode;
   
}
export interface InfoLogin{

  email:string;
  password:string;
 
}

const UserContext = createContext<UserProviderTools>({} as UserProviderTools);
export const UserProvider = ({children}:UserProviderProps)=>{
  const [tokenAuth,setTokenAuth] = useState<string>('');
  const [auth,setAuth] = useState(false);
  const {productsFromApi} = useProducts();
  useEffect(()=>{
    if(localStorage.getItem('@burguer-kenzie:token')){
      const token:string = JSON.parse(localStorage.getItem('@burguer-kenzie:token')|| '') ;
      setTokenAuth(token)
    };
    
  },[]);

  const [user,setUser] = useState(0);
  const requestFunction = (data:InfoLogin,navigate:NavigateFunction)=>{
    
     api.post('/login',data).then(res=>{
      toast.success("Logado com sucesso!")
      localStorage.clear();
      const {accessToken} = res.data;
      const decode:DecodeSub = jwt_decode(accessToken);
      localStorage.setItem('@burguer-kenzie:userId',JSON.stringify(parseInt(decode.sub)))
      setTokenAuth(accessToken);
      localStorage.setItem('@burguer-kenzie:token',JSON.stringify(accessToken))
      setAuth(true);
      
      navigate('/dashboard');
    }).catch(err=>{
      toast.error('E-mail ou senha incorretos...')
    })
    
    productsFromApi();
    
  }
  const handleLoginApi = (data:InfoLogin,navigate:NavigateFunction)=>{
    requestFunction(data,navigate)
  }
return (
  <UserContext.Provider value={{tokenAuth,setUser,handleLoginApi,user,auth,setAuth,setTokenAuth}}>
    {children}
  </UserContext.Provider>
)
};
export const useUser = ()=>useContext(UserContext);


