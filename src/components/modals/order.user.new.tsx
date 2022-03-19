import { Alert, Select, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { useParams } from 'react-router-dom';

function NewOrder({  callback }: {  callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isloading, setIsloading] = useState(false);

  const btnRef = React.useRef()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ordertype, setOrderType] = useState('');
  const [company, setCompany] = useState('');
  const param = useParams();
  const id = param.id;


  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);
  return (
    <>
      <Button m={1} onClick={onOpen} leftIcon={<BiAddToQueue />} colorScheme='teal' size='md' >New Order </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Order For User {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor='first_name'>Order Name</FormLabel>
              <Input id='order_name' onChange={(e) => setName(e.target.value)} placeholder='Order Name' />
            </FormControl>
            <FormControl >
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Textarea id='description' onChange={(e) => setDescription(e.target.value)} placeholder='Order description' />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='order_type'>Order Type</FormLabel>
              <Select w="100%" borderColor='teal' onChange={(e) => {
                setOrderType(e.target.value)
              }}>
                <option selected value='Service'>Service</option>
                <option value='Product'>Product</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='order_type'>Company</FormLabel>
              <Select w="100%" borderColor='teal' onChange={(e) => {
                  setCompany(e.target.value)
              }}>
                <option selected value='isa'>ISA</option>
                <option  value='datu_trading'>DARU TRADING</option>
                <option value='express_logistics'>XPRESS LOGISTICS</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={() => {
              setIsloading(true);
              const dataa = {name, description, as:param['id'], ordertype, company};
              apiProvider.CreateOrderForCurrentUser(name, description, param.id, ordertype, company).then((data) => {
                alert("new order successfully added")
                console.log(data)
                callback();
                onClose();
              }).catch((error) => {
                alert("error occured")
              }).finally(() => {
                setIsloading(false);
              });
            }}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewOrder; 