"use client";

import { useParams } from "next/navigation";
import { getAllMarkets } from "@/data/topicMarkets";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/elements/Icons";
import { useWeb3 } from "@/providers/Web3Provider";

export default function MarketDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { account, isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRules, setShowRules] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  
  const allMarkets = getAllMarkets();
  const market = allMarkets.find((m) => m.id === params.id);

  useEffect(() => {
    if (market && market.options.length > 0) {
      setSelectedOption(0);
    }
  }, [market]);

  useEffect(() => {
    if (isConnected && account) {
      fetchBalance();
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

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t("market.marketNotFound")}</h1>
          <Link href="/markets" className="text-[#F3BA2F] hover:underline">
            {t("market.backToMarkets")}
          </Link>
        </div>
      </div>
    );
  }

  const handleBet = async () => {
    if (!amount || selectedOption === null) {
      alert("Please enter an amount and select an option");
      return;
    }

    if (!isConnected || !account) {
      alert(t("errors.walletNotConnected"));
      return;
    }

    const betAmount = parseFloat(amount);

    if (balance < betAmount) {
      alert(`${t("errors.insufficientBalance")}. ${t("wallet.balance")}: ${balance.toFixed(4)} BNB`);
      return;
    }
    
    try {
      const response = await fetch("/api/bets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marketId: market.id,
          option: selectedOption,
          amount: betAmount,
          optionText: market.options[selectedOption].text,
          userAddress: account,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        alert(`${t("common.error")}: ${errorData.error || t("errors.pleaseTryAgain")}`);
        return;
      }

      const balanceResponse = await fetch("/api/balance/deduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: account,
          amount: betAmount,
          reason: `Bet on market ${market.id}`,
        }),
      });

      if (!balanceResponse.ok) {
        const errorData = await balanceResponse.json().catch(() => ({ error: "Failed to deduct balance" }));
        console.error("Balance deduction failed after bet placement:", errorData);
      }

      alert(`${t("market.placeBet")} ${t("common.success")}!\n${amount} BNB on ${market.options[selectedOption].text}`);
      setAmount("");
      fetchBalance();
    } catch (error) {
      console.error("Bet submission failed:", error);
      alert(`${t("common.error")}: ${t("errors.networkError")}`);
    }
  };

  const option1 = market.options[0];
  const option2 = market.options[1];

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-6">
          <Link href="/markets" className="hover:text-[#F3BA2F] transition-colors duration-150">
            {t("navigation.markets")}
          </Link>
          <span>/</span>
          <span className="text-white">{market.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Market Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={market.image}
                  alt={market.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{market.title}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[#F3BA2F] font-semibold">{market.volume}</span>
                    {market.status === "perpetual" ? (
                      <span className="text-[#9CA3AF]">{t("market.perpetualMarket")}</span>
                    ) : market.endDate ? (
                      <span className="text-[#9CA3AF]">{t("market.endsLower")} {market.endDate}</span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Options Display */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#00D4AA] font-semibold">{option1.text}</span>
                    <span className="text-[#00D4AA] text-lg font-bold">{option1.percentage}%</span>
                  </div>
                  <div className="text-xs text-[#9CA3AF]">{option1.percentage}% {t("market.chance")}</div>
                </div>
                <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F97066] font-semibold">{option2.text}</span>
                    <span className="text-[#F97066] text-lg font-bold">{option2.percentage}%</span>
                  </div>
                  <div className="text-xs text-[#9CA3AF]">{option2.percentage}% {t("market.chance")}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            {market.description && (
              <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
                <h2 className="text-lg font-bold text-white mb-3">{t("market.aboutThisMarket")}</h2>
                <p className="text-[#9CA3AF] leading-relaxed">{market.description}</p>
              </div>
            )}

            {/* Rules Section */}
            {market.rules && (
              <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
                <button
                  onClick={() => setShowRules(!showRules)}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h2 className="text-lg font-bold text-white">{t("market.rules")}</h2>
                  <Icon
                    name={showRules ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#9CA3AF"
                  />
                </button>
                {showRules && (
                  <div className="prose prose-invert max-w-none">
                    <div className="text-[#9CA3AF] leading-relaxed whitespace-pre-line">
                      {market.rules}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
              <h2 className="text-lg font-bold text-white mb-4">{t("market.timeline")}</h2>
              <div className="space-y-4">
                {market.createdAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F3BA2F] mt-2"></div>
                    <div>
                      <div className="text-white font-medium">{t("market.marketPublished")}</div>
                      <div className="text-sm text-[#9CA3AF]">{market.createdAt}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#9CA3AF] mt-2"></div>
                  <div>
                    <div className="text-white font-medium">
                      {market.status === "perpetual" ? t("market.neverCloses") : `${t("market.closes")} ${market.endDate || "TBD"}`}
                    </div>
                    <div className="text-sm text-[#9CA3AF]">
                      {market.status === "perpetual" ? t("market.perpetualMarketsNeverClose") : t("market.marketClosesAndResultsFinalized")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Betting Interface */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
              {/* Buy/Sell Tabs */}
              <div className="flex gap-2 mb-6 bg-[#0A0A0A] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("buy")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-150 ${
                    activeTab === "buy"
                      ? "bg-[#F3BA2F] text-black"
                      : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {t("market.buy")}
                </button>
                <button
                  onClick={() => setActiveTab("sell")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-150 ${
                    activeTab === "sell"
                      ? "bg-[#F3BA2F] text-black"
                      : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {t("market.sell")}
                </button>
              </div>

              {/* Probability Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#9CA3AF]">{option1.percentage}%</span>
                  <span className="text-[#9CA3AF]">{option2.percentage}%</span>
                </div>
                <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${option1.percentage}%` }}
                    className="bg-gradient-to-r from-[#00D4AA] to-[#00D4AA]"
                  ></div>
                  <div
                    style={{ width: `${option2.percentage}%` }}
                    className="bg-gradient-to-r from-[#F97066] to-[#F97066]"
                  ></div>
                </div>
                <div className="text-center text-xs text-[#9CA3AF] mt-2">{t("market.pickASide")}</div>
              </div>

              {/* Option Selection Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setSelectedOption(0)}
                  className={`py-3 px-4 rounded-lg font-bold transition-all duration-150 ${
                    selectedOption === 0
                      ? "bg-[#00D4AA] text-black"
                      : "bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#00D4AA]"
                  }`}
                >
                  {option1.text}
                </button>
                <button
                  onClick={() => setSelectedOption(1)}
                  className={`py-3 px-4 rounded-lg font-bold transition-all duration-150 ${
                    selectedOption === 1
                      ? "bg-[#F97066] text-black"
                      : "bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#F97066]"
                  }`}
                >
                  {option2.text}
                </button>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="text-sm text-[#9CA3AF] mb-2 block">{t("market.amount")} (BNB)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#5A5A5A] focus:border-[#F3BA2F] focus:outline-none transition-colors duration-150"
                    min="0"
                    step="0.01"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">
                    BNB
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[0.1, 0.5, 1, 5].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset.toString())}
                      className="flex-1 py-1 px-2 text-xs bg-[#0A0A0A] text-[#9CA3AF] border border-[#2A2A2A] rounded hover:border-[#F3BA2F] hover:text-[#F3BA2F] transition-all duration-150"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Place Bet Button */}
              <button
                onClick={handleBet}
                disabled={!amount || selectedOption === null || !isConnected}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-150 ${
                  amount && selectedOption !== null && isConnected
                    ? "bg-[#F3BA2F] text-black hover:bg-[#F4C94F]"
                    : "bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed"
                }`}
              >
                {!isConnected ? t("wallet.connectWallet") : activeTab === "buy" ? t("market.placeBet") : t("market.sellPosition")}
              </button>

              {/* User Balance */}
              {isConnected && (
                <div className="mt-4 p-3 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#9CA3AF] text-sm">{t("wallet.platformBalance")}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F3BA2F] font-bold">{balance.toFixed(4)} BNB</span>
                      <Link href="/wallet" className="text-xs text-[#F3BA2F] hover:underline">
                        +
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Stats */}
              <div className="mt-6 pt-6 border-t border-[#2A2A2A] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">{t("market.participants")}</span>
                  <span className="text-white font-medium">{market.participants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">{t("market.totalVolume")}</span>
                  <span className="text-white font-medium">{market.volume}</span>
                </div>
                {market.resolutionSource && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">{t("market.resolutionSource")}</span>
                    <span className="text-white font-medium">{market.resolutionSource}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
