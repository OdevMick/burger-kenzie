import { Button, Container, Flex, Heading, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './../../Components/Input';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useEffect} from 'react'
import {Description} from './../../Components/Description';
import {InfoLogin, useUser} from './../../Providers/User/index';
import { motion } from 'framer-motion'
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';

export const ContainerMotion = motion(Container);


export const Login= ()=> {

  const {handleLoginApi,auth} = useUser();
  const navigate:NavigateFunction = useNavigate()
  const [isLoading,setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email:yup.string().required("E-mail obrigatório!").email("E-mail inválido!"),
    password:yup.string().required("Senha obrigatória!"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm<InfoLogin>({
    resolver:yupResolver(schema)
   });
  
   const handleRegister = (data:InfoLogin)=>{
    handleLoginApi(data,navigate)
    setIsLoading(true)
  
  };

  if(auth){
    return <Navigate to="/dashboard"/>
  };
  return (
  <>
  
  <Container overflow="hidden" h="100vh" maxW="1600px" flexWrap="wrap" display='flex'flexDir="row-reverse" align="center" justifyContent="center">
    <Description isLogin/>
    <ContainerMotion  animate={{x:[-200,0]}} m="0"maxW="420px"borderRadius="8px" display="flex" flexDirection="column" justifyContent="center" alignSelf="center"alignItems="center"p="10px" border="2px" borderColor="gray.0">
    
      <Flex   flexDirection="row" m="0" my="12px">
        <Heading fontSize="lg" w="100%"textAlign="center" color="gray.600">Login</Heading>
      </Flex>
        <Flex p="2" as="form" onSubmit={handleSubmit(handleRegister)}justifyContent="center" >
        <VStack  spacing="5" >
          <Input error={errors.email}{...register("email")} bg="gray.0" height="48px"name="email" placeholder="E-mail" fontWeight="semi-bold" fontSize="md" _placeholder={{ color: "gray.200" }} />
          <Input error={errors.password} type="password"{...register("password")} bg="gray.0" height="48px" name="password" placeholder="Senha" fontWeight="semi-bold" fontSize="md" _placeholder={{ color: "gray.200" }} />
          <Button isLoading={isLoading}type="submit"_hover={{color:"gray.100",bg:"gray.300"}} _focus={{borderColor:'none'}}w="100%" height="48px" color="white" bg="green.700">Entrar</Button>
        </VStack>
      </Flex>
      <Flex p="2" flexDir="column" w="100%"  justifyContent="center" align="center" >
        <VStack spacing="5" >
          <Text fontSize="sm" color="gray.200"maxW="286px">Crie sua conta para saborear muitas delícias e matar sua fome!</Text>
          <Button maxW="286px" onClick={()=>navigate('/register')}_hover={{color:"gray.100",bg:"gray.300"}} _focus={{borderColor:'none'}} w="100%" height="48px" color="gray.300">Cadastrar</Button>
        </VStack>
      </Flex>
    </ContainerMotion>
  </Container>
  </>
  )
};