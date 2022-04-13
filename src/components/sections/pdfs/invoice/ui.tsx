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

function Ui({
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

  var subtotal = 100000;
  var contingency = 1222222;
  var total_due = 12311232;
  var workmanship = 12312312;

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
        tempList.push(<Category name={key} items={anotherTempObject[key]} />);
      }
    }

    setList(tempList);
  }, []);

  const UI = () => {
    return (
      <>
        <table
          style={{ borderCollapse: 'collapse', marginLeft: '5.4pt' }}
          cellSpacing={0}
        >
          {/* Headers */}
          <tbody>
            <div style={{ borderCollapse: 'collapse', marginLeft: '5.4pt' }}>
              <tr style={{}}>
                <td style={{ width: '222pt' }}>
                  <p
                    className="s1"
                    style={{
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      lineHeight: '34pt',
                      textAlign: 'left',
                    }}
                  >
                    INVOICE
                  </p>
                </td>
                <td style={{ width: '154pt' }}>
                  <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                  </p>
                  <p
                    className="s2"
                    style={{
                      paddingLeft: '8pt',
                      paddingRight: '25pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    Bertil Harding Highway,<span className="s3"> </span>
                    Senegambia, The Gambia.
                  </p>
                  <p
                    className="s2"
                    style={{
                      paddingLeft: '8pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    +220 242-0825 | 220 250- 8572
                  </p>
                </td>
                <td style={{ width: '178pt' }}>
                  <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                  </p>
                  <p
                    style={{
                      paddingLeft: '17pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    <span>
                      <img
                        width={172}
                        height={79}
                        alt="image"
                        src="004-110322BOQ-Version 2/Image_001.png"
                      />
                    </span>
                  </p>
                </td>
              </tr>
              <tr style={{ height: '20pt' }}>
                <td style={{ width: '216pt' }}>
                  <p
                    className="s4"
                    style={{
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    Billed<span className="s5"> to</span>
                  </p>
                </td>
                <td style={{ width: '208pt' }}>
                  <p
                    className="s6"
                    style={{
                      paddingLeft: '18pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    Bill Details
                  </p>
                </td>
              </tr>
              <tr style={{ height: '21pt' }}>
                <td style={{ width: '216pt' }}>
                  <p
                    className="s7"
                    style={{
                      paddingTop: '6pt',
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    {customer}
                  </p>
                </td>
                <td style={{ width: '208pt' }}>
                  <p
                    className="s8"
                    style={{
                      paddingTop: '6pt',
                      paddingLeft: '18pt',
                      textIndent: '0pt',
                      lineHeight: '13pt',
                      textAlign: 'left',
                    }}
                  >
                    Invoiced to &gt;&gt; Invoice #
                    <span style={{ color: '#525252' }}>{invoiceid}</span>
                  </p>
                </td>
              </tr>
              <tr style={{ height: '13pt' }}>
                <td style={{ width: '216pt' }}>
                  <p
                    className="s9"
                    style={{
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    {address}
                  </p>
                </td>
                <td style={{ width: '208pt' }}>
                  <p
                    className="s8"
                    style={{
                      paddingLeft: '18pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    Invoice Date{' '}
                    <span style={{ color: '#525252' }}>{date}</span>
                  </p>
                </td>
              </tr>
            </div>

  {/* Items */}
            {list?.map(e => {
              return e;
            })}

            {/* Billing */}
            <div style={{ borderCollapse: 'collapse', marginLeft: '50%' }}>
              <tr style={{ height: '12pt', paddingTop: '5pt' }}>
                <td style={{}}>
                  <p
                    className="s17"
                    style={{
                      paddingLeft: '5pt',
                      textIndent: '0pt',
                      lineHeight: '10pt',
                      textAlign: 'left',
                    }}
                  >
                    <b>SUB TOTAL:</b>
                  </p>
                </td>
                <td style={{}}>
                  <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                  </p>
                </td>
                <td style={{}}>
                  <p
                    className="s18"
                    style={{
                      paddingLeft: '1pt',
                      textIndent: '0pt',
                      lineHeight: '10pt',
                      textAlign: 'left',
                    }}
                  >
                    GMD 3,915,060.00
                  </p>
                </td>
              </tr>

              <tr style={{ height: '13pt', paddingTop: '5pt' }}>
                <td style={{ width: '100pt' }}>
                  <p
                    className="s17"
                    style={{
                      paddingLeft: '5pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    <b>CONTINGENCY [5%]:</b>
                  </p>
                </td>
                <td style={{ width: '10pt' }}>
                  <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                  </p>
                </td>
                <td style={{ width: '200pt' }}>
                  <p
                    className="s18"
                    style={{
                      paddingLeft: '18pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    GMD 195,753.00
                  </p>
                </td>
              </tr>

              <tr style={{ height: '24pt', paddingTop: '5pt' }}>
                <td
                  style={{
                    width: '135pt',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '5pt',
                  }}
                  colSpan={2}
                >
                  <p
                    className="s17"
                    style={{
                      paddingLeft: '5pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    <b>WORKMANSHIP:</b>
                  </p>
                </td>
                <td
                  style={{
                    width: '10pt',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '5pt',
                  }}
                >
                  <p
                    className="s18"
                    style={{
                      paddingLeft: '18pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    GMD 400,000.00
                  </p>
                </td>
              </tr>

              <tr style={{ height: '36pt', paddingTop: '5pt' }}>
                <td
                  style={{
                    width: '100pt',
                    borderTopStyle: 'solid',
                    borderTopWidth: '5pt',
                  }}
                >
                  <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                  </p>
                  <p
                    className="s12"
                    style={{
                      paddingLeft: '5pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    <p>
                      <b>Total Due</b>
                    </p>
                  </p>
                </td>
                <td
                  style={{
                    width: '157pt',
                    borderTopStyle: 'solid',
                    borderTopWidth: '5pt',
                  }}
                  colSpan={2}
                >
                  <p
                    className="s19"
                    style={{
                      paddingTop: '11pt',
                      paddingLeft: '9pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    GMD 4,510,813.00
                  </p>
                </td>
              </tr>

              <tr style={{ height: '18pt', paddingTop: '5pt' }}>
                <td style={{ width: '200pt' }}>
                  <p
                    className="s20"
                    style={{
                      paddingTop: '5pt',
                      paddingLeft: '5pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    <b>Amount In Words</b>
                  </p>
                </td>
                <td style={{ width: '35pt' }}>
                  <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                  </p>
                </td>
                <td style={{ width: '200pt' }}>
                  <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                  </p>
                </td>
              </tr>

              <tr style={{ height: '50pt', paddingTop: '5pt' }}>
                <td style={{ width: '257pt' }} colSpan={3}>
                  <p
                    className="s21"
                    style={{
                      paddingLeft: '5pt',
                      paddingRight: '21pt',
                      textIndent: '0pt',
                      lineHeight: '12pt',
                      textAlign: 'left',
                    }}
                  >
                    Four Million Five Hundred and Ten Thousand Eight Hundred and
                    Thirteen Dalasis Only.
                  </p>
                </td>
              </tr>
            </div>

            {/* Footer  */}
            <div style={{ borderCollapse: 'collapse', marginLeft: '5.4pt' }}>
              <tr style={{ height: '13pt' }}>
                <td style={{ width: '167pt' }}>
                  <p
                    className="s8"
                    style={{
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    Approved By: Abdoulie B. Njie
                  </p>
                </td>
                <td style={{ width: '233pt' }}>
                  <p
                    className="s8"
                    style={{
                      paddingLeft: '22pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    BoQ prepared by: Constructions Department
                  </p>
                </td>
              </tr>
              <tr style={{ height: '13pt' }}>
                <td style={{ width: '167pt' }}>
                  <p
                    className="s8"
                    style={{
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    Chairman
                  </p>
                </td>
                <td style={{ width: '233pt' }}>
                  <p
                    className="s8"
                    style={{
                      paddingLeft: '22pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    Mr. Jobe
                  </p>
                </td>
              </tr>
            </div>

            <div style={{ borderCollapse: 'collapse', marginLeft: '5.16pt' }}>
              <tr style={{ height: '32pt' }}>
                <td style={{ width: '353pt' }}>
                  <p
                    className="s8"
                    style={{
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      lineHeight: '11pt',
                      textAlign: 'left',
                    }}
                  >
                    If you have any questions concerning this Bill contact:
                  </p>
                  <p
                    className="s8"
                    style={{
                      paddingLeft: '10pt',
                      textIndent: '0pt',
                      textAlign: 'left',
                    }}
                  >
                    construction@groupisa.org | +220 242-0825 [Abdoulie B. Njie]
                  </p>
                </td>
              </tr>
              <tr style={{ height: '19pt' }}>
                <td style={{ width: '353pt' }}>
                  <p
                    className="s23"
                    style={{
                      paddingTop: '5pt',
                      paddingLeft: '210pt',
                      textIndent: '0pt',
                      lineHeight: '12pt',
                      textAlign: 'left',
                    }}
                  >
                    Thank you for your business!
                  </p>
                </td>
              </tr>
            </div>
          </tbody>
        </table>
      </>
    );
  };
  return <UI />;
}

export default Ui;
