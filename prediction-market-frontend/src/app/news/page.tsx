"use client";

import { useTranslation } from "react-i18next";

export default function NewsPage() {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      title: "BNB Chain Reaches New All-Time High in Daily Transactions",
      date: "Oct 20, 2025",
      category: "crypto",
      image: "/carousel_12.png",
      excerpt: "BNB Chain has achieved a remarkable milestone with over 15 million daily transactions..."
    },
    {
      id: 2,
      title: "Prediction Markets See Surge in Political Betting Ahead of Elections",
      date: "Oct 19, 2025",
      category: "politics",
      image: "/carousel_21.png",
      excerpt: "As global elections approach, prediction markets are witnessing unprecedented activity..."
    },
    {
      id: 3,
      title: "Gaming Industry Embraces Blockchain: Major Tournaments Go On-Chain",
      date: "Oct 18, 2025",
      category: "gaming",
      image: "/lol-2025-worlds.jpg",
      excerpt: "Leading esports organizations are integrating blockchain technology into major tournaments..."
    },
    {
      id: 4,
      title: "MetaMask Integration Drives User Growth in Prediction Platforms",
      date: "Oct 17, 2025",
      category: "crypto",
      image: "/carousel_11.png",
      excerpt: "The seamless integration of MetaMask has led to a 300% increase in new users..."
    },
    {
      id: 5,
      title: "Sports Betting Markets Hit $1B in Monthly Volume",
      date: "Oct 16, 2025",
      category: "sports",
      image: "/carousel_22.png",
      excerpt: "Decentralized sports prediction markets have reached a new milestone with $1 billion in monthly trading volume..."
    },
    {
      id: 6,
      title: "Fed Rate Decisions Drive Economic Prediction Market Activity",
      date: "Oct 15, 2025",
      category: "economy",
      image: "/carousel_13.png",
      excerpt: "Economic uncertainty has pushed prediction markets to new heights as traders speculate on Federal Reserve decisions..."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#111212] px-6 py-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">{t("navigation.news")}</h1>
        
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div 
              key={item.id}
              className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#F3BA2F] transition-all cursor-pointer group flex flex-col md:flex-row"
            >
              <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E] overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.src = "/carousel_12.png";
                  }}
                />
              </div>
              
              <div className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#F3BA2F]/10 text-[#F3BA2F] rounded-full text-xs font-medium">
                    {t(`topics.${item.category}`)}
                  </span>
                  <span className="text-[#838587] text-xs">{item.date}</span>
                </div>
                
                <h2 className="text-white text-xl font-bold mb-3 group-hover:text-[#F3BA2F] transition-colors">
                  {item.title}
                </h2>
                
                <p className="text-[#838587] text-sm line-clamp-2">
                  {item.excerpt}
                </p>
                
                <button className="mt-4 text-[#F3BA2F] text-sm font-medium hover:underline">
                  {t("common.readMore")} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
