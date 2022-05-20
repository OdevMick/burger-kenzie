import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ChakraProvider } from '@chakra-ui/react';
import {theme} from './Styles/theme';
import {BrowserRouter} from 'react-router-dom';
import {Providers} from './Providers/index';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Providers>
       <BrowserRouter>
          <App />
      </BrowserRouter>
     </Providers>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

