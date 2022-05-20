import { useToast } from "@chakra-ui/react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import api from "../../Services/api";
import { useUser } from "../User";

interface ProductsProviderProps {
  children: ReactNode;
}
interface ProductsProviderTools {
  productsList: ProductsInfo[] | [];
  setProductsList: React.Dispatch<React.SetStateAction<ProductsInfo[]>>;
  cart: SaveCart[];
  addToCart: (
    count: number,
    title: string,
    product: ProductsInfo,
    image: string
  ) => void;
  cartLength: number;
  setCart: React.Dispatch<React.SetStateAction<SaveCart[]>>;
  removeFromCart: (id: number, product: ProductsInfo, image: string) => void;
  productsFromApi: () => void;
  getCart: () => void;
  deleteFromCart: (id: number) => void;
  filteredList:ProductsInfo[];
  setFilteredList:React.Dispatch<React.SetStateAction<ProductsInfo[]>>;
  isInvalidUser:boolean;
  setIsInvalidUser:React.Dispatch<React.SetStateAction<boolean>>;
  isLoading:boolean;
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ProductsInfo {
  image: string;
  category: string;
  price: number;
  title: string;
}
export interface CartItem extends ProductsInfo {
  id: number;
}
export interface CartInfo {
  item: CartItem;
  quantity: number;
}
export interface SaveCart {
  category: string;
  price: number;
  title: string;
  quantity: number;
  id: number;
  userId: number;
  image: string;
}
const ProductsContext = createContext<ProductsProviderTools>(
  {} as ProductsProviderTools
);
export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [productsList, setProductsList] = useState<ProductsInfo[]>([]);
  const [cart, setCart] = useState<SaveCart[]>([]);
  const { user, tokenAuth } = useUser();
  const [filteredList, setFilteredList] = useState<ProductsInfo[]>([]);
  const [isInvalidUser,setIsInvalidUser] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const toast = useToast();
  const cartLength = cart.length;

 
  const getCart = () => {
    api
      .get(`/users/${user}?_embed=savecart`, {
        headers: { Authorization: `Bearer ${tokenAuth}` },
      })
      .then((res) => {
        setCart([...res.data.savecart]);
      });
  };
  const addToCart = (
   count: number,
    title: string,
    product: ProductsInfo,
    image: string
  ) => {
   
    api
      .get(`/users/${user}?_embed=savecart`, {
        headers: { Authorization: `Bearer ${tokenAuth}` },
      })
      .then((res) => {
        const savecart = res.data.savecart;

        const filteredCart = savecart.filter((item: SaveCart) => {
          return item.title === title;
        });

        if (filteredCart.length > 0) {
          const quantity = filteredCart[0].quantity;
          const actualId = filteredCart[0].id;

          api
            .patch(
              `/savecart/${actualId}`,
              { quantity: quantity + 1 },
              { headers: { Authorization: `Bearer ${tokenAuth}` } }
            )
            .then((res) => {
             
            });
        } else {
          const newProduct = {
            ...product,
            image: image,
            userId: user,
            quantity: 1,
          };

          api.post(`/savecart`, newProduct, {
            headers: { Authorization: `Bearer ${tokenAuth}` },
          });
        }
        toast({
          title: `Adicionado!`,
          status: "success",
          isClosable: true,
        });
        setCart([...savecart]);
      });
  };
  const productsFromApi = () => {
    api
      .get("/products", { headers: { Authorization: `Bearer ${tokenAuth}` } })
      .then((res) => {
        setProductsList([...res.data]);
        setIsInvalidUser(false)
        setIsLoading(true);
      })
      .catch((err) => {
      
        setIsInvalidUser(true)
        setIsLoading(true)
      
      });
  };
  const removeFromCart = (id: number, product: ProductsInfo, image: string) => {
    const findProduct = cart.filter((itemOnCart) => {
      return itemOnCart.id === id;
    });
    const quantity = findProduct[0].quantity;
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      api
        .patch(
          `/savecart/${id}`,
          { quantity: +quantity - 1 },
          { headers: { Authorization: `Bearer ${tokenAuth}` } }
        )
        .then((res) => {
          toast({
            title: `Removido!`,
            status: "error",
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err)
          toast({
            title: `Algo deu errado...`,
            status: "error",
            isClosable: true,
          });
        });
    }
  };
  const deleteFromCart = (id: number) => {
    api
      .delete(`/savecart/${id}`, {
        headers: { Authorization: `Bearer ${tokenAuth}` },
      })
      .then((res) => {
        toast({
          title: `Removido!`,
          status: "error",
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    getCart();
  }, [cart, removeFromCart, deleteFromCart, addToCart]);
  return (
    <ProductsContext.Provider
      value={{filteredList,setFilteredList,isInvalidUser,setIsInvalidUser,isLoading,setIsLoading,
        deleteFromCart,
        getCart,
        setCart,
        removeFromCart,
        productsList,
        cartLength,
        setProductsList,
        cart,
        addToCart,
        productsFromApi,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);
