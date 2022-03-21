import { Alert, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function NewCategory({ id, callback }: { id: String, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setIsloading] = useState(false);

  const [name, setName] = useState<String | undefined>(undefined);
  const [description, setDescription] = useState<String | undefined>(undefined);



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
          New Category
        </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <Input id='name' type="text" onChange={(e)=>setName(e.target.value)} placeholder='Item Name' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='text'>Description</FormLabel>
              <Input id='text' type={"text"} onChange={(e)=>setDescription(e.target.value)} placeholder='Number of units' />
          </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' 
            onClick={() => {
              setIsloading(!isloading)
              apiProvider.addCategory({orderid:id,name:name, description:description,}).then((data)=>{
                alert("Category was succesfully added.")
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

export default NewCategory; 