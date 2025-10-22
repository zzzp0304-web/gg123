"use client";

import { useTranslation } from "react-i18next";
import { getAllMarkets } from "@/data/topicMarkets";
import { useState } from "react";
import Link from "next/link";

export default function MarketsPage() {
  const { t } = useTranslation();
  const allMarkets = getAllMarkets();
  const [filter, setFilter] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  let filteredMarkets = [...allMarkets];
  
  if (categoryFilter !== "all") {
    filteredMarkets = filteredMarkets.filter(m => m.category === categoryFilter);
  }
  
  if (filter === "open") {
    filteredMarkets = filteredMarkets.filter(m => m.status === "active" || !m.status);
  }
  
  filteredMarkets.sort((a, b) => {
    if (filter === "volume") {
      const aVol = parseFloat(a.volume.replace(/[^0-9.]/g, ''));
      const bVol = parseFloat(b.volume.replace(/[^0-9.]/g, ''));
      return bVol - aVol;
    }
    if (filter === "trending") {
      return b.participants - a.participants;
    }
    if (filter === "ending") {
      if (!a.endDate) return 1;
      if (!b.endDate) return -1;
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
    return 0;
  });

  return (
    <div className="w-full min-h-screen bg-[#111212] px-6 py-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6">{t("navigation.markets")}</h1>
        
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => setFilter("newest")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "newest" 
                  ? "bg-[#F3BA2F] text-black" 
                  : "bg-[#1E1E1E] text-[#838587] hover:text-white"
              }`}
            >
              {t("filters.newest")}
            </button>
            <button 
              onClick={() => setFilter("trending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "trending" 
                  ? "bg-[#F3BA2F] text-black" 
                  : "bg-[#1E1E1E] text-[#838587] hover:text-white"
              }`}
            >
              {t("filters.trending")}
            </button>
            <button 
              onClick={() => setFilter("volume")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "volume" 
                  ? "bg-[#F3BA2F] text-black" 
                  : "bg-[#1E1E1E] text-[#838587] hover:text-white"
              }`}
            >
              {t("filters.volume")}
            </button>
            <button 
              onClick={() => setFilter("ending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "ending" 
                  ? "bg-[#F3BA2F] text-black" 
                  : "bg-[#1E1E1E] text-[#838587] hover:text-white"
              }`}
            >
              {t("filters.ending")}
            </button>
            <button 
              onClick={() => setFilter("open")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "open" 
                  ? "bg-[#F3BA2F] text-black" 
                  : "bg-[#1E1E1E] text-[#838587] hover:text-white"
              }`}
            >
              {t("filters.open")}
            </button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setCategoryFilter("all")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${categoryFilter === "all" ? "bg-[#F3BA2F] text-black" : "bg-[#1E1E1E] text-[#838587]"}`}>{t("filters.all")}</button>
            <button onClick={() => setCategoryFilter("crypto")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${categoryFilter === "crypto" ? "bg-[#F3BA2F] text-black" : "bg-[#1E1E1E] text-[#838587]"}`}>{t("topics.crypto")}</button>
            <button onClick={() => setCategoryFilter("sports")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${categoryFilter === "sports" ? "bg-[#F3BA2F] text-black" : "bg-[#1E1E1E] text-[#838587]"}`}>{t("topics.sports")}</button>
            <button onClick={() => setCategoryFilter("politics")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${categoryFilter === "politics" ? "bg-[#F3BA2F] text-black" : "bg-[#1E1E1E] text-[#838587]"}`}>{t("topics.politics")}</button>
            <button onClick={() => setCategoryFilter("economy")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${categoryFilter === "economy" ? "bg-[#F3BA2F] text-black" : "bg-[#1E1E1E] text-[#838587]"}`}>{t("topics.economy")}</button>
            <button onClick={() => setCategoryFilter("gaming")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${categoryFilter === "gaming" ? "bg-[#F3BA2F] text-black" : "bg-[#1E1E1E] text-[#838587]"}`}>{t("topics.gaming")}</button>
            <button onClick={() => setCategoryFilter("culture")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${categoryFilter === "culture" ? "bg-[#F3BA2F] text-black" : "bg-[#1E1E1E] text-[#838587]"}`}>{t("topics.culture")}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMarkets.map((market) => (
            <Link 
              key={market.id}
              href={`/markets/${market.id}`}
              className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#F3BA2F] transition-all duration-150 cursor-pointer group"
            >
              <div className="relative h-40 bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E] overflow-hidden">
                <img 
                  src={market.image} 
                  alt={market.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.src = "/carousel_12.png";
                  }}
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-[#F3BA2F] text-xs font-medium">
                  {t(`topics.${market.category}`)}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white text-sm font-medium mb-3 line-clamp-2 min-h-[40px]">
                  {market.title}
                </h3>
                
                <div className="space-y-2 mb-3">
                  {market.options.map((option, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <button className="flex-1 bg-[#2A2A2A] hover:bg-[#F3BA2F] hover:text-black text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors mr-2">
                        {option.text}
                      </button>
                      <span className="text-[#F3BA2F] text-xs font-bold min-w-[45px] text-right">
                        {option.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                  <div className="flex items-center gap-1 text-[#838587] text-xs">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>{market.participants}</span>
                  </div>
                  <div className="text-[#F3BA2F] text-xs font-medium">
                    {market.volume}
                  </div>
                  {market.endDate && (
                    <div className="text-[#838587] text-xs">
                      {market.endDate}
                    </div>
                  )}
                  {market.status === 'perpetual' && (
                    <div className="text-[#838587] text-xs">PERP</div>
                  )}
                  {market.status === 'ended' && (
                    <div className="text-[#838587] text-xs">HIT</div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
