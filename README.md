[![Btcturk - Btcturk Node.js API](https://img.shields.io/badge/Btcturk-Btcturk_Node.js_API-3B82F6)](https://) ![](https://githubbadges.com/star.svg?user=hasanmuzak&repo=btcturk-api-nodejs&background=059669&color=fff&style=flat) ![](https://img.shields.io/bundlephobia/minzip/btcturk-api-nodejs?color=34D399) ![](https://img.shields.io/bundlephobia/min/btcturk-api-nodejs?color=34D399) [![Tests - Passed](https://img.shields.io/badge/Tests-Passed-2ea44f)](https://)

### Btcturk Unofficial API powered by NodeJS
This project developed based on [Btcturk](https://docs.btcturk.com/ "Btcturk")'s official api documentation.

- Crypto-js has used to create request headers
- Axios has used to send requests

### Usage
Be sure of that you have API access. So you should create an API key from https://pro.btcturk.com. (Login -> Account -> Api Access)

If you have an API & Private key, you can start sending requests.

```
const { Btcturk } = require('btcturk-api-nodejs');

const btcturk = new Btcturk(`Your API Key`, `Your Private Key`)
```

Here are some examples;

```
const { Btcturk } = require('btcturk-api-nodejs');
const btcturk = new Btcturk(`Your API Key`, `Your Private Key`)

btcturk.getTicker("BTC_USDT").then(response => {
    console.log(response.data);
})
```

If response returns 200;
```
{
  data: [
    {
      pair: 'BTCUSDT',
      pairNormalized: 'BTC_USDT',
      timestamp: 1635656477962,
      last: 61323,
      high: 62420,
      low: 60748,
      bid: 61376,
      ask: 61464,
      open: 61559,
      volume: 125.87878261,
      average: 61516.04103917,
      daily: -95,
      dailyPercent: -0.38,
      denominatorSymbol: 'USDT',
      numeratorSymbol: 'BTC',
      order: 2001
    }
  ],
  success: true,
  message: null,
  code: 0
}
```

Please check param types and available formats from https://docs.btcturk.com.

All methods are promise based, so after calling a class method, dont forget to use `.then` and `.catch` blocks to handle data || error.
