import * as React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useState, useContext, useEffect } from "react";
  import AppContext from "../../utils/context";
  import axios from "axios";
  
  const SimpleCard = () =>  {
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState(""); 
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

  useEffect(() => {

    var state = window.localStorage.getItem('user');
    if(state != null){
      //  make state
      var user = JSON.parse(state);
      appContext.setUser(user.user);
      axios.defaults.headers.post["x-auth-token"] = user.token; 
      axios.defaults.headers.get["x-auth-token"] = user.token; 
      console.log(user)
      console.log(user.token)
    }
  },[]);

    return ( 
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=>setPassword(e.target.value)}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={async ()=>{
                    var res:any = await appContext.signin({
                      email:email,
                      password:password
                    });
                
                    if(res !== null){
                      console.log(res);
                      console.log('token =>',res.token);
                      axios.defaults.headers.common = {
                        "X-auth-token": res.token,
                      };
                      console.log(window.localStorage.getItem('user'))
                      appContext.setToken(res.token);
                      appContext.setUser(res.user);
                    }
                  }}
                  >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  export default SimpleCard;

