/* eslint-disable node/no-missing-import */
/* eslint-disable camelcase */
import { expect } from "chai";
import { BigNumber } from "ethers";
// eslint-disable-next-line node/no-extraneous-import
import { ZKPClient } from "circuits";
import fs from "fs";
import path from "path";

describe("Test zkp circuit and scripts", function () {
  let client: ZKPClient;
  beforeEach(async () => {
    const wasm = fs.readFileSync(
      path.join(__dirname, "../../circuits/zk/circuits/main_js/main.wasm")
    );
    const zkey = fs.readFileSync(
      path.join(__dirname, "../../circuits/zk/zkeys/main.zkey")
    );
    client = await new ZKPClient().init(wasm, zkey);
  });
  it("Should able to prove 2*3 = 6", async function () {
    const proof = await client.prove({
      a: BigNumber.from(2).toBigInt(),
      b: BigNumber.from(3).toBigInt(),
      c: BigNumber.from(6).toBigInt(),
    });
    expect(proof).not.to.eq(undefined);
    console.log(proof);
  });
  it("Should able to prove 2*4 = 8", async function () {
    const proof = await client.prove({
      a: BigNumber.from(2).toBigInt(),
      b: BigNumber.from(4).toBigInt(),
      c: BigNumber.from(8).toBigInt(),
    });
    expect(proof).not.to.eq(undefined);
    console.log(proof);
  });


});
