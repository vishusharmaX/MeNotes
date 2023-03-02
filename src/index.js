import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ColorModeScript,ChakraProvider,theme } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher'


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
   <ColorModeScript />
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher/>
    <App/>
  </ChakraProvider> 

</React.StrictMode>
);

