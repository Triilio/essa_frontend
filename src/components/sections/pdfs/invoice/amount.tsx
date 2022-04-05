import React from 'react';

export default ({
  subtotal,
  contingency,
  workmanship,
  total_due,
}: {
  subtotal: any;
  contingency: any;
  workmanship: any;
  total_due: any;
}) => {
  return (
    <>
      <table
        style={{ borderCollapse: 'collapse', marginLeft: '50%' }}
        cellSpacing={0}
      >
        <tbody>
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
        </tbody>
      </table>
    </>
  );
};
