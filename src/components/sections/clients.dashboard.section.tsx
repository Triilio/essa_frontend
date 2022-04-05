import React, { useState } from 'react';
import {
  Chart,
  Axis,
  Tooltip as BizChartsTooltip,
  Line,
  Point,
} from 'bizcharts';
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
  StatLabel,
  StatNumber,
  Stat,
  chakra,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SmallCloseIcon } from '@chakra-ui/icons';

import { useEffect, useContext } from 'react';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

const Dashboard = () => {
  const apiProvider = new AuthApiProvider();
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);

  const [businessname, setBusinessName] = useState('');
  const [contactname, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState('');
  const [enable, setEnable] = useState(true);

  const [prevpass, setPrevpass] = useState<String>();
  const [newpass, setNewpass] = useState<String>();
  const [confirmnewpass, setConfirmNewpass] = useState<String>();

  const appContext = useContext(AppContext);
  const param = useParams();

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

  interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
  }
  function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}
      >
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }

  const data = [
    { month: "2015-01-01", acc: 84.0 },
    { month: "2015-02-01", acc: 14.9 },
    { month: "2015-03-01", acc: 17.0 },
    { month: "2015-04-01", acc: 20.2 },
    { month: "2015-05-01", acc: 55.6 },
    { month: "2015-06-01", acc: 56.7 },
    { month: "2015-07-01", acc: 30.6 },
    { month: "2015-08-01", acc: 63.2 },
    { month: "2015-09-01", acc: 24.6 },
    { month: "2015-10-01", acc: 14.0 },
    { month: "2015-11-01", acc: 9.4 },
    { month: "2015-12-01", acc: 7.3 }
  ];
  

  return (
    <>
      <Box
        maxW={'100%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        py={3}
        p={3}
        marginBottom={4}
        overflow={'hidden'}
      >
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}
        >
          Our company is expanding, you could be too.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Users'}
            stat={'5,000'}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'Servers'}
            stat={'1,000'}
            icon={<FiServer size={'3em'} />}
          />
          <StatsCard
            title={'Datacenters'}
            stat={'7'}
            icon={<GoLocation size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
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
          {/* <Chart height={400} data={data} forceFit>
            <Axis name="temperature" label={{ formatter: val => `${val}°C` }} />
            <Line position="month*temperature" size={2} color={'city'} />
            <Point position="month*temperature" size={4} color={'city'} />
          </Chart> */}
        </Box>
      </Tooltip>
    </>
  );
};

export default Dashboard;
