import { Button, Container, Flex, Heading, Link, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Input } from './../../Components/Input';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../Services/api';
import  {toast} from 'react-hot-toast'
import {Description} from './../../Components/Description';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import {ContainerMotion} from "./../../Pages/Login";
import { useUser } from '../../Providers/User';

interface InfoRegister{
  name:string;
  email:string;
  password:string;
  confpassword:string;
}

export const Register= () => {
  
  const navigate:NavigateFunction = useNavigate();
  const {auth}= useUser()
  const schema = yup.object().shape({
    name:yup.string().required("Nome obrigatório!"),
    email:yup.string().required("E-mail obrigatório!").email("E-mail inválido!"),
    password:yup.string().required("Senha obrigatória!"),
    confpassword:yup.string().oneOf([yup.ref("password"),null ],'Senhas diferentes!').required("Confirmar senha obrigatório!")
  });
  const { register, handleSubmit, formState: { errors } } = useForm<InfoRegister>({
    resolver:yupResolver(schema)
   });
   const requestFunction= async(data: InfoRegister | any)=>{
    delete data.confpassword;
    const response = await api.post('/users',data);
    navigate('/')
  
   };
   const handleRegister = async (data:InfoRegister)=>{
    toast.promise(requestFunction(data), {
      loading: "Carregando...",
      error: "Os dados fornecidos já existem!",
      success: "Conta criada!"
    });
  };
  if(auth){
    return <Navigate to="/dashboard"/>
  };
  return (<Container h="100vh" maxW="1200px" flexWrap="wrap" display='flex'flexDir="row" align="center" justifyContent="center">
    <Description/>
    <ContainerMotion animate={{x:[200,0]}} m="0"maxW="420px"borderRadius="8px" display="flex" flexDirection="column" justifyContent="center" alignSelf="center"alignItems="center"p="10px" border="2px" borderColor="gray.0">
   
      <Flex flexDirection="row" justifyContent="center" my="12px">
        <Heading fontSize="lg" mr="20" color="gray.600">Cadastro</Heading>
        <Link onClick={()=>navigate("/")}fontSize="xs" textAlign="right" textDecoration="underline" color="gray.300" fontWeight="bold">Retornar para o Login</Link>
      </Flex>
      
        <Flex p="2" as="form" onSubmit={handleSubmit(handleRegister)}w="100%" justifyContent="center" >
        <VStack  spacing="5" >
          <Input error={errors.name}{...register("name")} bg="gray.0" height="48px"name="name" placeholder="Nome" fontWeight="semi-bold" fontSize="md" _placeholder={{ color: "gray.200" }}/>
          <Input error={errors.email}{...register("email")} bg="gray.0" height="48px"name="email" placeholder="E-mail" fontWeight="semi-bold" fontSize="md" _placeholder={{ color: "gray.200" }} />
          <Input error={errors.password} type="password"{...register("password")} bg="gray.0" height="48px" name="password" placeholder="Senha" fontWeight="semi-bold" fontSize="md" _placeholder={{ color: "gray.200" }} />
          <Input error={errors.confpassword} type="password"{...register("confpassword")} bg="gray.0" height="48px" name="confpassword" placeholder="Confirmar Senha" fontWeight="semi-bold" fontSize="md" _placeholder={{ color: "gray.200" }} />
          <Button type="submit"_hover={{color:"gray.100",bg:"gray.300"}} _focus={{borderColor:'none'}}w="100%" height="48px" color="gray.300">Cadastrar</Button>
        </VStack>
      </Flex>

    </ContainerMotion>
  </Container>
  )
};