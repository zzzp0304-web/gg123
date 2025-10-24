"use client";
import { SidebarNavProps } from "@/types/type";
import SidebarNavItem from "./SidebarNavItem";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const sidebarNavList = [
  { label: "Home", href: "/", icon: "Home", translationKey: "navigation.home" },
  { label: "Markets", href: "/markets", icon: "Markets", translationKey: "navigation.markets" },
  { label: "Wallet", href: "/wallet", icon: "Wallet", translationKey: "navigation.wallet" },
] as const;

const topicsList = [
  { 
    label: "Crypto", 
    href: "/topics/crypto", 
    icon: "Crypto", 
    marketCount: 14,
    image: "/assets/CRYPTO.png",
    translationKey: "topics.crypto"
  },
  { 
    label: "Sports", 
    href: "/topics/sports", 
    icon: "Sports", 
    marketCount: 8,
    image: "/assets/SPORTS.png",
    translationKey: "topics.sports"
  },
  { 
    label: "Politics", 
    href: "/topics/politics", 
    icon: "Politics", 
    marketCount: 9,
    image: "/assets/POLITICS.png",
    translationKey: "topics.politics"
  },
  { 
    label: "Economy", 
    href: "/topics/economy", 
    icon: "Economy", 
    marketCount: 8,
    image: "/assets/ECONOMICS.png",
    translationKey: "topics.economy"
  },
  { 
    label: "Gaming", 
    href: "/topics/gaming", 
    icon: "Gaming", 
    marketCount: 4,
    image: "/assets/GAMING.png",
    translationKey: "topics.gaming"
  },
  { 
    label: "Culture", 
    href: "/topics/culture", 
    icon: "Culture", 
    marketCount: 4,
    image: "/assets/IGGY-AZALEA.png",
    translationKey: "topics.culture"
  },
] as const;

const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed }) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  
  // Determine active item based on current path
  const getActiveItem = () => {
    if (pathname === "/") return "Home";
    if (pathname === "/markets") return "Markets";
    if (pathname === "/wallet") return "Wallet";
    if (pathname.startsWith("/topics/")) return "Topics";
    if (pathname.startsWith("/fund")) return "Markets";
    if (pathname.startsWith("/propose")) return "Markets";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/referral")) return "Earn";
    return "Home";
  };

  const activeItem = getActiveItem();
  
  // Check if a topic is active
  const isTopicActive = (topicHref: string) => {
    return pathname === topicHref;
  };

  return (
    <nav className="flex grow px-6 pt-3 pb-1 flex-col items-start gap-4 flex-[1_0_0] relative self-stretch min-h-0 overflow-y-auto">
      {/* Main Navigation */}
      <div className="flex flex-col gap-1.5 w-full">
        {sidebarNavList.map(({ label, href, icon, translationKey }) => (
          <SidebarNavItem
            key={label}
            label={t(translationKey)}
            href={href}
            icon={icon}
            isActive={activeItem === label}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-[#374151]"></div>

      {/* Topics Section */}
      <div className="flex flex-col gap-2 w-full">
        {!isCollapsed && (
          <div className="text-[#9CA3AF] text-sm font-semibold font-satoshi uppercase tracking-wider px-3 py-0.5">
            {t('navigation.topics')}
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          {topicsList.map(({ label, href, icon, marketCount, image, translationKey }) => (
            <SidebarNavItem
              key={label}
              label={t(translationKey)}
              href={href}
              icon={icon}
              count={`${marketCount} ${t('topics.markets')}`}
              image={image}
              isActive={isTopicActive(href)}
              isCollapsed={isCollapsed}
              isTopic={true}
            />
          ))}
        </div>
      </div>

    </nav>
  );
};

export default SidebarNav;
