import buildCalculator from "../zk/circuits/main_js/witness_calculator";
import * as snarkjs from "snarkjs";

export interface Proof {
  a: [bigint, bigint];
  b: [[bigint, bigint], [bigint, bigint]];
  c: [bigint, bigint];
}

export class ZKPClient {
  private _calculator: any;
  private _zkey: any;

  get initialized() {
    return (
      this._calculator !== undefined &&
      this._zkey !== undefined
    );
  }

  get calculator() {
    if (!this.initialized) throw Error("Not initialized");
    return this._calculator;
  }

  async init(wasm: Buffer, zKey: Buffer) {
    if (this.initialized) return this;
    // you can adjust the file path here
    [this._zkey, this._calculator] = await Promise.all([
      zKey,
      buildCalculator(wasm),
    ]);
    this._zkey.type = "mem";
    return this;
  }

  /**
   * @dev customize this functions for your own circuit!
   */
  async prove({
    a,
    b,
    c
  }: {
    a: bigint;
    b: bigint;
    c: bigint;
  }): Promise<Proof> {
    const inputs = {
      a,
      b,
      c
    };
    const wtns = await this.calculator.calculateWTNSBin(inputs, 0);
    const { proof } = await snarkjs.groth16.prove(this._zkey, wtns);
    return {
      a: [proof.pi_a[0], proof.pi_a[1]] as [bigint, bigint],
      b: [proof.pi_b[0].reverse(), proof.pi_b[1].reverse()] as [
        [bigint, bigint],
        [bigint, bigint]
      ],
      c: [proof.pi_c[0], proof.pi_c[1]] as [bigint, bigint],
    };
  }
}
