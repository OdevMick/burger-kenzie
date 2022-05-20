import {Icon} from '@chakra-ui/icons';
import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {FaMinus, FaPlus, FaTrash} from 'react-icons/fa'
import {  SaveCart, useProducts } from '../../Providers/Products';


interface ProductOnCartProps{
  product:SaveCart;

}
export const ProductOnCart=({product}:ProductOnCartProps)=>{
  const {title,category,image,id,price,quantity} = product;
  const productAdapter = {title,image,price,category}
  const {addToCart,removeFromCart,deleteFromCart,cart} =useProducts();
    
 
  const [count,setCount] = useState(quantity);
  const handleAddToCart = ()=>{
    
    addToCart(count,title,productAdapter,image);
  }
  const handleRemoveFromCart = ()=>{
    removeFromCart(id,productAdapter,image);
   
  }
  useEffect(()=>{
    const quantity = cart.filter(item=>item.title ===title)[0].quantity
    setCount(quantity)
  },[cart, title])

  return (
    <Flex m="20px"justifyContent="space-between" align="center">
      <Flex alignItems="center">
        <Image bg="gray.100" w="70px" borderRadius="5px" src={image}></Image>
        <Flex h="100%" ml="20px"flexDir="column" alignItems="space-between">
          <Heading pl="10px" textTransform="capitalize"color="gray.600" fontSize="lg" >{title}</Heading>
          <Flex p="10px">
            <Button onClick={()=>handleRemoveFromCart()}w="12px" ><Icon color="red.700" as={FaMinus}/></Button>
            <Text w="40px"lineHeight="40px" textAlign="center">{count}</Text>
            <Button onClick={()=>handleAddToCart()}w="6px"><Icon color="green.700" as={FaPlus}/></Button>
          </Flex>
        </Flex>
      </Flex>
      <Icon onClick={()=>deleteFromCart(id)} cursor="pointer"h="20px" w="20px"color="gray.300"as={FaTrash}/>
    </Flex>
  )
};
