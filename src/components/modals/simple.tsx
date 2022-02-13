import React, { useContext } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
  } from '@chakra-ui/react'
  import AppContext from '../../utils/context'

  const SimpleModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const appContext = useContext(AppContext);

    return (
      <>

        <Modal isOpen={appContext.modalstate.simplemodal.isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{appContext.modalstate.simplemodal.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {appContext.modalstate.simplemodal.icon}
                {appContext.modalstate.simplemodal.message}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>{
                  appContext.modalstate.simplemodal = {isOpen:false,icon:null,title:"Success", message:"Signup Operation Successfull"};
              }}>
                Close
              </Button>
              {/* <Button variant='ghost'>Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default SimpleModal;