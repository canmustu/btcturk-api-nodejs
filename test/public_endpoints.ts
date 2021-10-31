import { Btcturk } from "../lib/index";
import * as dotenv from "dotenv";
import { expect } from "chai";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

describe("Public Endpoints", () => {
  it("getHeaderCredentials() must return header successfuly ", () => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;
    expect(apiKey).to.be.a("string");
    expect(apiSecret).to.be.a("string");

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const headers = btcturk.getHeaderCredentials();
      expect(headers["X-PCK"]).to.be.a("string");
      expect(headers["X-Stamp"]).to.be.a("string");
      expect(headers["X-Signature"]).to.be.a("string");
    }
  });

  it("getTicker() must return 200 with different symbols ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = [
        "BTC_USDT",
        "BTC_USDT",
        "LTC_USDT",
        "XRP_TRY",
        "TRX_BTC",
      ];
      (async () => {
        for (let item of symbols) {
          await new Promise((r) => setTimeout(r, 500));
          btcturk
            .getTicker(item)
            .then((response) => {
              expect(response.status).to.equal(200);
            })
            .catch(done);
        }
        done();
      })();
    }
  }).timeout(5000);

  it("getOrderBook() must return 200 with different symbols ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = ["BTC_TRY", "LTC_USDT"];
      (async () => {
        for (let item of symbols) {
          await new Promise((r) => setTimeout(r, 500));
          btcturk
            .getOrderBook(item)
            .then((response) => {
              expect(response.status).to.equal(200);
            })
            .catch(done);
        }
        done();
      })();
    }
  }).timeout(5000);

  it("getTrades() must return 200 with different symbols ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = ["BTC_TRY", "ETH_USDT"];
      (async () => {
        for (let item of symbols) {
          await new Promise((r) => setTimeout(r, 500));
          btcturk
            .getTrades(item)
            .then((response) => {
              expect(response.status).to.equal(200);
            })
            .catch(done);
        }
        done();
      })();
    }
  }).timeout(5000);

  it("getOhlcData() must return 200 with different symbols ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = ["BTC_TRY", "ETH_USDT"];
      (async () => {
        for (let item of symbols) {
          await new Promise((r) => setTimeout(r, 500));
          btcturk
            .getOhlcData(item, 1634554895, 1636542095)
            .then((response) => {
              expect(response.status).to.equal(200);
            })
            .catch(done);
        }
        done();
      })();
    }
  }).timeout(5000);

  it("getExchangeInfo() must return 200 with different symbols ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      btcturk
        .getExchangeInfo()
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch(done);
    }
  }).timeout(5000);
});
