import { Alert, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function NewItem({ id, callback }: { id: String, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [isloading, setIsloading] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [marketprice, setMarketPrice] = useState(0);
  const [units, setUnits] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');



  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);



  return (
    <>
      <Button m={1} onClick={onOpen} leftIcon={<BiAddToQueue />} colorScheme='teal' size='md' >New Item </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Item {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel htmlFor='name'>Item Name</FormLabel>
              <Input id='name' type="name" onChange={(e)=>setName(e.target.value)} placeholder='Item Name' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='units'>Quantity</FormLabel>
              <Input id='units' onChange={(e)=>setUnits(e.target.value)} placeholder='Number of units' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='supplier'>Item Supplier</FormLabel>
              <Input id='supplier' onChange={(e)=>setSupplier(e.target.value)} placeholder='Item Supplier' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='price'>Market Price / Unit</FormLabel>
              <Input id='price' type="number" onChange={(e)=>setMarketPrice(Number.parseInt(e.target.value))} placeholder='Price per Unit supplier is charging' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='price'>Charged Price / Unit</FormLabel>
              <Input id='marketprice' type="number" onChange={(e)=>setPrice(Number.parseInt(e.target.value))} placeholder='Price per Unit you are charging' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='description'>Item Description</FormLabel>
              <Textarea id='description' onChange={(e)=>setDescription(e.target.value)} placeholder='Item Description' />
          </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={() => {
              setIsloading(!isloading)
              apiProvider.newItem({id:id,name:name, description:description,price:{price:price,market_price:marketprice},units:units,supplier:supplier,}).then((data)=>{
                alert("item was succesfully added.")
                callback();
                onClose()
              }).catch(()=>{
                alert("An error Occured, please try again")
                setIsloading(!isloading)
              });
            }}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewItem; 