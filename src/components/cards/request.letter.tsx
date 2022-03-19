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
} from '@chakra-ui/react';
import { CheckIcon, InfoIcon } from '@chakra-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { useParams } from 'react-router-dom';

export default function RequestLetter({ requestdo, callback }: { requestdo: any, callback: () => void }) {
  const hiddenFileInput = useRef(null);
  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);
  const param = useParams();

  const [requestLetterAdded, setRequestLetterAdded] = useState(false);
  const [formData, setFormData] = useState<FormData>();


  useEffect(() => {
    console.log("requestdo", requestdo);
  }, [])

  const uploadFile = () => {
    apiProvider.addPayment({ url: '/orders/payments/', formData: formData }).then((data) => {
      callback(); // refresh parent
    }).catch((error) => {
      console.log(error);
      alert("Error Occured");
    })
  }
  return (
    <Box
      maxW={'330px'}
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
        align={'center'}
      >
        <Text
          fontSize={'md'}
          fontWeight={500}
          bg={useColorModeValue('green.50', 'green.900')}
          p={2}
          px={3}
          color={'green.500'}
          rounded={'full'}>
          Request Letter
        </Text>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Text fontSize={'4xl'} fontWeight={800} textColor={requestdo ? 'green' : 'red'}>
            {requestdo ? <>ASSIGNED</> : <>NOT SET</>}
          </Text>
        </Stack>
      </Stack>

      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={1}>
        <List spacing={3}>
          <ListItem>

            <InputGroup>
              <InputLeftAddon children='File' />
              <Input type='file' ref={hiddenFileInput}
                style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }} onChange={(e) => {
                  // Update the formData object 
                  console.log("added a new thing");
                  let localForm = new FormData();

                  localForm.append(
                    "requestdoc",
                    e!.target!.files![0],
                    e!.target!.files![0].name
                  );
                  localForm.append(
                    'doc',
                    'requestletter',
                  );
                  localForm.append(
                    'id',
                    param.id + "",
                  );
                  setFormData(localForm);
                  setRequestLetterAdded(true);
                }} />
            </InputGroup>

          </ListItem>
          <ListItem>
            <ListIcon as={InfoIcon} color="green.400" />
            upload a request letter
          </ListItem>
        </List>

        <Button
          mt={10}
          w={'full'}
          bg={'green.400'}
          color={'white'}
          disabled={!requestLetterAdded}
          onClick={() => uploadFile()}
          rounded={'xl'}
          boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
          _hover={{
            bg: 'green.500',
          }}
          _focus={{
            bg: 'green.500',
          }}>
          Add Request Letter
        </Button>
      </Box>
    </Box>
  );
}


