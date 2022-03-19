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
import NewClient from '../modals/client.new';

function TableRow({ id, name, email, phone, businessname }: { id: any, name: String, email: String, phone: String, businessname:String }) {
  var nav = useNavigate();
  var tempstatus = "";
  var color = "";
  return (
    <Tr id={id} style={{ "cursor": "pointer" }} onClick={((ss) => {
      nav(id);
    })}>
      <Td >{businessname}</Td>
      <Td >{email}</Td>
      <Td isNumeric>{phone}</Td>
      <Td>
        {/* <Badge colorScheme={color}>{tempstatus}</Badge> */}
      </Td>
    </Tr>
  )
}

const Clients = () => {
  const apiProvider = new AuthApiProvider();
  const [list, setList] = useState([]);
  const [option, setOption] = useState("active");

  const appContext = useContext(AppContext);

  const getData = () => {
    return apiProvider.getClients('Client').then((res: any) => {
      var ss: any = [];
      res.data.forEach((element: any) => {
        ss.push(
          <TableRow name={element.name} id={element._id} email={element.email} phone={element.phone} businessname={element.businessname}/>
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
        <NewClient callback={() => {
          getData();
        }} />
      </HStack>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption>CLIENTS</TableCaption>
        <Thead>
          <Tr>
            <Th >Name</Th>
            <Th>Email</Th>
            <Th isNumeric>Phone</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th >Name</Th>
            <Th>Email</Th>
            <Th isNumeric>Phone</Th>
            <Th>Status</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}



export default Clients;
