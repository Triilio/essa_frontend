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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  BiAddToQueue,
  BiCloudUpload,
  BsCloud,
  MdDoneAll,
  MdDone,
} from 'react-icons/all';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddContengency({
  id,
  initialvalue,
  projecttotal,
  callback,
}: {
  id: String;
  initialvalue: Number;
  projecttotal: Number;
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
  const [value, setValue] = useState<number>(initialvalue as number); //

  const [newTotal, setNewTotal] = useState<number>(projecttotal as number); // project total
  const [newValue, setNewValue] = useState<number>(0); //

  var apiProvider = new AuthApiProvider();
  const appContext = useState(AppContext);

  useEffect(() => {
    //  calculateting new total
    var s =
      (Number.parseFloat(projecttotal.toString()) / 100) *
      Number.parseFloat(value.toString());

    var newtotal1 = Number.parseFloat(projecttotal.toString()) + s;

    setNewTotal(newtotal1);
    setNewValue(s);
  }, [value]);

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
        Edit
      </Button>

      <Modal
        size={'lg'}
        isOpen={isOpenEdit}
        onClose={() => {
          callback();
          onCloseEdit();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a project CONTINGENCY percentage</ModalHeader>
          <ModalHeader>
            {/* {isloading ? (
              <BiCloudUpload color="green" />
            ) : (
              <BsCloud color="green" />
            )} */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StatGroup>
              <Stat>
                <StatLabel>Project Total</StatLabel>
                <StatNumber>{newTotal}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {value} %
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Value</StatLabel>
                <StatNumber>{newValue}</StatNumber>
              </Stat>
            </StatGroup>
            <FormControl isRequired>
              <NumberInput
                allowMouseWheel
                // step={0.5}
                defaultValue={value}
                // value={3}
                // placeholder={value.toString()}
                min={0}
                max={50}
                onChange={e => setValue(e as unknown as number)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper
                  // onClick={() => {
                  //   setValue((value as number) - 0.5);
                  // }}
                  />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onCloseEdit}>
              Cancel
            </Button>
            <Button
              colorScheme={'blue'}
              onClick={() => {
                setIsloading(!isloading);
                apiProvider
                  .updateConttingency({ id: id, update: value })
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
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddContengency;
