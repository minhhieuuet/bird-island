import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract(address, ABI, withSigner = false) {
  const { library, account } = useWeb3React();

  return useMemo(
    () =>
      !!address && !!ABI && !!library && window.web3
        ? new window.web3.eth.Contract(ABI, address)
        : undefined,
    [address, ABI, withSigner, library, account]
  );
}
