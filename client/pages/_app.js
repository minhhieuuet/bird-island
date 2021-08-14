import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export default function NextWeb3App({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      (async () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = await new Web3(window.web3.currentProvider);
        } else {
          window.alert(
            "Non ethereum detected. Please download and install MetaMask"
          );
        }
      })();
    })();
  }, []);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
