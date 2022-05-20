import React, { useEffect, useState } from "react";
import { Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { SaveCart, useProducts } from "./../../Providers/Products";
import { ProductOnCart } from "../ProductOnCart";
import { CloseButton } from "@chakra-ui/react";
import { useUser } from "../../Providers/User";
import api from "../../Services/api";
import { AxiosResponse } from "axios";
interface ModalCartProps {
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Response extends Promise<AxiosResponse<any, any>> {
  data: IData;
}
interface IData {
  email: string;
  id: number;
  name: string;
  password: String;
  savecart: SaveCart[];
}
export const ModalCart = ({ setCartIsOpen }: ModalCartProps) => {
  const { cartLength, cart, setCart } = useProducts();
  const { user, tokenAuth } = useUser();
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const totalCartArr = cart.map(item=>{
    return item.price*item.quantity
  });
  const totalCartNum = totalCartArr.reduce((ant,cur)=>ant+cur,0);
  const totalCartNumBRL = Intl.NumberFormat('pt-br',{style:'currency',currency:'BRL'}).format(totalCartNum)
  useEffect(() => {
    api
      .get(`/users/${user}?_embed=savecart`, {
        headers: { Authorization: `Bearer ${tokenAuth}` },
      })
      .then((res) => {
        const savecart = res.data.savecart;

        setCart([...savecart]);
      })
      .catch();
  }, [setCart, tokenAuth, totalCartNum, user,totalCartNum]);
  return (
    <Flex
    css={{
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
        background:"#27AE60",
      },
      '&::-webkit-scrollbar-thumb': {
        background: "black",
        borderRadius: '10px',
        width:"10px"
      },
    }}
      overflowY="scroll"
      boxShadow="2px 4px 4px gray"
      bg="gray.0"
      h="400px"
      left={isLessThan768 ? "10%" : "auto"}
      borderRadius="8px"
      flexDir="column"
      minW={isLessThan768?"300px":"360px"}
      position="fixed"
      zIndex={2}
    >
      <Flex bg="green.700" justifyContent="space-between">
        <Heading
          p="20px"
          color="#fff"
          borderRadius=" 5px 5px 0 0"
          as="h3"
          fontSize="xl"
        >
          Carrinho de compras
        </Heading>
        <CloseButton onClick={() => setCartIsOpen(false)} color="white" />
      </Flex>
      <Flex flexDir="column" justifyContent="center">
        {cartLength ? (
          <>
          <Flex w="100%" flexDir="column">
            {React.Children.toArray(
              cart.map((product) => <ProductOnCart product={product} />)
            )}
          </Flex>
          <Flex justifyContent="space-between"borderTop="2px solid #e0e0e0" p="20px">
              <Text fontWeight="600" fontSize="16px">Total</Text>
              <Text color="gray.300"fontWeight="600" fontSize="16px">{totalCartNumBRL}</Text>
          </Flex>
          </>
        ) : (
          <Flex alignItems="center" w="100%" flexDir="column">
            <Heading
              fontSize="xl"
              p="20px"
              color="gray.600"
              textAlign="center"
              as="h3"
            >
              Sua sacola está vazia
            </Heading>
            <Text p="20px" color="gray.300">
              Adicione itens
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
