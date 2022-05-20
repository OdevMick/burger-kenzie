import {extendTheme} from '@chakra-ui/react';
export const theme = extendTheme({
  colors:{
    green:{
      50:"#93D7AF",
      700:"#27AE60",
      800:"#168821",
    },
    red:{
      700:"#EB5757",
      800:"#E60000",
    },
    gray:{
      0:"#F5F5F5",
      100:"#E0E0E0",
      150:"#BDBDBD",
      200:"#999999",
      300:"#828282",
      600:"#333333",
    },
    yellow:{
      800:"#FFCD07",
    },
    blue:{
      800:"#155BCB",
    }
  },
  fonts:{
    heading:"Inter",
    body:"Inter",
    input:"Inter"
  },
  fontSizes:{
    xs: "0.75rem",
    sm:"0.875rem",
    md:"1rem",
    lg:"1.125rem",
    xl:"1.375rem",
    "2xl":"1.625rem",
  },
  styles:{
    global:{
      body:{
        bg:'white',
      }
    }
  },
  
});