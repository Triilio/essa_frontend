import * as React from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState, useContext } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import AppContext from './../../utils/context';
  
  const SignupCard = () =>  {
    const [showPassword, setShowPassword] = useState(false);

    const [firstname, setFirstname] = useState(""); 
    const [lastname, setLastname] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [businessname, setBusinessname] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const appContext = useContext(AppContext);
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" onChange={(e)=>setFirstname(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" onChange={(e)=>setLastname(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="businessname" isRequired>
                <FormLabel>Business Name</FormLabel>
                <Input type="name" onChange={(e)=>setBusinessname(e.target.value)}/>
              </FormControl>
              <FormControl id="businessaddress" isRequired>
                <FormLabel>Business Address</FormLabel>
                <Input type="address" onChange={(e)=>setAddress(e.target.value)}/>
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input type="number" maxLength={7} onChange={(e)=>setPhone(e.target.value)}/>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  onClick={async ()=>{
                    var res:any = await appContext.signup({
                    name:firstname+" "+lastname,
                    email:email,
                    businessname:businessname,
                    phone:phone,
                    address:address,
                    password:password
                  });
                  if(res){
                    appContext.modalstate.simplemodal = {isOpen:true,icon:null,title:"Success", message:"Signup Operation Successfull"};
                    appContext.setSigninPageActive(true);
                  } else {
                    appContext.modalstate.simplemodal = {isOpen:true,icon:null,title:"Signup Error", message:"Signup Operation Failed, Please try again."};
                  }
                }}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  {/* Already a user? <Link color={'blue.400'} >Login</Link> */}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  export default SignupCard;