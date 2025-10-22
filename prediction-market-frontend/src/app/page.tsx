"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/providers/GlobalContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllMarkets } from "@/data/topicMarkets";
import Link from "next/link";

export default function Home() {
  const pathname = usePathname();
  const { setActiveTab } = useGlobalContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("ACTIVE");
    }
  }, [pathname, setActiveTab]);

  // Featured prediction data
  const featuredPrediction = {
    title: "LoL Worlds 2025",
    subtitle: "Predict to win big prizes",
    image: "/assets/lol-2025-worlds.jpg",
    prizePool: "500 Million Points",
    topPrize: "100 Million Points",
    totalWinners: "150",
    buttonText: "Predict Now"
  };

  // Get top 8 markets for home page
  const allMarkets = getAllMarkets();
  const topMarkets = allMarkets
    .filter(m => m.status !== "ended")
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
      {/* Featured Prediction Banner */}
      <div className="relative overflow-hidden mb-8">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-64 md:h-80">
                <img 
                  src={featuredPrediction.image} 
                  alt={featuredPrediction.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Blurred bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-white/10">
                  <div className="flex items-center justify-between p-4">
                    {/* Left side - Image and text */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-black/60 rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src="/assets/Untitled-2.png" 
                          alt="Prediction" 
                          className="w-12 h-12 object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">
                          {featuredPrediction.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {featuredPrediction.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Right side - Button */}
                    <div className="flex items-center">
                      <button className="bg-black/80 hover:bg-black text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-white/20">
                        <img src="/assets/bnb.png" alt="BNB" className="w-4 h-4" />
                        Predict
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Cards Grid */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topMarkets.map((market) => (
              <Link 
                key={market.id} 
                href={`/markets/${market.id}`}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105"
              >
                {/* Header Image */}
                <div className="relative w-full h-24 overflow-hidden">
                  <img 
                    src={market.image} 
                    alt={market.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Question */}
                  <div className="text-center h-12 flex items-start justify-center pt-2">
                    <h3 className="text-white text-sm font-bold leading-tight px-2">
                      {market.title}
                    </h3>
                  </div>

                  {/* Percentage Bar */}
                  <div className="flex items-center gap-3 h-6">
                    <span className="text-white text-sm font-semibold w-8 text-center">
                      {market.options[0].percentage}%
                    </span>
                    <div className="flex-1 h-2 bg-[#F3BA2F] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-300"
                        style={{ width: `${market.options[0].percentage}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-semibold w-8 text-center">
                      {market.options[1].percentage}%
                    </span>
                  </div>

                  {/* Option Buttons */}
                  <div className="flex gap-2 h-12">
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#F3BA2F] to-[#E8A202] hover:from-[#E8A202] hover:to-[#D4941A] border-2 border-[#F3BA2F] rounded-lg cursor-pointer transition-all duration-150 flex justify-center items-center shadow-lg">
                      <span className="text-white text-sm font-bold">{market.options[0].text}</span>
                    </button>
                    <button className="flex-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150 flex justify-center items-center shadow-lg" style={{background: 'linear-gradient(to right, #6b7280, #4b5563)', border: '2px solid #6b7280'}}>
                      <span className="text-white text-sm font-bold">{market.options[1].text}</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
