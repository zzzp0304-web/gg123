"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/providers/GlobalContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

  // Sample prediction cards data
  const predictionCards = [
    {
      id: 1,
      title: "Mando vs KBM on BTC's next move: 120K or 100K?",
      image: "/carousel_12.png",
      options: [
        { text: "120K", percentage: 47.1 },
        { text: "100K", percentage: 52.9 }
      ],
      participants: 549,
      volume: "$5.52m PERP"
    },
    {
      id: 2,
      title: "New Solana ATH by end of year?",
      image: "/carousel_13.png",
      options: [
        { text: "Yes", percentage: 32.5 },
        { text: "No", percentage: 67.5 }
      ],
      participants: 1150,
      volume: "$1.15k"
    },
    {
      id: 3,
      title: "Will Donald Trump visit China in 2025?",
      image: "/carousel_21.png",
      options: [
        { text: "Yes", percentage: 14.2 },
        { text: "No", percentage: 85.8 }
      ],
      participants: 1190,
      volume: "$1.19k"
    },
    {
      id: 4,
      title: "Will Polymarket announce a token this year?",
      image: "/carousel_22.png",
      options: [
        { text: "Yes", percentage: 15.3 },
        { text: "No", percentage: 84.7 }
      ],
      participants: 511,
      volume: "$511"
    },
    {
      id: 5,
      title: "Will PNKSTR hit $400M during October?",
      image: "/carousel_23.png",
      options: [
        { text: "Yes", percentage: 2.8 },
        { text: "No", percentage: 97.2 }
      ],
      participants: 690,
      volume: "$690"
    },
    {
      id: 6,
      title: "Will MetaMask launch its token before November?",
      image: "/carousel_11.png",
      options: [
        { text: "Yes", percentage: 2.3 },
        { text: "No", percentage: 97.7 }
      ],
      participants: 613,
      volume: "$613"
    }
  ];

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
            {predictionCards.map((card) => (
              <div key={card.id} className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl border border-[#374151] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="h-32 relative">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-4 line-clamp-2">
                    {card.title}
                  </h3>
                  <div className="space-y-3">
                    {card.options.map((option, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm font-medium">{option.text}</span>
                          <span className="text-[#F3BA2F] text-sm font-bold">{option.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-[#F3BA2F] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                        </div>
                        <button className="w-full bg-[#F3BA2F] hover:bg-[#E8A202] text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                          {option.text}
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-xs text-gray-400 mt-3 pt-3 border-t border-gray-700">
                      <span>+{card.participants}</span>
                      <span>{card.volume}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
