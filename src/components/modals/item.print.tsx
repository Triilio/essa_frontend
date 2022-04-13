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

function PrintIvoice({
  id,
  name,
  price,
  marketprice,
  units,
  supplier,
  description,
  callback,
}: {
  id: String;
  name: string;
  price: number;
  marketprice: number;
  units: Object[];
  supplier: string;
  description: string;
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

  const btnRef = React.useRef();
  const [isloading, setIsloading] = useState(false);

  var apiProvider = new AuthApiProvider();
  const appContext = useState(AppContext);

  var componentRef: any = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <Ui
          name={name}
          price={price}
          marketprice={marketprice}
          units={units}
          supplier={supplier}
          description={description}
        />
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
              <MenuItem onClick={onOpenInvoice}>Invoice</MenuItem>
              <MenuItem onClick={onOpenBoq}>Bill Of Quantity</MenuItem>
            </MenuGroup>
          </MenuList>
        </Portal>
      </Menu>

      <Modal isOpen={isOpenInvoice} onClose={onCloseInvoice} size={'3xl'}>
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
    </>
  );
}

export default PrintIvoice;
