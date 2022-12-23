import { Proof } from "circuits";
import { useRecord } from "../hooks/useContract";

function SendTx({
  address,
  publicSignals,
  proof,
}: {
  address: string;
  publicSignals?: [bigint];
  proof?: Proof;
}) {
  const { txState, record } = useRecord(address);
  return (
    <div>
      <p>Tx state: {txState}</p>
      <p>{!!publicSignals}</p>
      <p>{!!proof}</p>
      <p>{!!record}</p>
      <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={!publicSignals || !proof || !record}
        onClick={() => {
          if (!publicSignals) alert("Public signals are not ready");
          else if (!proof) alert("ZKP is not ready");
          else if (!record) alert("Wallet is not connected");
          else {
            record({
              publicSignals,
              proof,
            });
          }
        }}
      >
        Mint!
      </button>
    </div>
  );
}

export default SendTx;
