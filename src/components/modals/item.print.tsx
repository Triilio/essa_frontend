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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Portal,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { CheckIcon, DownloadIcon } from '@chakra-ui/icons';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import Complete from '../sections/pdfs/invoice/complete';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import Ui from '../sections/pdfs/invoice/ui';
var converter = require('number-to-words');


function PrintIvoice({
  id,
  units,
  callback,
}: {
  id: String;
  units: Object[];
  callback: () => void;
}) {
  const {
    isOpen: isOpenInvoice,
    onOpen: onOpenInvoice,
    onClose: onCloseInvoice,
  } = useDisclosure();
  const {
    isOpen: isOpenBoq,
    onOpen: onOpenBoq,
    onClose: onCloseBoq,
  } = useDisclosure();

  var componentRef: any = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [version, setVersion] = useState('');

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <Ui ver={version}/>
      );
    }
  }

  return (
    <>
      <Menu>
        <MenuButton as={Button} colorScheme="pink">
          Print
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuGroup title="Printable Documents">
              <MenuItem onClick={() => {setVersion('invoice'); onOpenInvoice();}}>Invoice</MenuItem>
              <MenuItem onClick={() => {setVersion('bill');onOpenBoq();}}>Bill Of Quantity</MenuItem>
            </MenuGroup>
          </MenuList>
        </Portal>
      </Menu>

      <Modal isOpen={isOpenInvoice} onClose={onCloseInvoice} size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ComponentToPrint ref={componentRef} />
            {/* <ComponentToPrint ref={el => (componentRef = el)} /> */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseInvoice}>
              Cancel
            </Button>
            <Button
              m={1}
              // leftIcon={<DownloadIcon />}
              colorScheme="teal"
              size="md"
              onClick={handlePrint}
            >
              Print Invoice
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenBoq} onClose={onCloseBoq} size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>BILL OF QUANTITY {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ComponentToPrint ref={componentRef} />
            {/* <ComponentToPrint ref={el => (componentRef = el)} /> */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseBoq}>
              Cancel
            </Button>
            <Button
              m={1}
              // leftIcon={<DownloadIcon />}
              colorScheme="teal"
              size="md"
              onClick={handlePrint}
            >
              Print Bill of Quantity
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrintIvoice;
