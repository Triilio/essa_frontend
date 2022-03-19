import {
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { AuthApiProvider } from '../../../../providers/api.provider';
import AppContext from '../../../../utils/context';

import Header from './header';
import Amount from './amount';
import Billing from './billing';
import Footer from './footer';
import Approved from './approved';
import Category from './category';

function Complete() {

  // data
  const [address, setAddress] = useState<String>();
  const [date, setDate] = useState<Date>();
  const [invoiceid, setInvoiceid] = useState<String>();
  const [customer, setCustomer] = useState<String>();
  return (
    <>
      <Header />
      <Billing customer={customer} date={date} invoiceid={invoiceid} address={address} />
      <Category />
      <Amount />
      <Approved />
      <Footer />
    </>
  );
}

export default Complete;
