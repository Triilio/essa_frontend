import { Alert, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function NewPayment({ id, callback }: { id: String, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [isloading, setIsloading] = useState(false);

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [note, setNote] = useState<String | undefined>(undefined);



  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);



  return (
    <>
      <Button
      onClick={onOpen} 
      leftIcon={<BiAddToQueue />}
          mt={10}
          w={'300px'}
          bg={'green.400'}
          color={'white'}
          rounded={'xl'}
          boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
          _hover={{
            bg: 'green.500',
          }}
          _focus={{
            bg: 'green.500',
          }}>
          Add Payment
        </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel htmlFor='name'>Amount</FormLabel>
              <Input id='amount' type="number" onChange={(e)=>setAmount(Number.parseInt(e.target.value))} placeholder='Item Name' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='units'>Date</FormLabel>
              <Input id='date' type={"date"} onChange={(e)=>setDate(new Date(e.target.value))} placeholder='Number of units' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='payment_note'>Note</FormLabel>
              <Textarea id='payment_note' onChange={(e)=>setNote(e.target.value)} placeholder='Payment Note' />
          </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' 
            onClick={() => {
              setIsloading(!isloading)
              apiProvider.addPayment({orderid:id,amount:amount, date:date, note:note}).then((data)=>{
                alert("Payment was succesfully added.")
                callback();
                onClose()
              }).catch((error)=>{
                console.log(error)
                alert("An error Occured, please try again")
                setIsloading(!isloading)
              });
            }}>
              Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewPayment; 