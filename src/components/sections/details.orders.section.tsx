import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Badge,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  list,
  HStack,
  Tooltip,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Portal,
} from '@chakra-ui/react';
import { AuthApiProvider } from '../../providers/api.provider';
import { useParams } from 'react-router-dom';
import AppContext from '../../utils/context';
import NewItem from '../modals/item.new';
import EditItem from '../modals/item.edit';
import RemoveItem from '../modals/item.delete';
import PrintIvoice from '../modals/item.print';
import Payments from '../cards/payments';
import Detail from './../cards/detail.add';
import { Spinner } from '@chakra-ui/react';
import Expenditure from '../cards/expenditure';
import Category from '../cards/categories';
import AddContengency from '../modals/add.contengency';
import WorkmanShip from '../modals/add.workmanship';
// import NewDocument from '../modals/document.new';
import RemoveDocument from '../modals/document.delete,';
import DownloadDocument from '../modals/document.download';
import NewDocument from '../modals/document.new';

export default function NegotiationDetails() {
  const apiContext = useContext(AppContext);
  const param = useParams();
  const apiProvider = new AuthApiProvider();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('');
  const [items, setItems] = useState([]);
  const [thread, setThread] = useState([]);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(0);
  const [contingency, setContingency] = useState(0);
  const [workmanship, setWorkmanship] = useState(0);

  const [backer, setBacker] = useState<any>(null);
  const [payments, setPayments] = useState([]);
  const [expenditure, setExpenditure] = useState([]);

  // docs / service docs
  const [requestdoc, setRequestDoc] = useState(null);
  const [documents, setDocuments] = useState<any>([]);
  const [boq, setBOQ] = useState(null);
  const [completioncert, setCompletioncert] = useState(null);
  const [surveyreport, setSurveyreport] = useState(null);

  const [category, setCategory] = useState<any>([]);

  // docs / product docs
  const [invoice, setInvoice] = useState(null);
  const [deliverynote, setDeliverynote] = useState(null);
  const [reciept, setReciept] = useState(null);

  const [refreshStateTracker, setRefreshStateTracker] = useState(false);

  useEffect(() => {
    getData();
    return () => {};
  }, [refreshStateTracker]);


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GMD',
    minimumFractionDigits: 2,
  });


  const getData = () => {
    return apiProvider
      .getOneNegotiation(param.id + '')
      .then((res: any) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setItems(res.data.items);
        setThread(res.data.thread);
        setType(res.data.type);
        setStatus(res.data.status);
        setBacker(res.data.backer);

        setPayments(res.data.payments);
        setExpenditure(res.data.expenditure);
        setCategory(res.data.categories);
        setContingency(res.data.contingency | 0);
        setWorkmanship(res.data.workmanship | 0);

        // initing docs
        setDocuments(res.data.documents);
        setRequestDoc(res.data.docs.requestdoc);
        setBOQ(res.data.docs.boq);
        setCompletioncert(res.data.docs.completioncert);
        setSurveyreport(res.data.docs.surveyreport);
        setDeliverynote(res.data.docs.deliverynote);

        var p = 0;
        res.data.items.forEach(
          ({ price, units }: { price: any; units: any }) => {
            p +=
              0 +
              (Number.parseFloat(units) * Number.parseFloat(price.price) || 1);
          }
        );
        //  add workmanship
        p += res.data.workmanship;
        // add contingency
        p += (price / 100) * res.data.contingency;
        setPrice(p);
      })
      .catch(error => {
        console.log(error);
        alert('error');
      });
  };

  const updateStatus = () => {
    if (list.length < 1) {
      alert('You cannot submit an empty order');
      return;
    }

    if (!window.confirm('Are you Sure you want to mark this order as done?')) {
      return;
    }
    return apiProvider
      .updateStatus({ id: param.id + '', update: { status: 4 } })
      .then((res: any) => {
        console.log('status => ', status);
        // Navigator
        setRefreshStateTracker(!refreshStateTracker);
      })
      .catch(error => {
        console.log(error);
        alert('error');
      });
  };

  const columns = [
    // id, amount, name, items, status, number
    {
      name: 'Title',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row: any) => row.price.price,
      sortable: true,
    },
    {
      name: 'Supplier',
      selector: (row: any) => row.supplier,
      sortable: true,
    },
    {
      name: 'Actions',
      selector: (row: any) => row.supplier,
      format: (row: any, index: any) => {
        return (
          <>
            <EditItem
              id={row._id}
              callback={function (): void {
                setRefreshStateTracker(!refreshStateTracker);
              }}
            />
            <RemoveItem
              id={row._id}
              name={row.name}
              price={row.price.price}
              callback={function (): void {
                setRefreshStateTracker(!refreshStateTracker);
              }}
            />
          </>
        );
      },
    },
  ];

  const doccolumns = [
    // id, amount, name, items, status, number
    {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'file',
      selector: (row: any) => row.file,
      sortable: true,
    },
    {
      name: 'Actions',
      selector: (row: any) => row.note,
      format: (row: any, index: any) => {
        return (
          <>
          <DownloadDocument docid={row.file} type={'doc'} callback={function (): void {
              throw new Error('Function not implemented.');
            } } />
            <RemoveDocument id={row._id} name={row.name} file={row.file} note={row.note} 
          callback={function (): void {
            setRefreshStateTracker(!refreshStateTracker);
          }}
          />
          </>
        );
      },
    },
  ];

  return (
    <Container maxW={'7xl'}>
      {name ? (
        <Body />
      ) : (
        <Center alignContent={'center'} padding={'30%'} alignSelf={'center'}>
          <Spinner
            size={'xl'}
            style={{ justifySelf: 'center', justifyContent: 'center' }}
          />
        </Center>
      )}
    </Container>
  );

  function Body() {
    return (
      <SimpleGrid
        //   columns={{ base: 1, lg: 2 }}
        //   spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Stack spacing={{ base: 10, md: 10 }}>
          <Box as={'header'}>
            <HStack>
              <Badge colorScheme={type == 'Product' ? 'blue' : 'red'}>
                <Text
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={600}
                  fontSize={'2xl'}
                >
                  {type} Order
                </Text>
              </Badge>
            </HStack>
            <Heading
              width={'auto'}
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              // fontSize={'md'}
              // fontWeight={500}
              bg={useColorModeValue('green.50', 'green.900')}
              marginTop={5}
              p={2}
              px={3}
              color={'green.500'}
              rounded={'full'}
            >
              {formatter.format(price)}
            </Heading>
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontWeight={600}
              fontSize={'4xl'}
            >
              {name}
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
            {/* <ItemList items={items} status={status} callback={() => { setRefreshStateTracker(!refreshStateTracker) }} /> */}
            <DataTable
              title={
                <>
                  Order Items
                  <NewItem
                    categories={category}
                    id={param.id + ''}
                    callback={function (): void {
                      setRefreshStateTracker(!refreshStateTracker);
                    }}
                  />
                  <PrintIvoice
                    id={param.id + ''}
                    callback={function (): void {
                      setRefreshStateTracker(!refreshStateTracker);
                    }}
                    units={items}
                  />
                </>
              }
              columns={columns}
              data={items}
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
           
            <DataTable
              title={
                <>
                  Project Documents
                  <NewDocument
                    categories={category}
                    id={param.id + ''}
                    callback={function (): void {
                      setRefreshStateTracker(!refreshStateTracker);
                    }}
                  />
                </>
              }
              columns={doccolumns}
              data={documents}
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

            <Tooltip label={'Documents'}>
              <Box
                maxW={'100%'}
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
                  align={'flex-start'}
                >
                  <Text
                    fontSize={'md'}
                    fontWeight={500}
                    bg={useColorModeValue('orange.50', 'orange.900')}
                    p={2}
                    px={3}
                    color={'orange.500'}
                    rounded={'full'}
                  >
                    Project Details
                  </Text>
                </Stack>

                <Box
                  bg={useColorModeValue('gray.50', 'gray.900')}
                  px={6}
                  py={1}
                >
                  <HStack m={2}>
                    {/* Request Letter */}
                    <Detail
                      component={
                        <AddContengency
                          id={`${param.id}`}
                          initialvalue={contingency}
                          callback={() =>
                            setRefreshStateTracker(!refreshStateTracker)
                          }
                          projecttotal={price}
                        />
                      }
                      label={'Contengency'}
                      tooltip={'Manage Contengency'}
                      isSet={contingency}
                      value={contingency}
                      type="%"
                    />

                    <Detail
                      component={
                        <WorkmanShip
                          id={`${param.id}`}
                          initialvalue={workmanship}
                          callback={() =>
                            setRefreshStateTracker(!refreshStateTracker)
                          }
                          projecttotal={price}
                        />
                      }
                      label={'Workmanship'}
                      tooltip={'Manage Workmanship'}
                      isSet={workmanship}
                      value={workmanship}
                      type="GMD"
                    />
                  </HStack>
                </Box>
              </Box>
            </Tooltip>

            <Category
              items={category}
              callback={() => setRefreshStateTracker(!refreshStateTracker)}
            />

            <Payments
              items={payments}
              tooltip={'Incoming Payments'}
              callback={() => {
                setRefreshStateTracker(!refreshStateTracker);
              }}
            />
            <Expenditure
              items={expenditure}
              tooltip={'Incured Expenditure'}
              callback={() => {
                setRefreshStateTracker(!refreshStateTracker);
              }}
            />
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            disabled={completioncert == null ? true : false}
            bg={useColorModeValue(
              status == 0 ? 'green.900' : 'red.900',
              'gray.50'
            )}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
            onClick={() => {
              updateStatus();
            }}
          >
            {'Complete Order'}
          </Button>
        </Stack>
      </SimpleGrid>
    );
  }
}
