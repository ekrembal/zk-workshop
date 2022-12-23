import { Proof } from "circuits";
import useCircuit from "../hooks/useCircuit";

function GenZKP({
  a,
  b,
  c,
  onResult,
}: {
  a:bigint|undefined,
  b:bigint|undefined,
  c:bigint|undefined,
  onResult: (proof: Proof) => void;
}) {
  const { client } = useCircuit();
  return (
      <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={!client || !a || !b || !c}
        onClick={async () => {
          alert("Generating proof...");
          if (!client) alert("Client is not ready");
          else if (!a) alert("a pubkey is not ready");
          else if (!b) alert("b is not ready");
          else if (!c) alert("c is not ready");
          else {
            client
              .prove({a,b,c})
              .then(onResult);
          }
        }}
      >
        Generate proof
      </button>
  );
}

export default GenZKP;
