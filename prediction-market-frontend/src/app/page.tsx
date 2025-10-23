"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/providers/GlobalContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllMarkets } from "@/data/topicMarkets";
import { getTranslatedMarketTitle } from "@/utils/translations";
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

  // Get all markets first
  const allMarkets = getAllMarkets();

  // Featured prediction carousel data
  const featuredMarkets = [
    {
      id: "g2", 
      title: "GTA 6 Release",
      titleKey: "markets.gta6Release2025",
      subtitle: "Will it release in 2025?",
      image: "/featured-markets/gta6.jpg",
      prizePool: "456k Volume",
      topPrize: "3,456 Participants",
      totalWinners: "78% Yes",
      buttonText: "Predict Now"
    },
    {
      id: "g1",
      title: "LoL Worlds 2025",
      titleKey: "markets.lolWorldsT1Win",
      subtitle: "T1 to win again?",
      image: "/assets/lol-2025-worlds.jpg",
      prizePool: "500 Million Points",
      topPrize: "100 Million Points",
      totalWinners: "150",
      buttonText: "Predict Now"
    },
    {
      id: "6",
      title: "Real Madrid",
      titleKey: "markets.realMadridChampionsLeague",
      subtitle: "Will they win Champions League?",
      image: "/featured-markets/madrid.avif",
      prizePool: "30.8k Volume",
      topPrize: "331 Participants",
      totalWinners: "56% Yes",
      buttonText: "Predict Now"
    },
    {
      id: "c1",
      title: "Barbie Movie",
      titleKey: "markets.barbieBoxOffice",
      subtitle: "Will it break box office records?",
      image: "/featured-markets/barbie.jpg",
      prizePool: "24.4k Volume",
      topPrize: "300 Participants",
      totalWinners: "56% Yes",
      buttonText: "Predict Now"
    },
    {
      id: "1",
      title: "ZCASH vs MONERO",
      titleKey: "markets.willZcashFlipMonero",
      subtitle: "Which flips first?",
      image: "/featured-markets/zcash_vs_monero.webp",
      prizePool: "1.4k Volume",
      topPrize: "18 Participants",
      totalWinners: "56% Yes",
      buttonText: "Predict Now"
    }
  ];

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMarkets.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredMarkets.length]);

  const currentMarket = featuredMarkets[currentSlide];
  const currentMarketData = allMarkets.find(m => m.id === currentMarket.id);
  const topMarkets = allMarkets
    .filter(m => m.status !== "ended" && m.id !== "p5") // Exclude China-Taiwan market
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 11); // Take 11 instead of 12
  
  // Add ZCASH vs MONERO market to the top markets
  const zcashMarket = allMarkets.find(m => m.id === "1");
  if (zcashMarket) {
    topMarkets.push(zcashMarket);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
      {/* Featured Prediction Banner */}
      <div className="relative overflow-hidden mb-8">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <Link 
              href={currentMarketData ? `/markets/${currentMarketData.slug}` : '/markets'}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 relative">
                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSlide((prev) => (prev - 1 + featuredMarkets.length) % featuredMarkets.length);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSlide((prev) => (prev + 1) % featuredMarkets.length);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="relative h-64 md:h-80">
                  <img 
                    src={currentMarket.image} 
                    alt={currentMarket.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      currentMarket.id === "c1" ? "object-[center_top]" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Blurred bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-white/10">
                    <div className="flex items-center justify-between p-4">
                      {/* Left side - Image and text */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black/60 rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            src={currentMarket.image} 
                            alt={currentMarket.title} 
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            {currentMarket.titleKey ? t(currentMarket.titleKey) : currentMarket.title}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {currentMarket.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Right side - Button */}
                      <div className="flex items-center">
                        <button className="bg-black/80 hover:bg-black text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-white/20 cursor-pointer">
                          <img src="/assets/bnb.png" alt="BNB" className="w-4 h-4" />
                          Predict
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {featuredMarkets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-[#F3BA2F] scale-125' 
                      : 'bg-[#6B7280] hover:bg-[#9CA3AF]'
                  }`}
                />
              ))}
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
                href={`/markets/${market.slug}`}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105"
              >
                {/* Header Image */}
                <div className="relative w-full h-24 overflow-hidden">
                  <img 
                    src={market.image} 
                    alt={market.title}
                    className={`w-full h-full object-cover ${
                      market.id === "c1" || market.id === "g2" || market.id === "c2" || market.id === "p1" ? "object-top" : 
                      market.id === "g1" || market.id === "s3" || market.id === "g5" || market.id === "e2" ? "object-center" :
                      market.id === "9" ? "object-left" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Question */}
                  <div className="text-center h-12 flex items-start justify-center pt-2">
                    <h3 className="text-white text-sm font-bold leading-tight px-2">
                      {getTranslatedMarketTitle(market, t)}
                    </h3>
                  </div>

                  {/* Percentage Bar */}
                  <div className="flex items-center gap-3 h-6">
                    <span className="text-white text-sm font-semibold w-8 text-center">
                      {market.options[0].percentage}%
                    </span>
                    <div className="flex-1 h-2 bg-[#6b7280] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#F3BA2F] rounded-full transition-all duration-300"
                        style={{ width: `${market.options[0].percentage}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-semibold w-8 text-center">
                      {market.options[1].percentage}%
                    </span>
                  </div>

                  {/* Option Buttons */}
                  <div className="flex gap-2 h-12">
                     <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#F3BA2F] to-[#E8A202] hover:from-[#E8A202] hover:to-[#D4941A] border-2 border-[#F3BA2F] rounded-lg cursor-pointer transition-all duration-150 flex justify-center items-center shadow-lg hover:scale-105">
                       <span className="text-white text-sm font-bold">{market.options[0].text}</span>
                     </button>
                     <button className="flex-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150 flex justify-center items-center shadow-lg hover:scale-105" style={{background: 'linear-gradient(to right, #6b7280, #4b5563)', border: '2px solid #6b7280'}}>
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
