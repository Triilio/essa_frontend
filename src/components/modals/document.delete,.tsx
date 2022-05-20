import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function RemoveDocument({ id, note, amount, date, callback }: { id: String, note: String, amount: Number, date: Date, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isloading, setIsloading] = useState(false);
  const param = useParams();
  
  
  
  const appContext = useContext(AppContext);
  var apiProvider = new AuthApiProvider();

  return (
    <>
        <Tooltip label="Delete Expenditure Record">
      <Button m={1} onClick={onOpen} leftIcon={<DeleteIcon />} colorScheme='red' size='sm' />
          </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Expenditure</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove this payment, <br/>
            <strong>Amount</strong>: {amount} <br/>
            <strong>Date</strong>: {date} <br/>
            <strong>Note</strong>: {note} <br/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' onClick={()=>{
              apiProvider.removeDocument({id:param.id,documentid:id}).then((data)=>{
                appContext.setModalState({simplemodal : {isOpen:true,icon:null,title:"Success", message:"Expenditure was Successfully Removed"}});
                onClose()
                callback()
              }).catch(()=>{
                appContext.setModalState({simplemodal : {isOpen:true,icon:null,title:"ERROR", message:"An error occured, please try again."}});
              })
            }} >Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RemoveDocument; 