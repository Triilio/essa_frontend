import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
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
import { MdRowing } from 'react-icons/md';


const Negotiations = () => {
  var nav = useNavigate();
  const apiProvider = new AuthApiProvider();
  const [list, setList] = useState([]);
  const [option, setOption] = useState("active");
  const [data, setData] = useState([]);

  const appContext = useContext(AppContext);
  
  const columns = [
    // id, amount, name, items, status, number
    {
      name: '#',
      selector: (row:any) => row.number,
      sortable:true
    },
    {
      name: 'Title',
      selector: (row:any) => row.name,
      sortable:true
    },
    {
      name: 'Type',
      selector: (row:any) => row.status,
      sortable:true,
      format:(row:any,index:Number)=>{
        var tempstatus = "";
        var color = "";        
          switch (row.type) {
            case 'Service':
              tempstatus = "Not Completed";
              color = "blue";
              break;
                }
                 return <Badge colorScheme={row.type === 'Service' ? 'red' : 'blue'}>{row.type}</Badge>
                }
    },
  ];



  const getData = () => {
    return apiProvider.getNegotiations(option).then((res: any) => {
      var ss: any = [];
      // res.forEach((element: any) => {
      //   let amt = 0;
      //   element.items.forEach((el: any) => {
      //     amt += el.price;
      //   });
      //   ss.push(
      //     <TableRow number={element.number} name={element.name} id={element._id} amount={amt} items={element.items} status={element.status} />
      //   );
      // });
      setList(ss);
      setData(res);
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
      </HStack>
      <DataTable
        title="Active Orders"
        columns={columns}
        data={data}
        selectableRows
        // defaultSortAsc={false}
        striped={true}
        pagination
        pointerOnHover
        onRowClicked={(row, event) => {
          // alert("clicked"+row._id)
          nav(row._id);
        }}
      />
    </>
  )
}



export default Negotiations;
