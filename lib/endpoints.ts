export enum Endpoint {
    BASE = `https://api.btcturk.com/api`,

    // Public Endpoints
    TICKER = `v2/ticker`,
    ORDER_BOOK = `v2/orderbook`,
    TRADES = `v2/trades`,
    OHLC_DATA = `https://graph-api.btcturk.com/v1/ohlcs`,
    EXCHANGE_INFO = `v2/server/exchangeinfo`,

    // Private Endpoints
    ACCOUNT_BALANCE = `v1/users/balances`,
    USER_TRANSACTIONS = `v1/users/transactions/trade`,
    CRYPTO_TRANSACTIONS = `v1/users/transactions/crypto`,
    FIAT_TRANSACTIONS = `v1/users/transactions/fiat`,
    OPEN_ORDERS = `v1/openOrders`,
    ALL_ORDERS = `v1/allOrders`,
    SUBMIT_ORDER = `v1/order`,
}