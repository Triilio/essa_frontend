import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';

function EditItem({ id, callback }: { id: String, callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [price, setPrice] = useState(0);
  const [units, setUnits] = useState('');
  const [isloading, setIsloading] = useState(false);



  var apiProvider = new AuthApiProvider()
  const appContext = useState(AppContext);



  return (
    <>
      <Tooltip label="Edit Item">
      <Button m={1} onClick={onOpen} leftIcon={<EditIcon />} colorScheme='teal' size='sm' />
          </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel htmlFor='units'>Number of Units</FormLabel>
              <Input id='units' onChange={(e)=>setUnits(e.target.value)} placeholder='Number of units' />
          </FormControl>
          {/* <FormControl isRequired>
              <FormLabel htmlFor='price'>Price per Units</FormLabel>
              <Input id='price' type="tel" onChange={(e)=>setPrice(Number.parseInt(e.target.value))} placeholder='Price per Unit' />
          </FormControl> */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditItem; 