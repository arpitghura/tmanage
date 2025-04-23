import * as request from 'request';
import * as xml2js from 'xml-js';
import { ApiError } from '../core/ApiError';

export const BASE_URL = `http://10.41.94.53:8852/`;
const captialGainURL = 'http://10.41.4.70:6879/AccountStatementService.asmx';
const accountStatementURL = 'http://10.41.4.68:7861/AccountStatementService.asmx';

export async function captialGainStatement(objData: any, res: any) {
  try {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                        <soap:Body>
                            <Print_CapitalGainStatement_SOAformat xmlns="http://tempuri.org/AcstWebService/AccountStatementService">
                                <Fund>${objData.Fund}</Fund>
                                <RefNo>${objData.reference_no}</RefNo>
                                <StmtType>${objData.Stmttype}</StmtType>
                                <FlagLogo>${objData.Flaglogo}</FlagLogo>
                                <SOAtype>${objData.Soatype}</SOAtype>
                                <pwd>${objData.Pwd}</pwd>
                            </Print_CapitalGainStatement_SOAformat>
                        </soap:Body>
                    </soap:Envelope>`;

    let postoptions = {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
      body,
    };
    let resbody: any = await post(captialGainURL, postoptions);
    console.log({ postoptions, resbody });
    let profit_loss_data: any = xml2js.xml2js(resbody.body, { compact: true, ignoreComment: true });
    console.log('soap output', profit_loss_data['soap:Envelope']['soap:Body']);
    // if (profit_loss_data['soap:Envelope']['soap:Body']['Print_CapitalGainStatement_SOAformatResponse']['Print_CapitalGainStatement_SOAformatResult']['_text']) {
    let encodedData = profit_loss_data['soap:Envelope']['soap:Body']['Print_CapitalGainStatement_SOAformatResponse']['Print_CapitalGainStatement_SOAformatResult']['_text'];
    return { data: encodedData };
    // } else {
    //   throw new Error('No Data found');
    // }
  } catch (err: any) {
    console.log(err);
    if (err.message == "Cannot read property '_text' of undefined") {
      let err: any = {
        message: 'No Data found',
      };
      return ApiError.handle(err, res);
    }
    return ApiError.handle(err, res);
  }
}

export async function accountStatement(objData: any, res: any) {
  try {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                        <soap:Body>
                            <Print_AccountStatement xmlns="http://tempuri.org/AcstWebService/AccountStatementService">
                                <Fund>189</Fund>
                                <RefNo>${objData.Refno}</RefNo>
                                <ToDate>${objData.Todate}</ToDate>
                                <StmtFrom>${objData.Stmtfrom}</StmtFrom>
                                <UserName>${objData.Entby}</UserName>
                                <Branch>hy03</Branch>
                                <StrBranchConfirm>N</StrBranchConfirm>
                                <LogoFlag>true</LogoFlag>
                                <LicTermFlag>false</LicTermFlag>
                                <LanguageType>English</LanguageType>
                                <DetailFlag>true</DetailFlag>
                                <pwd>${objData.Pwd}</pwd>
                                <Scheme></Scheme>
                                <Plan></Plan>
                            </Print_AccountStatement>
                        </soap:Body>
                    </soap:Envelope>`;

    let postoptions = {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
      body,
    };
    // console.log({postoptions})
    let resbody: any = await post(accountStatementURL, postoptions);
    // console.log({resbody})
    let profit_loss_data: any = xml2js.xml2js(resbody.body, { compact: true, ignoreComment: true });
    // if (profit_loss_data['soap:Envelope']['soap:Body']['Print_AccountStatementResponse']['Print_AccountStatementResult']['_text']) {
    let encodedData = profit_loss_data['soap:Envelope']['soap:Body']['Print_AccountStatementResponse']['Print_AccountStatementResult']['_text'];
    return { data: encodedData };
    // } else {
    //   throw new Error('No Data found');
    // }
    // console.log({ profit_loss_data, encodedData });
  } catch (err: any) {
    console.log(err);
    if (err.message == "Cannot read property '_text' of undefined") {
      let err: any = {
        message: 'No Data found',
      };
      return ApiError.handle(err, res);
    }
    return ApiError.handle(err, res);
  }
}

export async function post(relativePath: any, options: any) {
  let url = relativePath.startsWith('/') ? BASE_URL + relativePath : relativePath;
  console.log({ url });

  return await new Promise((resolve, reject) => {
    request.post(url, options, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      resolve({ response, body });
    });
  });
  // let result = await Promise.all([response.json()])
  // console.log({response})
  // return response;
}
