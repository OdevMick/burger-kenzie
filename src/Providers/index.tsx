import {UserProvider} from './User/index';
import {ProductsProvider} from './Products/index';
import {ReactNode} from 'react'
interface ProvidersProps{
  children:ReactNode;
}
export const Providers = ({children}:ProvidersProps)=>{
  return (

    <UserProvider>
    <ProductsProvider>
      {children}
    </ProductsProvider>
    </UserProvider>
  )
};