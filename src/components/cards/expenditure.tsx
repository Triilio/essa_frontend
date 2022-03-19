import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  Input,
  Tooltip,
} from '@chakra-ui/react';
import { CheckIcon, InfoIcon,  } from '@chakra-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import RemoveItem from '../modals/item.delete';
import EditItem from '../modals/item.edit';
import NewPayment from '../modals/payment.new';
import RemovePayment from '../modals/payment.delete';

export default function Expenditure({items, tooltip, callback }: { items : any, tooltip:string, callback: () => void }) {
  const hiddenFileInput = useRef(null);
  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);
  const param = useParams();

  const [requestLetterAdded, setRequestLetterAdded] = useState(false);
  const [formData, setFormData] = useState<FormData>();
  // const [items, setItems] = useState([]);



  const columns = [
    // id, amount, name, items, status, number
    {
      name: 'Date',
      selector: (row: any) => row.date,
      sortable: true,
      format:(row:any, index:any)=>{
        // var sdate = row.date.toString().split("-")
        return(
          <>{row.date}</>
        )
      }
    },
    {
      name: 'Amount',
      selector: (row: any) => row.amount,
      sortable: true,
    },
    {
      name: 'Actions',
      selector: (row: any) => row.id,
      format: (row: any, index: any) => {
        console.log("row => ",row)
        return (
          <>
            <RemovePayment
              id={row._id}
              note={row.note}
              amount={row.amount}
              date={row.date}
              callback={function (): void {
                callback();
              }}
            />
          </>
        );
      },
    },
  ];



  const uploadFile = () => {
    apiProvider.uploadDoc({ url: '/orders/uploaddoc', formData: formData }).then((data) => {
      callback(); // refresh parent
    }).catch((error) => {
      console.log(error);
      alert("Error Occured");
    })
  }

  return (
    <Tooltip label={tooltip}>
    <Box
      maxW={'100%'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      py={3}
      overflow={'hidden'}>
      <Stack
        textAlign={'center'}
        p={3}
        color={useColorModeValue('gray.800', 'white')}
        align={'flex-start'}
      >
        <Text
          fontSize={'md'}
          fontWeight={500}
          bg={useColorModeValue('green.50', 'green.900')}
          p={2}
          px={3}
          color={'green.500'}
          rounded={'full'}>
          Payments Tracker
        </Text>
        <NewPayment id={param.id+""} callback={function (): void {
            callback()
          } }/>
      </Stack>

      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={1}>
      <DataTable
              title={
                <>
                  Expenditure
                </> 
              }
              columns={columns}
              data={items}
              contextMessage={{singular:"Payment",plural:"Payments",message:"No payments yet"}}
              selectableRows
              // defaultSortAsc={false}
              striped={true}
              pagination
              pointerOnHover
              onRowClicked={(row, event) => {
                // alert("clicked"+row._id)
                // nav(row._id);
              }}
            />
      </Box>
    </Box>
    </Tooltip>
  );
}


