"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, Eip1193Provider } from 'ethers';

interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: BrowserProvider | null;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  chainId: null,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  provider: null,
});

export const useWeb3 = () => useContext(Web3Context);

const BSC_MAINNET_CHAIN_ID = 56;
const BSC_TESTNET_CHAIN_ID = 97;

export function Web3Provider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAccount = localStorage.getItem('walletAccount');
    if (savedAccount && typeof window !== 'undefined' && window.ethereum) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const ethereum = window.ethereum as Eip1193Provider;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
        localStorage.setItem('walletAccount', accounts[0]);
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      setChainId(parseInt(chainIdHex, 16));
      // Reload the page as recommended by MetaMask
      window.location.reload();
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged as any);
    ethereum.on?.('chainChanged', handleChainChanged as any);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged as any);
      ethereum.removeListener?.('chainChanged', handleChainChanged as any);
    };
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('Please install MetaMask to use this application!');
      return;
    }

    try {
      const ethereum = window.ethereum as Eip1193Provider;
      const ethersProvider = new BrowserProvider(ethereum);
      setProvider(ethersProvider);

      // Request account access
      const accounts = await ethereum.request?.({ method: 'eth_requestAccounts' }) as string[];
      
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        localStorage.setItem('walletAccount', accounts[0]);

        // Get current chain ID
        const network = await ethersProvider.getNetwork();
        setChainId(Number(network.chainId));

        // Optionally switch to BSC if not already on it
        try {
          await switchToBSC(ethereum);
        } catch (error) {
          console.log('User declined network switch or network not configured');
        }
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      if (error.code === 4001) {
        alert('Please connect your MetaMask wallet to continue');
      }
    }
  };

  const switchToBSC = async (ethereum: Eip1193Provider) => {
    try {
      // Try switching to BSC Mainnet
      await ethereum.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${BSC_MAINNET_CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await ethereum.request?.({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${BSC_MAINNET_CHAIN_ID.toString(16)}`,
                chainName: 'BNB Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/'],
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add BSC network:', addError);
        }
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setProvider(null);
    localStorage.removeItem('walletAccount');
  };

  const value = {
    account,
    chainId,
    isConnected: !!account,
    connectWallet,
    disconnectWallet,
    provider,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

// Extend window type for ethereum
declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}
