import { Box, Container, Heading, Spinner, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {  useProducts } from '../../Providers/Products';
import {ModalCart} from './../../Components/ModalCart';
import { useUser } from '../../Providers/User';
import Product from './../../Components/Product';

const Dashboard=()=>{
  const {auth,setUser,setTokenAuth}= useUser();
  const [isLessThan768] = useMediaQuery('(max-width: 768px)')
  const { productsFromApi,productsList,filteredList,isLoading,isInvalidUser,setIsInvalidUser} = useProducts();
  const [cartIsOpen,setCartIsOpen] = useState(false);
 
  
  useEffect(()=>{
    
   if(localStorage.getItem('@natu-neightbors:token')&&localStorage.getItem('@natu-neightbors:userId')){
     const token = JSON.parse(localStorage.getItem('@natu-neightbors:token')||'')
    const userId =localStorage.getItem('@natu-neightbors:userId') ||'0'
     setTokenAuth(token)
     setUser(parseInt(userId))
     setIsInvalidUser(false)
    }
    productsFromApi()
    
  },[filteredList]);

 

  if(!auth){
    
    return <Navigate to="/"/>
  }
  return (<>
  <Container maxW="100vw" bg="gray.0" h="80px" >
     <Header setCartIsOpen={setCartIsOpen} />
    </Container>
  <Box position="relative" pt="20px"justifyContent={isLessThan768?"none":"center"} w={isLessThan768?"100%":"80%"} m="0 auto"overflow={isLessThan768?'auto':'none'} display="flex" flexWrap={isLessThan768?'nowrap':'wrap'} >
    {!filteredList.length?(React.Children.toArray(productsList.map((item)=><Product  item={item} />))):
    (React.Children.toArray(filteredList.map((item)=><Product  item={item} />)))}

  {cartIsOpen&&<ModalCart setCartIsOpen={setCartIsOpen}/>}
  </Box>
  {!isLoading&&<Box display="flex" flexDir="column"alignItems="center">
      <Heading textAlign="center"fontSize="60px"><Spinner size="xl"/></Heading>
     
    </Box>}
    {isInvalidUser&&<Box display="flex" flexDir="column"alignItems="center">
     <Heading display="flex">ERRO <Text ml="10px" color="red.700"> 404</Text></Heading>
     <Text fontSize="20px">Usúario não encontrado!</Text>
    </Box>}
  </>
  )
};
export default Dashboard;