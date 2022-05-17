import { Button, Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Textarea, useDisclosure, InputLeftAddon, InputGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function NewClient({ callback }: { callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [businessname, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setphone] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [address, setAddress] = useState<String>();
  const [isloading, setIsloading] = useState(false);


  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);



  return (
    <>
      <Button onClick={onOpen} leftIcon={<BiAddToQueue />} colorScheme='teal' size='md' >New Client</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      // initialFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new client</DrawerHeader>
          <DrawerBody>
            <FormControl isRequired>
              <FormLabel htmlFor='businessname'>Business Name</FormLabel>
              <Input id='businessname' onChange={(e) => setBusinessName(e.target.value)} placeholder='Business Name' />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='contact_name'>Contact Name</FormLabel>
              <Input id='contact_name' onChange={(e) => setContactName(e.target.value)} placeholder="Contact Person's name" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='phone_number'>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon children='+220' />
              <Input id='phone_number' type='tel' onChange={(e) => setphone(e.target.value)} placeholder="Official Phone Number" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input id='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='email'>Address</FormLabel>
              <Textarea id='address' onChange={(e) => setAddress(e.target.value)} placeholder="eg, Bakau Cape Point, 1324 Street" />
            </FormControl>
            <Text p={3} size={"5px"}>
              The user will be send an email invitation to login to the system.
            </Text>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={isloading} onClick={async () => {
              setIsloading(true);
              apiProvider.createClient({ businessname: businessname, name: contactName, phone: phone, email: email, address: address }).then((data) => {
                alert("User Successfully created")
                console.log(data)
                callback();
                onClose();
              }).catch((error) => {
                alert("error occured")
              }).finally(() => {
                setIsloading(false);
              });
            }} colorScheme='blue'>Create</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NewClient; 