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
import React, { useState } from 'react';
import { CheckIcon, DownloadIcon } from '@chakra-ui/icons';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import Complete from '../sections/pdfs/invoice/complete';

function PrintIvoice({ id, callback }: { id: String; callback: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [isloading, setIsloading] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [marketprice, setMarketPrice] = useState(0);
  const [units, setUnits] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');

  var apiProvider = new AuthApiProvider();
  const appContext = useState(AppContext);

  return (
    <>
      <Button
        m={1}
        onClick={onOpen}
        leftIcon={<DownloadIcon />}
        colorScheme="teal"
        size="md"
      >
        Print Invoice
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Complete />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                // setIsloading(!isloading);
                // apiProvider
                //   .newItem({
                //     id: id,
                //     name: name,
                //     description: description,
                //     price: { price: price, market_price: marketprice },
                //     units: units,
                //     supplier: supplier,
                //   })
                //   .then(data => {
                //     alert('item was succesfully added.');
                //     callback();
                //     onClose();
                //   })
                //   .catch(() => {
                //     alert('An error Occured, please try again');
                //     setIsloading(!isloading);
                //   });
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrintIvoice;
