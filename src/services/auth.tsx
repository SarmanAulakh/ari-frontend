import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import { Web3AuthCore } from '@web3auth/core';
import { ADAPTER_EVENTS, SafeEventEmitterProvider, WALLET_ADAPTER_TYPE } from '@web3auth/base';
import { CHAIN_CONFIG } from 'src/config/chainConfig';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import type { LOGIN_PROVIDER_TYPE } from '@toruslabs/openlogin';
import { Web3AuthUserDetails } from 'types/user';

export interface IWeb3AuthContext {
  provider: SafeEventEmitterProvider | null;
  isLoading: boolean;
  initialized: boolean;
  user: string | null;
  userDetails: Web3AuthUserDetails | null;
  login: (adapter: WALLET_ADAPTER_TYPE, provider: LOGIN_PROVIDER_TYPE, login_hint?: string) => Promise<string>;
  logout: () => Promise<void>;
  setUserInfo: () => Promise<any>;
  signMessage: () => Promise<any>;
  getBalance: () => Promise<any>;
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  provider: null,
  isLoading: true,
  initialized: false,
  user: null,
  userDetails: null,
  login: async (adapter: WALLET_ADAPTER_TYPE, provider?: LOGIN_PROVIDER_TYPE, login_hint?: string) => "",
  logout: async () => {},
  setUserInfo: async () => {},
  signMessage: async () => {},
  getBalance: async () => {},
});

export function useWeb3Auth() {
  return useContext(Web3AuthContext);
}

interface IWeb3AuthProps {
  children?: ReactNode;
}

export default function AuthService({ children }: IWeb3AuthProps) {
  const router = useRouter();
  const [web3AuthCore, setWeb3AuthCore] = useState<Web3AuthCore | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<Web3AuthUserDetails | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3AuthCore) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data: any) => {
        // successfully logged in
        setProvider(web3auth?.provider! as SafeEventEmitterProvider);
        const walletAddress = await getWalletAddress(web3auth?.provider);
        setWalletAddress(walletAddress);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        // connecting
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        // successfully logged out
        setWalletAddress(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: unknown) => {
        console.error('some error or user has cancelled login request', error);
      });
    };

    async function init() {
      try {
        setIsLoading(true);
        setInitialized(false);
        const web3authCore = new Web3AuthCore({
          chainConfig: CHAIN_CONFIG.mumbai,
          enableLogging: true,
        });

        const adapter = new OpenloginAdapter({
          adapterSettings: {
            network: 'testnet',
            clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT!, // clientId can be anything on localhost
          },
        });

        web3authCore.configureAdapter(adapter);
        subscribeAuthEvents(web3authCore);
        setWeb3AuthCore(web3authCore);
        await web3authCore.init();
        setInitialized(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const login = async (adapter: WALLET_ADAPTER_TYPE, loginProvider: LOGIN_PROVIDER_TYPE, login_hint?: string) => {
    let walletAddress = "";
    try {
      setIsLoading(true);
      if (!web3AuthCore) {
        throw new Error('web3auth not initialized yet');
      }
      const localProvider = await web3AuthCore.connectTo(adapter, { loginProvider, login_hint });
      setUserInfo();
      setProvider(localProvider as SafeEventEmitterProvider);
      walletAddress = await getWalletAddress(localProvider) as string;
      setWalletAddress(walletAddress);

      // redirect
      const returnUrl = router.query.returnUrl || '/';
      if (typeof returnUrl === 'string') {
        router.push(returnUrl);
      } else {
        router.push(returnUrl[0]);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
    return walletAddress;
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      if (!web3AuthCore) {
        console.log('web3auth not initialized yet');
        return;
      }
      await web3AuthCore.logout();
      setProvider(null);

      // redirect
      router.push('/');
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserInfo = async () => {
    try {
      setIsLoading(true);
      if (!web3AuthCore) {
        console.log('web3auth not initialized yet');
        return;
      }
      const details = (await web3AuthCore.getUserInfo()) as Web3AuthUserDetails;
      setUserDetails(details);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWalletAddress = async (localProvider: any) => {
    try {
      setIsLoading(true);
      if (!localProvider) {
        console.log('provider not initialized yet');
        return null;
      }
      const web3 = new Web3(localProvider as any);
      const address = (await web3.eth.getAccounts())[0];
      return address;
    } catch (error) {
      console.error('Error', error);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const getBalance = async () => {
    try {
      setIsLoading(true);
      if (!provider) {
        console.log('provider not initialized yet');
        return;
      }
      const web3 = new Web3(provider as any);
      const address = (await web3.eth.getAccounts())[0];
      return await web3.eth.getBalance(address);
    } catch (error) {
      console.error('Error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signMessage = async () => {
    try {
      setIsLoading(true);
      if (!provider) {
        console.log('provider not initialized yet');
        return;
      }
      const pubKey = (await provider.request({ method: 'eth_accounts' })) as string[];
      const web3 = new Web3(provider as any);
      const message = '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad';
      (web3.currentProvider as any)?.send(
        {
          method: 'eth_sign',
          params: [pubKey[0], message],
          from: pubKey[0],
        },
        (err: Error, result: any) => {
          if (err) {
            console.error('Error', err);
          }
        }
      );
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextProvider = {
    provider,
    user: walletAddress,
    isLoading,
    initialized,
    login,
    logout,
    userDetails,
    setUserInfo,
    getBalance,
    signMessage,
  };

  return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;
}
