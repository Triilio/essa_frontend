import React, { useEffect, useState, useRef, useContext } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { AuthApiProvider } from '../../../../providers/api.provider';
import AppContext from '../../../../utils/context';
import Category from './category';
import { useParams } from 'react-router-dom';
import { Logo } from '../../../../utils/images/logo';

function Ui() {
  // data
  const [date, setDate] = useState<Date>();
  const [invoiceid, setInvoiceid] = useState<String>();
  const [customer, setCustomer] = useState<String>();
  const [list, setList] = useState<JSX.Element[]>();

  const apiContext = useContext(AppContext);
  const param = useParams();

  const apiProvider = new AuthApiProvider();
  const [name, setName] = useState<String>();
  const [description, setDescription] = useState<String>();
  const [total, setTotal] = useState(0);
  const [type, setType] = useState<String>();
  const [items, setItems] = useState([]);
  const [thread, setThread] = useState([]);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(0);
  const [contingency, setContingency] = useState(0);
  const [workmanship, setWorkmanship] = useState(0);

  const [backer, setBacker] = useState<any>(null);
  const [payments, setPayments] = useState([]);

  // docs / service docs
  const [requestdoc, setRequestDoc] = useState(null);
  const [boq, setBOQ] = useState(null);
  const [completioncert, setCompletioncert] = useState(null);
  const [surveyreport, setSurveyreport] = useState(null);

  const [category, setCategory] = useState<any[]>([]);

  // docs / product docs
  const [invoice, setInvoice] = useState(null);
  const [deliverynote, setDeliverynote] = useState(null);
  const [reciept, setReciept] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GMD',
    minimumFractionDigits: 2,
  });

  const getData = () => {
    return apiProvider
      .getOneNegotiation(param.id + '')
      .then((res: any) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setItems(res.data.items);
        setThread(res.data.thread);
        setType(res.data.type);
        setStatus(res.data.status);
        setBacker(res.data.backer);

        setPayments(res.data.payments);
        setCategory(res.data.categories);
        setContingency(res.data.contingency | 0);
        setWorkmanship(res.data.workmanship | 0);

        // initing docs
        setRequestDoc(res.data.docs.requestdoc);
        setBOQ(res.data.docs.boq);
        setCompletioncert(res.data.docs.completioncert);
        setSurveyreport(res.data.docs.surveyreport);
        setDeliverynote(res.data.docs.deliverynote);

        var p = 0;
        res.data.items.forEach(
          ({ price, units }: { price: any; units: any }) => {
            p +=
              0 +
              (Number.parseFloat(units) * Number.parseFloat(price.price) || 1);
          }
        );
        // add contingency
        p += price;
        setPrice(p);
      })
      .catch(error => {
        console.log(error);
        alert('error');
      });
  };

  useEffect(() => {
    /**
     * Sorting the items into categories
     */

    var sortedCategoryTracker: any[] = [];
    var sortedCategoryHolder: any = {};

    items.forEach((element: any) => {
      if (sortedCategoryTracker.includes(element.category)) {
        sortedCategoryHolder[element.category].list.push(element);
      } else {
        sortedCategoryTracker.push(element.category);
        sortedCategoryHolder[element.category] = {};
        sortedCategoryHolder[element.category].list = [];
        sortedCategoryHolder[element.category].list[0] = element;
        // injecting category data in element
        console.log('global categories', category);
        console.log('global categories', category);
        var currentCategory = category!.filter((e: any) => {
          console.log('is %s = %s', e.id, element.category);
          if (e.id === element.category) {
            return e;
          }
        });
        console.log('current Category', currentCategory);
        sortedCategoryHolder[element.category].categoryObject = currentCategory;
      }
    });
    var tempList = [];
    for (var key in sortedCategoryHolder) {
      if (sortedCategoryHolder.hasOwnProperty(key)) {
        // just so i can sleep at night.
        tempList.push(<Category data={sortedCategoryHolder[key]} />);
      }
    }

    setList(tempList);
  }, [items]);

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
                      fontSize: '32pt',
                    }}
                  >
                    <b>INVOICE</b>
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
                      {/* <img
                        width={172}
                        height={79}
                        alt="image"
                        src="004-110322BOQ-Version 2/Image_001.png"
                      /> */}
                      <Logo />
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
                    {'address'}
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
                    {formatter.format(price + workmanship)}
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
                    <b>CONTINGENCY [{contingency}%]:</b>
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
                    {formatter.format(
                      ((price + workmanship) / 100) * contingency
                    )}
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
                    {formatter.format(workmanship)}
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
                    <b>Total Due:</b>
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
                    {formatter.format(
                      ((price + workmanship) / 100) * contingency +
                        (price + workmanship)
                    )}
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
