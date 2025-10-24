"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "../components/layouts";
import { GlobalProvider } from "@/providers/GlobalContext";
import { Web3Provider } from "@/providers/Web3Provider";
import "react-multi-carousel/lib/styles.css";
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
  return (
    <html lang="zh">
      <Head>
        <title>预见 - Yujian Markets</title>
        <link rel="icon" href="/favicon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
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
        <Web3Provider>
          <GlobalProvider>
            <ToastContainer />
            <Layout>{children}</Layout>
          </GlobalProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
