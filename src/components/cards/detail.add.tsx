import {
  Box,
  Center,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  Input,
  Tooltip,
  HStack,
  Stack,
} from '@chakra-ui/react';
import {
  CheckIcon,
  InfoIcon,
  CheckCircleIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import { useEffect, useState, useRef, Component } from 'react';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { useParams } from 'react-router-dom';

export default function Detail({
  label,
  tooltip,
  value,
  isSet,
  component,
  type,
}: {
  label: string;
  tooltip: string;
  value: any;
  isSet: any;
  component: any;
  type: any;
}) {

  const param = useParams();
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GMD',
    minimumFractionDigits: 2,
  });
  
  var apiProvider = new AuthApiProvider();


  return (
    <Tooltip label={tooltip}>
      <Box
        maxW={'250px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        py={3}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={3}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'md'}
            fontWeight={500}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}
          >
            {label}
          </Text>
          <Stack direction={'column'} align={'center'} justify={'center'}>
            <Text
              fontSize={'3xl'}
              fontWeight={800}
              textColor={isSet ? 'green' : 'red'}
            >
              {/* {isSet ? <CheckCircleIcon /> : <WarningIcon color={'tomato'} />} */}
              {type === "%" ? `${value}%` : formatter.format(value)}
            </Text>
            <Text>{isSet ? 'Added' : 'Not set'}</Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={1}>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            {component}
          </Stack>
        </Box>
      </Box>
    </Tooltip>
  );
}
