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
  Select,
  Button,
  HStack,
  Badge
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';

import { useEffect, useContext } from 'react';
import { AuthApiProvider } from '../../providers/api.provider';
import NewOrder from '../modals/order.new';
import AppContext from '../../utils/context';

function TableRow({ id, amount, name, items, status, number }: { id: any, amount: any, name: any, items: any, status: any, number: any }) {
  var nav = useNavigate();
  var tempstatus = "";
  var color = "";
  switch (status) {
    case 0:
      tempstatus = "Not Completed";
      color = "blue";
      break;
    case 1:
      tempstatus = "Submitted";
      color = "purple";
      break;
    case 3:
      tempstatus = "Returned";
      color = "red";
      break;
    case 4:
      tempstatus = "Completed";
      color = "green";
      break;

    default:
      break;
  }
  return (
    <Tr id={number} style={{ "cursor": "pointer" }} onClick={((ss) => {
      nav(id);
    })}>
      <Td >{number}</Td>
      <Td >{name}</Td>
      <Td isNumeric>{amount}</Td>
      <Td>
        <Badge colorScheme={color}>{tempstatus}</Badge>
      </Td>
    </Tr>
  )
}

const Negotiations = () => {
  const apiProvider = new AuthApiProvider();
  const [list, setList] = useState([]);
  const [option, setOption] = useState("active");

  const appContext = useContext(AppContext);

  const getData = () => {
    return apiProvider.getNegotiations(option).then((res: any) => {
      var ss: any = [];
      res.forEach((element: any) => {
        let amt = 0;
        element.items.forEach((el: any) => {
          amt += el.price;
        });
        ss.push(
          <TableRow number={element.number} name={element.name} id={element._id} amount={amt} items={element.items} status={element.status} />
        );
      });
      setList(ss);
    }).catch((error) => {
      console.log(error);
      alert("error");
    });
  }
  useEffect(() => {
    getData()
    return () => {
      // house clean
    }
  }, [option])


  return (
    <>
      <HStack w='100%' p={4} >
        <Select w="20%" borderColor='teal' onChange={(e) => {
          if (e.target.value === option || e.target.value  === "----") return;
          setOption(e.target.value);
        }}>
          <option selected value='active'>Ongoing</option>
          <option value='completed'>Completed</option>
          <option value='cancelled'>Cancelled</option>
        </Select>
        {/* <NewOrder callback={() => {
              getData();
        }} /> */}
      </HStack>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption>{option.toUpperCase()} NEGOTIATIONS</TableCaption>
        <Thead>
          <Tr>
            <Th >#ID</Th>
            <Th>Name</Th>
            <Th isNumeric>(D) Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th >#ID</Th>
            <Th>Name</Th>
            <Th isNumeric>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}



export default Negotiations;
