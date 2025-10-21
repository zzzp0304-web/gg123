"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "../components/layouts";
import { GlobalProvider } from "@/providers/GlobalContext";
import "react-multi-carousel/lib/styles.css";
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';
import { ToastContainer } from "react-toastify";
import "../i18n";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <html lang="zh">
      <Head>
        <title>预见 - Yujian Markets</title>
        <meta name="description" content="预见市场 - 基于BNB的预测交易平台，让您预测未来" />
        <meta name="keywords" content="预测市场, BNB, 区块链, 交易, 预见, Yujian Markets" />
        <meta property="og:title" content="预见 - Yujian Markets" />
        <meta property="og:description" content="预见市场 - 基于BNB的预测交易平台" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="预见 - Yujian Markets" />
        <meta name="twitter:description" content="预见市场 - 基于BNB的预测交易平台" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <ToastContainer />
              <GlobalProvider>
                <Layout>{children}</Layout>
              </GlobalProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
