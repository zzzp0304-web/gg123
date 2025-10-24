import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "../components/layouts";
import { GlobalProvider } from "@/providers/GlobalContext";
import { Web3Provider } from "@/providers/Web3Provider";
import "react-multi-carousel/lib/styles.css";
import { ToastContainer } from "react-toastify";
import "../i18n";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "预见 - Yujian Markets",
  description: "预见市场 - 基于BNB的预测交易平台，让您预测未来",
  keywords: "预测市场, BNB, 区块链, 交易, 预见, Yujian Markets",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" }
    ],
  },
  openGraph: {
    title: "预见 - Yujian Markets",
    description: "预见市场 - 基于BNB的预测交易平台",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "预见 - Yujian Markets",
    description: "预见市场 - 基于BNB的预测交易平台",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
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
