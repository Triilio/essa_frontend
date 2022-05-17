import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Flex,
  useColorModeValue,
  Box,
  SimpleGrid,
  Tooltip,
  StatLabel,
  StatNumber,
  Stat,
  chakra,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useEffect, useContext } from 'react';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

import { ReactNode } from 'react';
import {
  FiActivity as ActiveOrderIcon,
  FaJediOrder as TotalOrderIcon,
  CgProfile as TotalClientIcon,
} from 'react-icons/all';

import Chart  from './valueovertime.chart';

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

  // Charts
  const [data, setData] = useState<Array<number>>([3, 4, 3, 2, 6, 7]);

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

  var dataset = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Dataset',
        data: data,
        // borderColor: ,
        // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

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
        <Box
          maxW={'90%'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          py={3}
          px={3}
          overflow={'hidden'}
        >
          <Chart/>
        </Box>
    </>
  );
};

export default Dashboard;
 