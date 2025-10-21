"use client";

import React, { useState } from "react";
import Market from "@/components/elements/marketInfo/Market";
import RecentList from "@/components/elements/marketInfo/RecentList";
import MarketCarousel from "@/components/elements/carousel/MarketCarousel";
import { useGlobalContext } from "@/providers/GlobalContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function Home() {
  const pathname = usePathname();
  const { setActiveTab } = useGlobalContext();
  const [showRecentActivity, setShowRecentActivity] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("ACTIVE");
    }
  }, [pathname, setActiveTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3BA2F]/10 via-transparent to-[#F3BA2F]/10"></div>
        <div className="relative z-10 sm:px-[42px] px-5 py-12 animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text font-['anton'] mb-4">
              {t('common.siteName')}
            </h1>
            <p className="text-xl text-[#9CA3AF] font-satoshi">
              {t('common.description')}
            </p>
          </div>
          <MarketCarousel />
        </div>
      </div>

      {/* Main Content */}
      <div className="sm:px-[42px] px-5 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
            {/* Markets Section */}
            <div className="2xl:col-span-2 animate-slide-in-right">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl border border-[#374151] p-6 shadow-2xl glow-primary hover:glow-primary transition-all duration-500">
                <Market showRecentActivity={showRecentActivity} onToggleRecentActivity={() => setShowRecentActivity(!showRecentActivity)} />
              </div>
            </div>

            {/* Recent Activity Sidebar */}
            {showRecentActivity && (
              <div className="2xl:col-span-1 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl border border-[#374151] p-6 shadow-2xl sticky top-8 glow-primary hover:glow-primary transition-all duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold gradient-text font-['Rubik']">
                      {t('market.recentActivity')}
                    </h2>
                    <div className="w-2 h-2 bg-[#F3BA2F] rounded-full animate-pulse-slow"></div>
                  </div>
                  <RecentList />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
