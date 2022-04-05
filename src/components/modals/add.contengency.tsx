import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiAddToQueue, BiCloudUpload, BsCloud, MdDoneAll, MdDone } from 'react-icons/all';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { nodeModuleNameResolver, parseCommandLine } from 'typescript';

function AddContengency({
  id,
  initialvalue,
  callback,
}: {
  id: String;
  initialvalue: string | null;
  callback: () => void;
}) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenPreview,
    onOpen: onOpenPreview,
    onClose: onClosePreview,
  } = useDisclosure();
  const btnRef = React.useRef();
  const [isloading, setIsloading] = useState(false);
  const [value, setValue] = useState<any>('');

  const [title, setTitle] = useState<String>();
  const [content, setContent] = useState<Array<String>>(['']);

  var [keystrokecount, setKeystrokecount] = useState(0);

  var apiProvider = new AuthApiProvider();
  const appContext = useState(AppContext);
 
  useEffect(() => {
    setValue(initialvalue!);
  },[initialvalue])

  return (
    <>
      <Button
        bg={'green.400'}
        color={'white'}
        onClick={onOpenEdit}
        size="md"
        rounded={'xl'}
        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
        _hover={{
          bg: 'green.500',
        }}
        _focus={{
          bg: 'green.500',
        }}
      >
        Generate
      </Button>

      <Modal size={'3xl'} isOpen={isOpenEdit} onClose={() => {postData(); callback(); onCloseEdit()}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a project CONTINGENCY percentage</ModalHeader>
          <ModalHeader>{isloading ? <BiCloudUpload color='green'/> : <BsCloud color='green'/> }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={e => {
                  setValue(e);
                  console.log(e)
                  console.log(keystrokecount)
                  if (keystrokecount > 10) {
                    //  upload the new content
                    setKeystrokecount(0);
                    postData();
                  } else {
                    setKeystrokecount(keystrokecount + 1);
                  }
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onCloseEdit}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsloading(!isloading);
                apiProvider
                  .uploadDoc({})
                  .then(data => {
                    alert('item was succesfully added.');
                    callback();
                    onCloseEdit();
                  })
                  .catch(() => {
                    alert('An error Occured, please try again');
                    setIsloading(!isloading);
                  });
              }}
            >
              Done
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );


  function postData() {
    setIsloading(true);
    apiProvider
      .uploadDoc({ name: 'requestdoc', id: id, content: value })
      .then(data => {
        setIsloading(false);
      })
      .catch(e => {
        setIsloading(false);
        // alert('An error Occured, p try again');
        console.log(e);
      });
  }
}

export default AddContengency;
