import { useEthers, useLocalStorage } from "@usedapp/core";
import { Proof } from "circuits";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import Connect from "./components/Connect";
import GenZKP from "./components/GenZKP";
import SendTx from "./components/SendTx";
// import Viewer from "./components/Viewer";
// import useEdDSA from "./hooks/useEdDSA";
// import Deploy from "./components/Deploy";

// const address = process.env["REACT_APP_CONTRACT_ADDRESS"] as string;
// if (typeof address !== "string") throw Error("Configure contract address");
const msgToSign = BigNumber.from("0x1234").toBigInt();

function App() {
  const { account } = useEthers();
  const privKey = account || undefined;
  // const { pubKey } = useEdDSA(privKey);
  const [proof, setProof] = useState<Proof>();
  const [deployed, setDeployed] = useState<string>("0x3374c5603e0B76C8d9F9Af2979d6f419E8a4A09B");
  const [a, setA]=useState<bigint>(BigInt(89));
  const [b, setB]=useState<bigint>(BigInt(97));
  const [c, setC]=useState<bigint>(BigInt(8633));

  return (
    <div className="App">
      <h1>ZKP App Boilerplate</h1>
      <h2>Step 1. Connect your wallet</h2>
      <Connect />
      <h2>Step 2. Smart contract address</h2>
      <input type="text" value={deployed} onChange={(e)=>setDeployed(e.target.value)} placeholder="contract address" />
      {/* <Deploy onResult={setDeployed} /> */}
      <h2>Step 4. Prepare zkp signals A*B = C</h2>
      <input type="text" value={a?.toString()} onChange={(e)=>setA(BigInt(e.target.value))} placeholder="A" />
      <br/>
      <input type="text" value={b?.toString()} onChange={(e)=>setB(BigInt(e.target.value))} placeholder="B" />
      <br/>
      <input type="text" value={c?.toString()} onChange={(e)=>setC(BigInt(e.target.value))} placeholder="C" />
      <h2>Step 5. Compute a zk proof</h2>
      <GenZKP
        a={a}
        b={b}
        c={c}
        onResult={(result) => setProof(result)}
      />
      <br/>
      <p>{proof?.a}</p>
      <p>{proof?.b}</p>
      <p>{proof?.c}</p>
      <br/>
      <h2>Step 6. Interact with smart contract using the generated proof</h2>
      {deployed ? (
        <SendTx
          address={deployed}
          publicSignals={c ? [c] : undefined}
          proof={proof}
        />
      ) : (
        <p>Not deployed</p>
      )}
    </div>
  );
}

export default App;
