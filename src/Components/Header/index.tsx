import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Icon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Box,
  Drawer,
  DrawerBody,
  InputRightElement,
  DrawerContent,
  InputGroup,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  CloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Input } from "../Input";

import { useUser } from "../../Providers/User";
import { useProducts } from "../../Providers/Products";

interface HeaderProps {
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setCartIsOpen }: HeaderProps) => {
 
  const { setAuth, setTokenAuth } = useUser();
  const {
    cart,
    setFilteredList,
    getCart,
    productsList,
  } = useProducts();
  const [search, setSearch] = useState("");

  const totalProducts = cart
    .map((item) => {
      return item.quantity;
    })
    .reduce((a, b) => a + b, 0);
  const handleSearch = () => {
    const productsFiltered = productsList.filter((item) =>
      item.title.includes(search.toLowerCase())
    );

    if (productsFiltered.length) {
      setFilteredList([...productsFiltered]);
    } else {
      setFilteredList([]);
    }
  };
  const handleSearchInput = (value: string) => {
    const productsFiltered = productsList.filter((item) =>
      item.title.includes(value.toLowerCase())
    );
    
    if (productsFiltered.length) {
      setFilteredList([...productsFiltered]);
    } else {
      setFilteredList([]);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [isLessThan900] = useMediaQuery("(max-width: 900px)");
  const handleLogOut = () => {
    setAuth(false);
    setTokenAuth("");
    localStorage.clear();
  };
  return (
    <>
      {isLessThan768 && (
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerContent>
            <DrawerHeader display="flex" justifyContent="space-between">
              <Text>Pesquisar</Text>
              <CloseButton onClick={onClose} />
            </DrawerHeader>
            <DrawerBody>
              <InputGroup position="relative">
                <Input
                  p="10px"
                  h="50px"
                  borderRadius="8px"
                  borderColor="gray.600"
                  placeholder="Ex.: Hamburguer"
                  onChange={(e) => {
                    handleSearchInput(e.currentTarget.value);
                    setSearch(e.currentTarget.value);
                  }}
                />
                <InputRightElement
                  _hover={{ cursor: "pointer" }}
                  top="6px"
                  w="70px"
                  right="8px"
                  bg="green.700"
                  borderRadius="8px"
                  p="10px"
                >
                  <Button  w="100%" bg="green.700" onClick={handleSearch}>
                    <Icon as={FaSearch} color="white" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      <Flex
        as="header"
        h="80px"
        justifyContent="space-between"
        p="20px"
        bg="gray.0"
        m="0 auto"
        w={isLessThan768 ? "100%" : "80%"}
        align="center"
      >
        <Heading color="gray.600" fontSize={isLessThan768 ? "xl" : "3xl"}>
          Burguer{" "}
          <Text as="span" color="red.700" fontSize="md">
            Kenzie
          </Text>
        </Heading>
        <HStack spacing="4" display="flex" align="center">
          {isLessThan768 && (
            <Icon
              h="24px"
              w="24px"
              color="gray.150"
              onClick={onOpen}
              as={FaSearch}
              _hover={{ cursor: "pointer", color: "green.700" }}
            />
          )}
          {!isLessThan768 && (
            <InputGroup position="relative">
              <Input
                bg="white"
                w={isLessThan900 ? "260px" : "360px"}
                p="10px"
                border="2px outset gray.100"
                h="50px"
                borderRadius="8px"
                _focus={{ border: "1px solid black" }}
                placeholder="Digitar Pesquisa "
                onChange={(e) => {
                  handleSearchInput(e.currentTarget.value);
                  setSearch(e.currentTarget.value);
                }}
              />
              <InputRightElement
                _hover={{ cursor: "pointer" }}
                top="5px"
                w="75px"
                right="6px"
                bg="green.700"
                borderRadius="8px"
                p="10px"
              >
                <Icon as={FaSearch} color="white" onClick={handleSearch} />
              </InputRightElement>
            </InputGroup>
          )}
          <Box
            position="relative"
            display="flex"
            align="center"
            _hover={{ cursor: "pointer" }}
          >
            <Icon
              onClick={() => setCartIsOpen(true)}
              h="24px"
              w="24px"
              _hover={{ color: "green.700" }}
              color="gray.150"
              as={FaShoppingCart}
            />
            <Badge
              bg="green.700"
              position="absolute"
              borderRadius="30%"
              h="18px"
              lineHeight="18px"
              fontSize="10px"
              w="18px"
              left="16px"
              bottom="12px"
              variant="solid"
            >
              {totalProducts}
            </Badge>
          </Box>

          <Box onClick={handleLogOut}>
            <Icon
              h="24px"
              w="24px"
              color="gray.150"
              as={FaSignOutAlt}
              _hover={{ cursor: "pointer", color: "green.700" }}
            />
          </Box>
        </HStack>
      </Flex>
    </>
  );
};
export default Header;
