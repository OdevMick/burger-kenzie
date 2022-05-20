import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { ProductsInfo, useProducts } from "../../Providers/Products";
import hamburguer from "./../../Assets/hamburguer.png";
import xBurguer from "./../../Assets/x-burguer.png";
import bigKenzie from "./../../Assets/big-kenzie.png";
import comboKenzie from "./../../Assets/combo-kenzie.png";
import fantaGuarana from "./../../Assets/fanta-guarana.png";
import cocaCola from "./../../Assets/coca-cola.png";
import mcShake from "./../../Assets/mc-shake-ovomaltine.png";
import sundae from "./../../Assets/sundae.png";

interface ProductProp {
  item: ProductsInfo;
}
const Product = ({ item }: ProductProp) => {
  const { addToCart } = useProducts();

  const arrayImages = [
    hamburguer,
    xBurguer,
    bigKenzie,
    comboKenzie,
    fantaGuarana,
    cocaCola,
    mcShake,
    sundae,
  ];
  
  const { title, category, price, image } = item;
  const newImageIndex = arrayImages.findIndex((item) =>{
    
    return item===image
  });
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const newImage = arrayImages[newImageIndex];
  return (
    <Flex
      _hover={{ border: "1px solid black" }}
      flex={isLessThan768 ? "1" : "none"}
      minW="250px"
      flexDir="column"
      m="10px"
      minH="346px"
      border=" 2px solid rgba(224, 224, 224, 1)"
      border-radius="5px"
    >
      <Flex
        bg="gray.0"
        display="flex"
        alignItems="center"
        h="160px"
        justifyContent="center"
      >
        <Image w="177px" src={image}></Image>
      </Flex>
      <Flex display="flex" flexDir="column">
        <Heading
          color="gray.600"
          as="h1"
          textTransform="capitalize"
          fontSize="lg"
          pt="26px"
          pl="20px"
        >
          {title}
        </Heading>
        <Text textTransform="capitalize" fontSize="sm" pt="18px" pl="20px">
          {category}
        </Text>
        <Text
          pt="5px"
          pl="20px"
          fontWeight="600"
          fontSize="sm"
          color="green.700"
        >
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </Text>
        <Button
          onClick={() => addToCart(1, title, item, newImage)}
          mt="5px"
          borderRadius="8px"
          cursor="pointer"
          color="white"
          ml="20px"
          border="2px solid green.700"
          w="106px"
          h="40px"
          bg="green.700"
        >
          Adicionar
        </Button>
      </Flex>
    </Flex>
  );
};
export default Product;
