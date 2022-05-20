import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useContext, useRef } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { ButtonGroup } from '@chakra-ui/react';

function NewDocument({
  categories,
  id,
  callback,
}: {
  categories: Object[];
  id: string;
  callback: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setIsloading] = useState(false);
  
  const [note, setNote] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  // const [formData, setFormData] = useState<FormData | undefined>();
  let formData = new FormData();
  const toast = useToast()
  const hiddenFileInput = useRef(null);


  var apiProvider = new AuthApiProvider();
  const appContext = useContext(AppContext);

  return (
    <>
      <Button
        m={1}
        onClick={onOpen}
        leftIcon={<BiAddToQueue />}
        colorScheme="teal"
        size="md"
      >
        Upload a Document
      </Button>
      <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Add a new document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
              <FormLabel htmlFor='title'>Title</FormLabel>
              <Input id='title' type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='Title' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='note'>Note</FormLabel>
              <Textarea id='note' onChange={(e)=>setNote(e.target.value)} placeholder='Notes' />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor='project_file'>file</FormLabel>
              <InputGroup>
              <InputLeftAddon children='File' />
              <Input type='file' ref={hiddenFileInput}
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
              if(!title || !note || !formData ){
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
              formData?.append('name',title!);
              formData?.append('note',note!);
              apiProvider.addDocument(formData).then((data)=>{
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
  );
}

export default NewDocument;
