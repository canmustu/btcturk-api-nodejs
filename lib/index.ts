import * as crypto from "crypto-js";
import axios from "axios";
import { Endpoint } from "./endpoints";

export class Btcturk {
  private apiKey: string;
  private apiSecretKey: string;

  constructor(apiKey: string, apiSecretKey: string) {
    this.apiKey = apiKey;
    this.apiSecretKey = apiSecretKey;
  }

  // Prepare and return mandatory header for requests;
  getHeaderCredentials() {
    const b64_api_secret = crypto.enc.Base64.parse(this.apiSecretKey);
    const stamp = +new Date();
    const message = Buffer.from(`${this.apiKey}${stamp}`, "utf8").toString();
    let signature = crypto.enc.Base64.stringify(
      crypto.HmacSHA256(message, b64_api_secret)
    );
    signature = Buffer.from(signature, "utf8").toString();
    const headers = {
      "X-PCK": this.apiKey,
      "X-Stamp": stamp.toString(),
      "X-Signature": signature,
      "Content-Type": "application/json",
    };
    return headers;
  }

  // Accepted pair symbols are; BTC_USDT, BTC_TRY, XRP_TRY...

  getTicker(symbol?: string) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.TICKER}/${
        symbol ? "?pairSymbol=" + symbol : ""
      }`
    );
  }
  getOrderBook(symbol: string, limit: number = 100) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.ORDER_BOOK}?pairSymbol=${symbol}&limit=${limit}`
    );
  }
  getTrades(symbol: string, last: number = 50) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.TRADES}?pairSymbol=${symbol}&last=${last}`
    );
  }

  // from and to params must be in seconds format (in timestamps)
  // Math.round(new Date().getTime()/1000) -> current timestamp in seconds
  getOhlcData(symbol: string, from?: number, to?: number) {
    return axios.get(
      `${Endpoint.OHLC_DATA}?pair=${symbol}${from ? "&from=" + from : ""}${
        to ? "&to=" + to : ""
      }`
    );
  }

  getExchangeInfo() {
    return axios.get(`${Endpoint.BASE}/${Endpoint.EXCHANGE_INFO}`);
  }

  getAccountBalance() {
    return axios.get(`${Endpoint.BASE}/${Endpoint.ACCOUNT_BALANCE}`, {
      headers: this.getHeaderCredentials(),
    });
  }

  getUserTransactions(
    type: string[],
    symbol: string[],
    startDate?: number,
    endDate?: number
  ) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.USER_TRANSACTIONS}?${type
        .map((n) => `type=${n}`)
        .join(`&`)}&${symbol.map((n) => `symbol=${n}`).join(`&`)}${
        startDate ? "&startDate=" + startDate : ""
      }${endDate ? "&endDate=" + endDate : ""}`,
      {
        headers: this.getHeaderCredentials(),
      }
    );
  }

  getUserTransactionByID(orderID: number) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.USER_TRANSACTIONS}?orderID=${orderID}`,
      {
        headers: this.getHeaderCredentials(),
      }
    );
  }

  getCryptoTransactions(
    type: string[],
    symbol: string[],
    startDate?: number,
    endDate?: number
  ) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.CRYPTO_TRANSACTIONS}?${type
        .map((n) => `type=${n}`)
        .join(`&`)}&${symbol.map((n) => `symbol=${n}`).join(`&`)}${
        startDate ? "&startDate=" + startDate : ""
      }${endDate ? "&endDate=" + endDate : ""}`,
      {
        headers: this.getHeaderCredentials(),
      }
    );
  }

  // Bank transactions
  getFiatTransactions(
    type: string[],
    symbol: string[],
    startDate?: number,
    endDate?: number
  ) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.FIAT_TRANSACTIONS}?${type
        .map((n) => `type=${n}`)
        .join(`&`)}&${symbol.map((n) => `symbol=${n}`).join(`&`)}${
        startDate ? "&startDate=" + startDate : ""
      }${endDate ? "&endDate=" + endDate : ""}`,
      {
        headers: this.getHeaderCredentials(),
      }
    );
  }

  getOpenOrders(symbol: string) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.OPEN_ORDERS}?pairSymbol=${symbol}`,
      {
        headers: this.getHeaderCredentials(),
      }
    );
  }

  getAllOrders(
    symbol: string,
    startTime?: number,
    endTime?: number,
    page: number = 1,
    limit: number = 100
  ) {
    return axios.get(
      `${Endpoint.BASE}/${Endpoint.ALL_ORDERS}?pairSymbol=${symbol}${
        startTime ? "&startDate=" + startTime : ""
      }${endTime ? "&endTime=" + endTime : ""}&page=${page}&limit=${limit}`,
      {
        headers: this.getHeaderCredentials(),
      }
    );
  }

  getAllOrdersByID(
    orderID: number,
    symbol: string,
    startTime: number,
    endTime: number,
    page: number = 1,
    limit: number = 100
  ) {
    return axios.get(
      `${Endpoint.BASE}/${
        Endpoint.ALL_ORDERS
      }?orderId=${orderID}&pairSymbol=${symbol}${
        startTime ? "&startTime=" + startTime : ""
      }${endTime ? "&endTime=" + endTime : ""}&page=${page}&limit=${limit}`,
      {
        headers: this.getHeaderCredentials(),
      }
    );
  }

  submitOrder(
    quantity: number,
    price: number,
    stopPrice: number,
    orderMethod: string,
    orderType: string,
    pairSymbol: string,
    newOrderClientId?: string
  ) {
    const data = {
      quantity,
      price,
      stopPrice,
      orderMethod,
      orderType,
      pairSymbol,
      newOrderClientId: newOrderClientId ? newOrderClientId : null,
    };
    return axios.post(`${Endpoint.BASE}/${Endpoint.SUBMIT_ORDER}`, data, {
      headers: this.getHeaderCredentials(),
    });
  }

  cancelOrder(id: number) {
    return axios.delete(`${Endpoint.BASE}/${Endpoint.SUBMIT_ORDER}?id=${id}`, {
      headers: this.getHeaderCredentials(),
    });
  }
}