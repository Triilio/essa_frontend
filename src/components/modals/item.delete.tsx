import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function RemoveItem({ id, name, price, callback }: { id: String, name: String, price: Number, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isloading, setIsloading] = useState(false);
  const param = useParams();


  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);

  return (
    <>
        <Tooltip label="Delete Item">
      <Button m={1} onClick={onOpen} leftIcon={<DeleteIcon />} colorScheme='red' size='sm' />
          </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />  
          <ModalBody>
            Are you sure you want to remove this item: ({name} at {price} per unit)
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' onClick={()=>{
              apiProvider.deleteItem({id:param.id,itemid:id}).then((data)=>{
                onClose()
                callback()
              }).catch(()=>{
                alert("An error occured, please try again");
              })
            }} >Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RemoveItem; 