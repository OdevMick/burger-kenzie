import React from "react";
import { Box, Container, Flex, Heading, Image, Text, useMediaQuery }from '@chakra-ui/react'
import {FiShoppingBag} from 'react-icons/fi';
import { Icon } from '@chakra-ui/react';
import circles from "../../Assets/circles.png";
import { motion } from "framer-motion";
const ContainerMotion = motion(Container);
interface DescriptionProps{
  isLogin?:boolean;
}
export const Description:React.FC<DescriptionProps> = ({isLogin}:DescriptionProps):JSX.Element=>{
  const [isLargerThan1052] = useMediaQuery('(min-width: 1052px)')
  return (<ContainerMotion  animate={isLogin?{x:[200,0]}:{x:[-200,0]}} m="0"display="flex" flexDir="column" h={isLargerThan1052?"300px":"160px"} p="0"w="100%" alignItems="center" alignSelf="center" >
    <Flex  w="100%" maxW="420px"flexDir="column" h="160px" >
      <Heading mt="10px"color="gray.600" alignSelf="start">Burguer <Text as="span" color="red.700"fontSize="lg">Kenzie</Text></Heading>
      <Flex bg="white" h="90px" my="5px" borderRadius="8px"align="center" justifyContent="space-around" p="10px" border="2px" borderColor="gray.0">
        <Box borderRadius="8px" display="flex" flexDir="column" h="60px" w="60px" bg="rgba(39, 174, 96, 0.1)" justifyContent="center"align="center">
          <Icon w="32px" color="green.700" alignSelf="center"as={FiShoppingBag}/>
        </Box>
        <Text ml="2" width='260px' fontSize="sm" textAlign="left" color="gray.300">A vida é como um sanduíche, é preciso recheá-la com os <Text fontWeight="600"color="gray.600"as="span">melhores</Text> ingredientes.</Text>
      </Flex>
    </Flex>
    {isLargerThan1052&&<Image ml="24" alignSelf="flex-start"src={circles}/>}
  </ContainerMotion>
  )
};