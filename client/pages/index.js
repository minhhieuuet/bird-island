import { verifyMessage } from "@ethersproject/wallet";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";
import useContract from "../hooks/useContract";
import dssAbi from "../abis/DragonSoul.json";

export default function Home() {
  const { account, library, chainId } = useWeb3React();
  const [dssBalance, setDssBalance] = useState("");
  const dssContract = useContract(dssAbi.networks[5777].address, dssAbi.abi);
  const triedToEagerConnect = useEagerConnect();

  const sign = usePersonalSign();

  const handleSign = async () => {
    const msg = "Next Web3 Boilerplate Rules";
    const sig = await sign(msg);
    console.log(sig);
    console.log("isValid", verifyMessage(msg, sig) === account);
  };

  const isConnected = typeof account === "string" && !!library;
  const getDssBalance = async () => {
    const balance = await dssContract?.methods.balanceOf(account).call();
    setDssBalance(web3.utils.fromWei(balance?.toString() ?? "0"));
  };
  const options = {
    filter: {
      value: [],
    },
    fromBlock: 0,
  };

  useEffect(() => {
    (async () => {
      await getDssBalance();
    })();
    dssContract?.events.Transfer(options).on('data', async event => {
      await getDssBalance();
    })
    .on('changed', async changed => {
      await getDssBalance();
    })
    .on('error', err => console.log(err))
    .on('connected', str => console.log(str))
  }, [account]);

  return (
    <div>
      <Head>
        <title>Next Web3 Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>Next Web3 Boilerplate</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>Welcome to BirdIsland</h1>
        <div>
          Network: {chainId == 1337 && "Ganache"}{" "}
          {chainId == 97 && "Binace Smart Chain Testnet"}{" "}
          {chainId == 56 && "Binace Smart Chain"}
          <br />
          Dragon Soul Stone: {dssBalance} DSS
        </div>
        {isConnected && (
          <section>
            <ETHBalance />
            <button onClick={handleSign}>Personal Sign</button>
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
        }

        html {
          font-family: sans-serif, Apple Color Emoji, Segoe UI Emoji,
            Segoe UI Symbol, Noto Color Emoji;
          line-height: 1.5;
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
