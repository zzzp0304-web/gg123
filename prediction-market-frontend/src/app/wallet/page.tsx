"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useWeb3 } from "@/providers/Web3Provider";
import { ethers } from "ethers";

interface Transaction {
  id: string;
  type: "deposit" | "bet" | "withdraw";
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  txHash?: string;
}

export default function WalletPage() {
  const { t } = useTranslation();
  const { account, isConnected } = useWeb3();
  const [balance, setBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (isConnected && account) {
      fetchBalance();
      fetchTransactions();
    }
  }, [isConnected, account]);

  const fetchBalance = async () => {
    try {
      const response = await fetch(`/api/balance?address=${account}`);
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance || 0);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions?address=${account}`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert(t("wallet.enterAmount"));
      return;
    }

    if (!isConnected || !account) {
      alert(t("errors.walletNotConnected"));
      return;
    }

    setIsDepositing(true);

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask not installed");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const platformAddress = process.env.NEXT_PUBLIC_PLATFORM_ADDRESS || "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
      
      const tx = await signer.sendTransaction({
        to: platformAddress,
        value: ethers.parseEther(depositAmount),
      });

      alert(`${t("wallet.transactionPending")}... TX: ${tx.hash}`);

      const receipt = await tx.wait();

      if (receipt && receipt.status === 1) {
        const response = await fetch("/api/balance/deposit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: account,
            amount: parseFloat(depositAmount),
            txHash: tx.hash,
          }),
        });

        if (response.ok) {
          alert(t("wallet.depositSuccess"));
          setDepositAmount("");
          fetchBalance();
          fetchTransactions();
        } else {
          alert(t("wallet.depositFailed"));
        }
      } else {
        alert(t("wallet.transactionFailed"));
      }
    } catch (error: any) {
      console.error("Deposit failed:", error);
      if (error.code === "ACTION_REJECTED") {
        alert("Transaction rejected by user");
      } else {
        alert(`${t("wallet.depositFailed")}: ${error.message || t("errors.unknownError")}`);
      }
    } finally {
      setIsDepositing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="w-full min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">{t("wallet.connectWallet")}</h1>
          <p className="text-[#9CA3AF]">{t("errors.walletNotConnected")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">{t("navigation.wallet")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
            <div className="text-[#9CA3AF] text-sm mb-2">{t("wallet.platformBalance")}</div>
            <div className="text-4xl font-bold text-[#F3BA2F] mb-4">
              {balance.toFixed(4)} BNB
            </div>
            <div className="text-[#9CA3AF] text-xs">
              ≈ ${(balance * 600).toFixed(2)} USD
            </div>
          </div>

          {/* Wallet Address */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A] lg:col-span-2">
            <div className="text-[#9CA3AF] text-sm mb-2">Wallet Address</div>
            <div className="text-white font-mono text-sm break-all bg-[#0A0A0A] p-3 rounded-lg">
              {account}
            </div>
          </div>
        </div>

        {/* Deposit Section */}
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A] mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t("wallet.depositBNB")}</h2>
          
          <div className="max-w-md">
            <label className="text-sm text-[#9CA3AF] mb-2 block">
              {t("wallet.depositAmount")}
            </label>
            <div className="relative mb-4">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full bg-[#0A0A0A] text-white px-4 py-3 pr-16 rounded-lg border border-[#2A2A2A] focus:border-[#F3BA2F] focus:outline-none transition-colors duration-150"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] font-semibold">
                BNB
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {["0.1", "0.5", "1", "5"].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDepositAmount(amount)}
                  className="py-2 px-3 bg-[#0A0A0A] text-[#9CA3AF] rounded-lg border border-[#2A2A2A] hover:border-[#F3BA2F] hover:text-[#F3BA2F] transition-all duration-150"
                >
                  {amount}
                </button>
              ))}
            </div>

            <button
              onClick={handleDeposit}
              disabled={isDepositing || !depositAmount || parseFloat(depositAmount) <= 0}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-150 ${
                isDepositing || !depositAmount || parseFloat(depositAmount) <= 0
                  ? "bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed"
                  : "bg-[#F3BA2F] text-black hover:bg-[#F4C94F]"
              }`}
            >
              {isDepositing ? t("wallet.transactionPending") : t("wallet.deposit")}
            </button>

            <div className="mt-4 p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
              <div className="text-xs text-[#9CA3AF]">
                💡 {t("wallet.depositBNB")} from your MetaMask/Trust Wallet to start trading
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
          <h2 className="text-2xl font-bold text-white mb-6">{t("wallet.transactionHistory")}</h2>
          
          {transactions.length === 0 ? (
            <div className="text-center text-[#9CA3AF] py-12">
              {t("wallet.noTransactions")}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    <th className="text-left text-[#9CA3AF] font-medium text-sm py-3 px-4">
                      {t("wallet.type")}
                    </th>
                    <th className="text-left text-[#9CA3AF] font-medium text-sm py-3 px-4">
                      {t("currency.amount")}
                    </th>
                    <th className="text-left text-[#9CA3AF] font-medium text-sm py-3 px-4">
                      {t("wallet.status")}
                    </th>
                    <th className="text-left text-[#9CA3AF] font-medium text-sm py-3 px-4">
                      {t("wallet.date")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-[#2A2A2A] hover:bg-[#0A0A0A] transition-colors duration-150">
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.type === "deposit" ? "bg-[#00D4AA]/20 text-[#00D4AA]" :
                          tx.type === "bet" ? "bg-[#F3BA2F]/20 text-[#F3BA2F]" :
                          "bg-[#F97066]/20 text-[#F97066]"
                        }`}>
                          {tx.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white font-medium">
                        {tx.type === "deposit" ? "+" : "-"}{tx.amount.toFixed(4)} BNB
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.status === "completed" ? "bg-[#00D4AA]/20 text-[#00D4AA]" :
                          tx.status === "pending" ? "bg-[#F3BA2F]/20 text-[#F3BA2F]" :
                          "bg-[#F97066]/20 text-[#F97066]"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#9CA3AF] text-sm">
                        {new Date(tx.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
