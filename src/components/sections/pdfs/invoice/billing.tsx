import React from 'react';

export default ({customer, date, invoiceid, address}:{customer:any, date:any, invoiceid:any, address:any, }) => {
  return (
      <table
        style={{ borderCollapse: 'collapse', marginLeft: '5.4pt' }}
        cellSpacing={0}
      >
        <tbody>
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
        </tbody>
      </table>
  );
};
