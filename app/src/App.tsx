import { useEthers, useLocalStorage } from "@usedapp/core";
import { Proof } from "circuits";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import Connect from "./components/Connect";
import GenZKP from "./components/GenZKP";
import SendTx from "./components/SendTx";

function App() {
  const { account } = useEthers();
  // const { pubKey } = useEdDSA(privKey);
  const [proof, setProof] = useState<Proof>();
  const [deployed, setDeployed] = useState<string>("0x3374c5603e0B76C8d9F9Af2979d6f419E8a4A09B");
  const [a, setA]=useState<bigint>();
  const [b, setB]=useState<bigint>();
  const [c, setC]=useState<bigint>(BigInt(8633));

  const toHex = (n: bigint) => {
    // return n;
    return "0x" + n.toString(16);
  };

  const shorten = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  return (
    <div className="flex flex-col gap-y-4 my-8 max-w-md mx-auto">      
      <Connect />

      <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col border p-4 justify-center text-center">
        <h2 className="text-xl pb-4">Step 2. Select your NFT contract addres</h2>
        <label htmlFor="contract-address" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract Address</label>
        <input value={deployed} onChange={(e)=>setDeployed(e.target.value)} type="text" id="contract-address" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

        {/* <input type="text" value={deployed} onChange={(e)=>setDeployed(e.target.value)} placeholder="contract address" /> */}
      </div>
      {/* <Deploy onResult={setDeployed} /> */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col border p-4 justify-center text-center">
        <h2 className="text-xl pb-4">Step 3. Create Zero Knowledge Proof</h2>
        <div className="flex flex-row gap-x-4">
          <input type="text" value={a?.toString()} onChange={(e)=>setA(BigInt(e.target.value))} placeholder="A" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <p className="text-5xl">x</p>
          <input type="text" value={b?.toString()} onChange={(e)=>setB(BigInt(e.target.value))} placeholder="B" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <p className="text-5xl">=</p>
          <input type="text" value={c?.toString()} onChange={(e)=>setC(BigInt(e.target.value))} placeholder="C" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <GenZKP a={a} b={b} c={c} onResult={(result) => setProof(result)} />
      </div>
      {proof && <div className="overflow-scroll  bg-white border border-gray-200 rounded-lg shadow-md flex flex-col border p-4 justify-center text-center">
        <p className="text-xl">Proof:</p>
        <p className="text-left text-purple-900 inline-block">a:</p>
        <p className="text-red-600">["{toHex(proof?.a[0])}",</p>
        <p className="text-red-600">"{toHex(proof?.a[1])}"]</p>
        <p className="text-left text-purple-900 inline-block">b:</p>
        <p className="text-red-600">[["{toHex(proof?.b[0][0])}",</p>
        <p className="text-red-600">"{toHex(proof?.b[0][1])}"],</p>
        <p className="text-red-600">["{toHex(proof?.b[1][0])}",</p>
        <p className="text-red-600">"{toHex(proof?.b[1][1])}"]],</p>
        <p className="text-left text-purple-900 inline-block">c:</p>
        <p className="text-red-600">["{toHex(proof?.c[0])}",</p>
        <p className="text-red-600">"{toHex(proof?.c[1])}"]</p>
      </div>}

      {deployed && account && <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col border p-4 justify-center text-center">
        <h2 className="text-xl pb-4">Step 4. Mint your NFT</h2>
          <SendTx
            address={deployed}
            publicSignals={c ? [c] : undefined}
            proof={proof}
          />
      </div>}
    </div>
  );
}

export default App;
