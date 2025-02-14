import { Alert, Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState, useContext, useRef } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { useToast } from '@chakra-ui/react'

function NewExpenditure({ id, callback }: { id: string, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [isloading, setIsloading] = useState(false);

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [note, setNote] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  // const [formData, setFormData] = useState<FormData | undefined>();
  let formData = new FormData();
  const toast = useToast()
  const hiddenFileInput = useRef(null);


  var apiProvider = new AuthApiProvider()
  const appContext = useContext(AppContext);

  return (
    <>
      <Button
      onClick={onOpen} 
      leftIcon={<BiAddToQueue />}
          mt={10}
          w={'300px'}
          bg={'red.400'}
          color={'white'}
          rounded={'xl'}
          boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
          _hover={{
            bg: 'red.500',
          }}
          _focus={{
            bg: 'red.500',
          }}>
          Add Expenditure
        </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Expenditure</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel htmlFor='title'>Title</FormLabel>
              <Input id='title' type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='title' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='name'>Amount</FormLabel>
              <Input id='amount' type="number" onChange={(e)=>setAmount(Number.parseInt(e.target.value))} placeholder='Amount, eg 20 000' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='units'>Date</FormLabel>
              <Input id='date' type={"date"} onChange={(e)=>setDate(new Date(e.target.value))} placeholder='Number of units' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='expenditure_note'>Note</FormLabel>
              <Textarea id='expenditure_note' onChange={(e)=>setNote(e.target.value)} placeholder='Expenditure Note' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='expenditure_file'>Reciept</FormLabel>
              <InputGroup>
              <InputLeftAddon children='File' />
              <Input type='file' multiple ref={hiddenFileInput}
                style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }} onChange={(e) => {
                  // Update the formData object  
                  
                  for(var x = 0; x < e!.target!.files!.length; x++) {
                    console.log(e!.target!.files![x])
                    formData.append(
                      `files-${x}`,
                      e!.target!.files![x],
                      e!.target!.files![x]!.name);
                    }

                }} />
            </InputGroup>
          </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' 
            onClick={() => {
              if(!title || !note || !amount || !formData || !date){
                toast({
                  title: 'Incomplete Data',
                  description: "Please submit all required fields",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                })
                return;
              }
              setIsloading(!isloading)
              formData?.append('orderid',id);
              formData?.append('date',date!.toString());
              formData?.append('note',note!);
              formData?.append('title',title!);
              formData?.append('amount',amount!.toString());
              apiProvider.addExpenditure(formData).then((data)=>{
                callback();
                appContext.setModalState({simplemodal : {isOpen:true,icon:null,title:"Success", message:"Expenditure was Successfully Added"}});
                onClose()
              }).catch((error)=>{
                console.log(error)
                appContext.setModalState({simplemodal : {isOpen:true,icon:null,title:"ERROR", message:"an error occured, please try again."}});
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

export default NewExpenditure; 