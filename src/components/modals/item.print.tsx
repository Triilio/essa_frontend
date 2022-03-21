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
import React, { useState } from 'react';
import { CheckIcon, DownloadIcon } from '@chakra-ui/icons';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import Complete from '../sections/pdfs/invoice/complete';

function PrintIvoice({ id, name, price, marketprice, units,  supplier,  description, callback }:
   { id: String; 
    name:string; 
    price:number; 
    marketprice:number; 
    units:Object[];  
    supplier:string;  
    description:string;
    callback: () => void }) {

  const { isOpen: isOpenInvoice, onOpen: onOpenInvoice, onClose: onCloseInvoice } = useDisclosure();
  const { isOpen: isOpenBoq, onOpen: onOpenBoq, onClose: onCloseBoq } = useDisclosure();

  const btnRef = React.useRef();
  const [isloading, setIsloading] = useState(false);


  var apiProvider = new AuthApiProvider();
  const appContext = useState(AppContext);

  return (
    <>
      {/* <Button
        m={1}
        onClick={onOpen}
        leftIcon={<DownloadIcon />}
        colorScheme="teal"
        size="md"
      >
        Print Invoice
      </Button> */}
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
            <Complete name={name} price={price} marketprice={marketprice} units={units} supplier={supplier} description={description} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseInvoice}>
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
