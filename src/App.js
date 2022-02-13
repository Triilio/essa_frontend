import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import AppContext from './utils/context';
import Home from './pages/home';
import Main from './pages/main';
import axios from "axios";

// define context objects
/**
 * State objects
 * user object
 * authentication token
 * theme 
 */

/**
 * 
 * @returns 
 * <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
          </VStack>
        </Grid>
      </Box>
 */
function App() {

  axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-type": "application/json"
    }
  });
  
  return (
    <AppContext.Provider>
      <ChakraProvider theme={theme}>
            <Main/>
      </ChakraProvider>
  </AppContext.Provider>
  );
}

export default App;
