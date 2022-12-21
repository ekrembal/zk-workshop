import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  Verifier,
  Verifier__factory,
  ZkApp,
  ZkApp__factory,
} from "../typechain";
import { ZKPClient } from "circuits";
import { BigNumber } from "ethers";
import fs from "fs";
import path from "path";

describe("Test ZKP contract", function () {
  let verifier: Verifier;
  let zkApp: ZkApp;
  let deployer: SignerWithAddress;
  let client: ZKPClient;
  this.beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    verifier = await new Verifier__factory(deployer).deploy();
    zkApp = await new ZkApp__factory(deployer).deploy(verifier.address, 8633);
    client = await new ZKPClient().init(
      fs.readFileSync(
        path.join(__dirname, "../../circuits/zk/circuits/main_js/main.wasm")
      ),
      fs.readFileSync(path.join(__dirname, "../../circuits/zk/zkeys/main.zkey"))
    );
  });
  it("Should able to create a zkp and verify them", async function () {
    const proof = await client.prove({
      a: BigNumber.from(89).toBigInt(),
      b: BigNumber.from(97).toBigInt(),
      c: BigNumber.from(8633).toBigInt(),
    });
    expect(
      await zkApp.verify(
        [BigNumber.from(8633).toBigInt()],
        proof
      )
    ).to.eq(true);
    console.log(proof);
    await zkApp.safeMint(deployer.address, [8633], proof);
    expect(await zkApp.balanceOf(deployer.address)).to.eq(1);
  });
});
