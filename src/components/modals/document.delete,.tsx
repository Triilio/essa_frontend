import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function RemoveDocument({ id, note, name, file, callback }: { id: String, note: String, name:String, file:String, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isloading, setIsloading] = useState(false);
  const param = useParams();
  
  
  
  const appContext = useContext(AppContext);
  var apiProvider = new AuthApiProvider();

  return (
    <>
        <Tooltip label="Delete Document">
      <Button m={1} onClick={onOpen} leftIcon={<DeleteIcon />} colorScheme='red' size='sm' />
          </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove this document, <br/>
            <strong>Name</strong>: {name} <br/>
            <strong>file</strong>: {file} <br/>
            <strong>Note</strong>: {note} <br/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' onClick={()=>{
              apiProvider.removeDocument({id:param.id,documentid:id}).then((data)=>{
                appContext.setModalState({simplemodal : {isOpen:true,icon:null,title:"Success", message:"Document was Successfully Deleted"}});
                onClose()
                callback()
              }).catch(()=>{
                appContext.setModalState({simplemodal : {isOpen:true,icon:null,title:"ERROR", message:id+" An error occured, please try again."}});
              })
            }} >Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RemoveDocument; 