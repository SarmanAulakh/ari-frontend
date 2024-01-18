import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

export const CHAIN_CONFIG = {
  polygon: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com/",
    chainId: "0x89",
    displayName: "Polygon Mainnet",
    ticker: "matic",
    tickerName: "Matic",
  } as CustomChainConfig,
  
  mumbai: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: "https://rpc-mumbai.maticvigil.com/v1/bd7cef8cfa6c5b61d01ef9aae3b2948212c2d6b2",
    blockExplorer: "https://mumbai.polygonscan.com/",
    chainId: "0x13881",
    displayName: "Mumbai Testnet",
    ticker: "matic",
    tickerName: "Matic",
  } as CustomChainConfig,
} as const;

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;