import React, { useEffect, useState } from 'react';

export default ({ name, items }: { name: string; items: any }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [rows, setRows] = useState<JSX.Element[]>();

  useEffect(() => {
    console.log('items', items);
    var temprows: JSX.Element[] = [];
    items.forEach((element: any) => {
      temprows.push(<Row item={element} />);
      setSubtotal(element!.price!.price * element.units);
    });
    setRows(temprows);
  }, []);

  return (
    <>
      <table
        style={{ borderCollapse: 'collapse', marginLeft: '10.25pt' }}
        cellSpacing={0}
      >
        <tbody>
          {/* Columns */}
          <tr style={{ height: '33pt', color: 'white' }}>
            <td
              style={{
                width: '32pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#003300',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s10"
                style={{
                  paddingRight: '4pt',
                  textIndent: '0pt',
                  textAlign: 'right',
                }}
              >
                Item
              </p>
            </td>
            <td
              style={{
                width: '155pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#003300',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s10"
                style={{
                  paddingLeft: '5pt',
                  textIndent: '0pt',
                  textAlign: 'left',
                }}
              >
                Name
              </p>
            </td>
            <td
              style={{
                width: '155pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#003300',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s10"
                style={{
                  paddingLeft: '5pt',
                  textIndent: '0pt',
                  textAlign: 'left',
                }}
              >
                Description
              </p>
            </td>
            <td
              style={{
                width: '75pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#003300',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s10"
                style={{
                  paddingLeft: '5pt',
                  textIndent: '0pt',
                  textAlign: 'left',
                }}
              >
                Quantity
              </p>
            </td>
            <td
              style={{
                width: '73pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#003300',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s10"
                style={{
                  paddingLeft: '5pt',
                  textIndent: '0pt',
                  textAlign: 'left',
                }}
              >
                Price
              </p>
            </td>
            <td
              style={{
                width: '100pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#003300',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s10"
                style={{
                  paddingLeft: '5pt',
                  textIndent: '0pt',
                  textAlign: 'left',
                }}
              >
                Total amount
              </p>
            </td>
          </tr>
          {/* Category */}
          <tr style={{ height: '37pt' }}>
            <td
              style={{
                width: '540pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#6FAC46',
              }}
              colSpan={6}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s11"
                style={{
                  paddingLeft: '202pt',
                  paddingRight: '202pt',
                  textIndent: '0pt',
                  textAlign: 'center',
                }}
              >
                CATEGORY NAME
              </p>
            </td>
          </tr>
          {/* Green space */}
          <tr style={{ height: '12pt' }}>
            <td
              style={{
                width: '540pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#003300',
              }}
              colSpan={6}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
            </td>
          </tr>
          {/* Category description  */}
          <tr style={{ height: '60pt' }}>
            <td
              style={{
                width: '32pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#D9D9D9',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: '508pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
              }}
              colSpan={5}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s12"
                style={{
                  paddingLeft: '125pt',
                  paddingRight: '125pt',
                  textIndent: '0pt',
                  textAlign: 'center',
                }}
              >
                Construct structural timber roof comprising of 50 x 100mm
                treated timber members and 50 x 50mm timber battens on 50 x
                150mm wall plate; (Treated hardwood red timber)
              </p>
            </td>
          </tr>
          {/* row */}
          {rows}
          {/* subtotal */}
          <tr style={{ height: '40pt' }}>
            <td
              style={{
                width: '32pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#D9D9D9',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: '335pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
              }}
              colSpan={3}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: '73pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#C5DFB3',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s14"
                style={{
                  paddingLeft: '5pt',
                  textIndent: '0pt',
                  textAlign: 'left',
                }}
              >
                SUB TOTAL
              </p>
            </td>
            <td
              style={{
                width: '100pt',
                borderTopStyle: 'solid',
                borderTopWidth: '1pt',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1pt',
                borderRightStyle: 'solid',
                borderRightWidth: '1pt',
                backgroundColor: '#C5DFB3',
              }}
            >
              <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
              </p>
              <p
                className="s14"
                style={{
                  paddingLeft: '5pt',
                  textIndent: '0pt',
                  textAlign: 'left',
                }}
              >
                {subtotal}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};


function Row({ item }: { item: any }) {

  return (
    <tr style={{ height: '24pt' }}>
      <td
        style={{
          width: '32pt',
          borderTopStyle: 'solid',
          borderTopWidth: '1pt',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1pt',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1pt',
          borderRightStyle: 'solid',
          borderRightWidth: '1pt',
          backgroundColor: '#D9D9D9',
        }}
      >
        <p
          className="s8"
          style={{
            paddingRight: '4pt',
            textIndent: '0pt',
            lineHeight: '13pt',
            textAlign: 'right',
          }}
        >
          {item.index}
        </p>
      </td>

      <td
        style={{
          width: '155pt',
          borderTopStyle: 'solid',
          borderTopWidth: '1pt',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1pt',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1pt',
          borderRightStyle: 'solid',
          borderRightWidth: '1pt',
        }}
      >
        <p
          className="s12"
          style={{
            paddingLeft: '5pt',
            textIndent: '0pt',
            lineHeight: '12pt',
            textAlign: 'left',
          }}
        >
          {item.name}
        </p>
      </td>

      <td
        style={{
          width: '155pt',
          borderTopStyle: 'solid',
          borderTopWidth: '1pt',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1pt',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1pt',
          borderRightStyle: 'solid',
          borderRightWidth: '1pt',
        }}
      >
        <p
          className="s12"
          style={{
            paddingLeft: '5pt',
            textIndent: '0pt',
            lineHeight: '12pt',
            textAlign: 'left',
          }}
        >
          {item.description}
        </p>
      </td>
      <td
        style={{
          width: '73pt',
          borderTopStyle: 'solid',
          borderTopWidth: '1pt',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1pt',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1pt',
          borderRightStyle: 'solid',
          borderRightWidth: '1pt',
        }}
      >
        <p
          className="s12"
          style={{ paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}
        >
          {item.units}
        </p>
      </td>
      <td
        style={{
          width: '100pt',
          borderTopStyle: 'solid',
          borderTopWidth: '1pt',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1pt',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1pt',
          borderRightStyle: 'solid',
          borderRightWidth: '1pt',
        }}
      >
        <p
          className="s12"
          style={{ paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}
        >
          {item.price.price}
        </p>
      </td>

      <td
        style={{
          width: '105pt',
          borderTopStyle: 'solid',
          borderTopWidth: '1pt',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1pt',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1pt',
          borderRightStyle: 'solid',
          borderRightWidth: '1pt',
        }}
      >
        <p style={{ textIndent: '0pt', textAlign: 'left' }}>
          {item.units * item.price.price}
        </p>
      </td>
    </tr>
  );
}
