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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import { ButtonGroup } from '@chakra-ui/react';

function NewItem({
  categories,
  id,
  callback,
}: {
  categories: Object[];
  id: String;
  callback: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [isloading, setIsloading] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [marketprice, setMarketPrice] = useState(0);
  const [units, setUnits] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<String | null>(null);

  var apiProvider = new AuthApiProvider();
  const appContext = useState(AppContext);

  return (
    <>
      <Button
        m={1}
        onClick={onOpen}
        leftIcon={<BiAddToQueue />}
        colorScheme="teal"
        size="md"
      >
        New Item{' '}
      </Button>
      <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Item {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Item Name</FormLabel>
              <Input
                id="name"
                type="name"
                onChange={e => setName(e.target.value)}
                placeholder="Item Name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Item Category</FormLabel>
              {/* <Input id='name' type="ses" onChange={(e)=>setName(e.target.value)} placeholder='Item Name' /> */}
              <Select
                placeholder="Select option"
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map((value: any) => {
                  return <option value={value._id}>{value.name}</option>;
                })}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="units">Quantity</FormLabel>
              <NumberInput
                id="units"
                onChange={e => setUnits(e)}
                placeholder="Number of units"
                defaultValue={1}
                min={1}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="supplier">Item Supplier</FormLabel>
              <Input
                id="supplier"
                onChange={e => setSupplier(e.target.value)}
                placeholder="Item Supplier"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="price">Market Price / Unit</FormLabel>
              <Input
                id="price"
                type="number"
                onChange={e => setMarketPrice(Number.parseInt(e.target.value))}
                placeholder="Price per Unit supplier is charging"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="price">Charged Price / Unit</FormLabel>
              <Input
                id="marketprice"
                type="number"
                onChange={e => setPrice(Number.parseInt(e.target.value))}
                placeholder="Price per Unit you are charging"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="description">Item Description</FormLabel>
              <Textarea
                id="description"
                onChange={e => setDescription(e.target.value)}
                placeholder="Item Description"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsloading(!isloading);
                if (!category) {
                  alert('Please select an item category');
                  return;
                }
                apiProvider
                  .newItem({
                    name: name,
                    description: description,
                    price: { price: price, market_price: marketprice },
                    units: units,
                    supplier: supplier,
                    category: category,
                  })
                  .then(data => {
                    alert('item was succesfully added.');
                    callback();
                    onClose();
                  })
                  .catch(() => {
                    alert('An error Occured, please try again');
                    setIsloading(!isloading);
                  });
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

export default NewItem;
