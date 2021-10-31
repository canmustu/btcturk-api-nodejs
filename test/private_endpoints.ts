import { Btcturk } from "../lib/index";
import * as dotenv from "dotenv";
import { expect } from "chai";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

describe("Private Endpoints", () => {
  it("Get account balance => 200 ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      btcturk
        .getAccountBalance()
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch(done);
    }
  }).timeout(5000);

  it("Get user transactions => 200", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      btcturk
        .getUserTransactions(
          ["buy", "sell"],
          ["btc", "usdt", "xrp"],
          1630321295,
          1632999695
        )
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch(done);
    }
  }).timeout(5000);

  it("Get user transaction by id => 200", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      btcturk
        .getUserTransactionByID(543536356)
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch(done);
    }
  }).timeout(5000);

  it("get user's crypto transactions => 200  ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = ["BTC_TRY", "ETH_USDT"];

      btcturk
        .getCryptoTransactions(
          ["deposit", "withdrawal"],
          ["btc", "eth"],
          1630321295,
          1632999695
        )
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch(done);
    }
  }).timeout(5000);

  it("get user's fiat transactions => 200 ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = ["BTC_TRY", "ETH_USDT"];

      btcturk
        .getFiatTransactions(
          ["deposit", "withdrawal"],
          ["try"],
          1630321295,
          1632999695
        )
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch(done);
    }
  }).timeout(5000);

  it("get open orders in different symbols => 200 ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = ["BTC_TRY", "ETH_USDT", "ETH_TRY", "XRP_TRY"];
      (async () => {
        for (let item of symbols) {
          await new Promise((r) => setTimeout(r, 500));
          btcturk
            .getOpenOrders(item)
            .then((response) => {
              expect(response.status).to.equal(200);
            })
            .catch(done);
        }
        done();
      })();
    }
  }).timeout(5000);

  it("get all orders in different symbols => 200 ", (done) => {
    const apiKey = process.env.apiKey;
    const apiSecret = process.env.apiSecret;

    if (apiKey && apiSecret) {
      const btcturk = new Btcturk(apiKey, apiSecret);
      const symbols = ["BTC_TRY", "ETH_USDT", "ETH_TRY", "XRP_TRY"];
      (async () => {
        for (let item of symbols) {
          await new Promise((r) => setTimeout(r, 500));
          btcturk
            .getAllOrders(item, 1630321295, 1600321295)
            .then((response) => {
              expect(response.status).to.equal(200);
            })
            .catch(done);
        }
        done();
      })();
    }
  }).timeout(5000);
});
