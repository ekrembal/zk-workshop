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
    <div>
      <button
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
        Create zkp
      </button>
    </div>
  );
}

export default GenZKP;
