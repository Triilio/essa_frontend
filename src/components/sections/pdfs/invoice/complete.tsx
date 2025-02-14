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
import React, { useEffect, useState, useRef } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { AuthApiProvider } from '../../../../providers/api.provider';
import AppContext from '../../../../utils/context';

import Header from './header';
import Amount from './amount';
import Billing from './billing';
import Footer from './footer';
import Approved from './approved';
import Category from './category';

function Complete({
  name,
  price,
  marketprice,
  units,
  supplier,
  description,
}: {
  name: string;
  price: number;
  marketprice: number;
  units: Object[];
  supplier: string;
  description: string;
}) {
  // data
  const [address, setAddress] = useState<String>();
  const [date, setDate] = useState<Date>();
  const [invoiceid, setInvoiceid] = useState<String>();
  const [customer, setCustomer] = useState<String>();
  const [list, setList] = useState<JSX.Element[]>();

  useEffect(() => {
    // getting the list of categories
    var tempObject: any[] = [];
    var anotherTempObject: any = {};

    units.forEach((element: any) => {
      if (tempObject.includes(element.category)) {
        anotherTempObject[element.category].push(element);
      } else {
        tempObject.push(element.category);
        anotherTempObject[element.category] = [];
        anotherTempObject[element.category][0] = element;
      }
    });
    var tempList = [];
    for (var key in anotherTempObject) {
      if (anotherTempObject.hasOwnProperty(key)) {
        // just so i can sleep at night.
        tempList.push(<Category  data={anotherTempObject[key]} />);
      }
    }

    setList(tempList);
  }, []);

  const UI = () => {
    return (<>
      <Header />
      <Billing
        customer={customer}
        date={date}
        invoiceid={invoiceid}
        address={address}
        />
        {list?.map(e => {
          return e;
        })}
      <Amount
        subtotal={100000}
        contingency={1222222}
        workmanship={12312312}
        total_due={12311232}
      />
      <Approved />
      <Footer />
    </>);
  };
  return <UI />;
}

export default Complete;
