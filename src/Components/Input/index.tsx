import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps, 
  InputRightElement, 
  InputGroup
} from '@chakra-ui/react';
import {useState,useEffect,useCallback,forwardRef,ForwardRefRenderFunction} from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons/lib';
interface InputProps extends ChakraInputProps{
  name?:string;
  label?:string;
  error?:FieldError|null;
  icon?:IconType;
}
type inputVariationsOptions = {
  [key:string] : string;
}
const inputVariations : inputVariationsOptions= {
  error:"red.800",
  default:"transparent",
  focus:"blue.600",
  filled:"green.800",
}
 const InputBase:ForwardRefRenderFunction<HTMLInputElement,InputProps> =({ name, label, error=null, icon:Icon,...rest}:InputProps,ref)=>{
  const [variation,setVariation] = useState("default");
  const [value,setValue] = useState("")
  useEffect(()=>{
    if(error){
      return setVariation('error');
    };
  },[error]);
  const handleInputOnFocus = useCallback(()=>{
    if(!error){
      return setVariation('focus');
    };
  },[error]);
  const handleInputOnExit = useCallback(()=>{
    if(value.length>1&&!error){
      return setVariation("filled")
    };
  },[error,value]);
  return (
    <FormControl isInvalid={!!error}>
      {label&&<FormLabel>Label</FormLabel>}
      <InputGroup flexDirection="column">
    
        <ChakraInput 
          onFocus={handleInputOnFocus}
          onChangeCapture={e => setValue(e.currentTarget.value)}
          color={inputVariations[variation]}
          onBlurCapture={handleInputOnExit}
          name={name}
          focusBorderColor={inputVariations[variation]}
          borderColor={inputVariations[variation]}
          borderWidth="0.5"
        ref={ref}
         {...rest}/>
       {!!error&&<FormErrorMessage>{error.message}</FormErrorMessage>} 
      </InputGroup>
   </FormControl>
  )
};
export const Input = forwardRef<HTMLInputElement,InputProps>(InputBase);