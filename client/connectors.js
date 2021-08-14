import { InjectedConnector } from "@web3-react/injected-connector";
const BINANCE_SMART_CHAIN_CHAINID = 56; 
const BINANCE_SMART_CHAIN_TESTNET_CHAINID = 97; 
const GANACHE_CHAINID = 1337;

export const injected = new InjectedConnector({
  supportedChainIds: [BINANCE_SMART_CHAIN_CHAINID, BINANCE_SMART_CHAIN_TESTNET_CHAINID, GANACHE_CHAINID],
});
