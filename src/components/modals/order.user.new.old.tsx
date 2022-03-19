import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { useParams } from 'react-router-dom';

function NewOrder({callback}:{callback:()=>void}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isloading, setIsloading] = useState(false);
  const param = useParams();

  
  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);
  


  return (
    <>
      <Button onClick={onOpen} leftIcon={<BiAddToQueue />} colorScheme='teal' size='md' >Create Order For This User</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // initialFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create New Order</DrawerHeader>
          <DrawerBody>
            <FormControl isRequired>
              <FormLabel htmlFor='first_name'>Order Name</FormLabel>
              <Input id='order_name' onChange={(e)=>setName(e.target.value)} placeholder='Order Name' />
            </FormControl>
            <FormControl >
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Textarea id='description' onChange={(e)=>setDescription(e.target.value)} placeholder='Order description' />
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={isloading} onClick={async ()=>{
              setIsloading(true);
              apiProvider.CreateOrderForCurrentUser(name, description, param.id,",","").then((data)=>{
                alert("new order successfully added")
                console.log(data)
                callback();
                onClose();
              }).catch((error)=>{
                alert("error occured")
              }).finally(()=>{
                setIsloading(false);
              }); 
            }} colorScheme='blue'>Create</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NewOrder; 