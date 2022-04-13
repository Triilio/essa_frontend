import React, { useState, useRef } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import ReactToPrint from 'react-to-print';
import {
  // Chart,
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
import { Doughnut } from 'react-chartjs-2';

import { ReactNode } from 'react';
import { 
  FiActivity as ActiveOrderIcon, 
  FaJediOrder as TotalOrderIcon, 
  CgProfile as TotalClientIcon
} from 'react-icons/all';

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

  // stats
  const [totalServices, setTotalServices] = useState<number>();
  const [totalProduct, setTotalProducts] = useState<number>();
  const [totalOrders, setTotalOrders] = useState<number>();
  const [totalClients, setTotalClients] = useState<number>();
  const [totalActive, setTotalActive] = useState<number>();

  const appContext = useContext(AppContext);
  const param = useParams();let componentRef = useRef();


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

  const getBasicStat = () => {
    return apiProvider
      .basicStats()
      .then((res: any) => {
        setTotalServices(res.services);
        setTotalProducts(res.products);
        setTotalOrders(res.orders);
        setTotalClients(res.users);
        setTotalActive(res.active);
      })
      .catch(error => {
        alert('error');
      });
  };

  useEffect(() => {
    getUserInfo();
    getBasicStat();
    return () => {};
  }, [reload]);

  interface StatsCardProps {
    title: string;
    stat: any;
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
    { month: '2015-01-01', acc: 84.0 },
    { month: '2015-02-01', acc: 14.9 },
    { month: '2015-03-01', acc: 17.0 },
    { month: '2015-04-01', acc: 20.2 },
    { month: '2015-05-01', acc: 55.6 },
    { month: '2015-06-01', acc: 56.7 },
    { month: '2015-07-01', acc: 30.6 },
    { month: '2015-08-01', acc: 63.2 },
    { month: '2015-09-01', acc: 24.6 },
    { month: '2015-10-01', acc: 14.0 },
    { month: '2015-11-01', acc: 9.4 },
    { month: '2015-12-01', acc: 7.3 },
  ];

 
  type MyDatum = { date: Date, stars: number }
  
  function MyChart() {
    const data = [
      {
        label: 'React Charts',
        data: [
          {
            date: new Date(),
            stars: 23467238,
          },
        ],
      },
    ]
  
    const primaryAxis = React.useMemo(
      (): AxisOptions<MyDatum> => ({
        getValue: (datum: { date: any; }) => datum.date,
      }),
      []
    )
  
    const secondaryAxes = React.useMemo(
      (): AxisOptions<MyDatum>[] => [
        {
          getValue: datum => datum.stars,
        },
      ],
      []
    )
  
    return (
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    )
  }
 
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
          {/* Our company is expanding, you could be too. */}
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Total Clients'}
            stat={totalClients}
            icon={<TotalClientIcon size={'3em'} />}
          />
          <StatsCard
            title={'Total Orders'}
            stat={totalOrders}
            icon={<TotalOrderIcon size={'3em'} />}
          />
          <StatsCard
            title={'Active Orders'}
            stat={totalActive}
            icon={<ActiveOrderIcon size={'3em'} />}
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
          {/* <Doughnut data={{}} /> */}
        </Box>
      </Tooltip>
    </>
  );
};

export default Dashboard;
