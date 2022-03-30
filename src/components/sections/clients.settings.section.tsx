import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Badge,
  Text,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  AvatarBadge,
  IconButton,
  Flex,
  useColorModeValue,
  Heading,
  Stack,
  Center,
  Button,
  Box,
  SimpleGrid,
  ListItem,
  List,
  VStack,
  StackDivider,
  Container,
  Tooltip,
  HStack,
  Checkbox,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SmallCloseIcon } from '@chakra-ui/icons';

import { useEffect, useContext } from 'react';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import NewOrder from '../modals/order.user.new';

function TableRow({
  id,
  amount,
  name,
  items,
  status,
  number,
}: {
  id: any;
  amount: any;
  name: any;
  items: any;
  status: any;
  number: any;
}) {
  var nav = useNavigate();
  return (
    <Tr
      id={number}
      style={{ cursor: 'pointer' }}
      onClick={ss => {
        nav(`/orders/${id}`);
      }}
    >
      <Td>{number}</Td>
      <Td>{name}</Td>
      <Td isNumeric>{amount}</Td>
      <Td>
        <Badge colorScheme={''}>{}</Badge>
      </Td>
    </Tr>
  );
}

const ClientDetails = () => {
  const apiProvider = new AuthApiProvider();
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);

  const [businessname, setBusinessName] = useState('');
  const [contactname, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState('');
  const [enable, setEnable] = useState(true);

  const appContext = useContext(AppContext);
  const param = useParams();

  const UserProfileEdit = (): JSX.Element => {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
            >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  };

  const getUserInfo = () => {
    return apiProvider
      .getMe({ id: param.id })
      .then((res: any) => {
        console.log(res);
        setBusinessName(res.data.businessname);
        setContactName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setActive(res.data.active);
      })
      .catch(error => {
        console.log(error);
        alert('error');
      });
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, [reload]);

  return (
    <>
      <Container maxW={'7xl'}>
        <SimpleGrid
          // columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {businessname}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >
                {/* $350 */}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  User Details
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>
                      <FormControl id="email">
                        <FormLabel>Business Name</FormLabel>
                        <Input
                          disabled={enable}
                          placeholder={businessname}
                          _placeholder={{ color: 'gray.500' }}
                          type="type"
                        />
                      </FormControl>
                    </ListItem>
                    <ListItem>
                      <FormControl id="email">
                        <FormLabel>Contact Name</FormLabel>
                        <Input
                          disabled={enable}
                          placeholder={contactname}
                          _placeholder={{ color: 'gray.500' }}
                          type="type"
                        />
                      </FormControl>
                    </ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>
                      <FormControl id="phone">
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                          disabled={enable}
                          placeholder={phone}
                          _placeholder={{ color: 'gray.500' }}
                          type="phone"
                        />
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Email Number</FormLabel>
                        <Input
                          disabled={enable}
                          placeholder={email}
                          _placeholder={{ color: 'gray.500' }}
                          type="email"
                        />
                      </FormControl>
                    </ListItem>
                  </List>
                </SimpleGrid>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Tooltip label={'Change Passwords'}>
        <Box
          maxW={'100%'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          py={3}
          overflow={'hidden'}
        >
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'} to={'#'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Tooltip>
    </>
  );
};

export default ClientDetails;
