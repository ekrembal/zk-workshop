import { useEthers } from "@usedapp/core";
import { hexlify } from "ethers/lib/utils";
import { useEffect } from "react";
import { useWalletConnect } from "../hooks/useWalletConnect";

const switchNetwork = async (chainId: number) => {
  const { ethereum } = window as any;
  if (!ethereum) return;
  try {
    const result = await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexlify(chainId).replace("0x0", "0x") }],
    });
    console.log("result", result);
  } catch (switchError) {
    console.error(switchError);
  }
};
function Connect() {
  const { activateBrowserWallet, deactivate, chainId } = useEthers();
  const { activateWalletConnect } = useWalletConnect();
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col border p-4 justify-center text-center gap-y-4">
      <h2 className="text-xl">Step 1. Connect your wallet</h2>
      {chainId && <p className="text-xl">Chain ID: {chainId}</p>}
      {chainId ? (chainId!=5&&
        <>
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => switchNetwork(5)}>Switch to Goerli</button>
        </>
      ) : (
        <div className="flex flex-row gap-x-4 justify-center">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={activateBrowserWallet}>Connect metamask</button>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={activateWalletConnect}>Connect walletconnect</button>
        </div>
      )}
    </div>
  );
}

export default Connect;
