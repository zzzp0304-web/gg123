"use client";
import { SidebarNavProps } from "@/types/type";
import SidebarNavItem from "./SidebarNavItem";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const sidebarNavList = [
  { label: "Home", href: "/", icon: "Home", translationKey: "navigation.home" },
  { label: "Markets", href: "/markets", icon: "Markets", translationKey: "navigation.markets" },
  { label: "News", href: "/news", icon: "News", translationKey: "navigation.news" },
] as const;

const topicsList = [
  { 
    label: "Crypto", 
    href: "/topics/crypto", 
    icon: "Crypto", 
    marketCount: 20,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=32&h=32&fit=crop&crop=center&auto=format&q=80",
    translationKey: "topics.crypto"
  },
  { 
    label: "Sports", 
    href: "/topics/sports", 
    icon: "Sports", 
    marketCount: 19,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=32&h=32&fit=crop&crop=center&auto=format&q=80",
    translationKey: "topics.sports"
  },
  { 
    label: "Politics", 
    href: "/topics/politics", 
    icon: "Politics", 
    marketCount: 8,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=32&h=32&fit=crop&crop=center&auto=format&q=80",
    translationKey: "topics.politics"
  },
  { 
    label: "Economy", 
    href: "/topics/economy", 
    icon: "Economy", 
    marketCount: 7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=32&h=32&fit=crop&crop=center&auto=format&q=80",
    translationKey: "topics.economy"
  },
  { 
    label: "Gaming", 
    href: "/topics/gaming", 
    icon: "Gaming", 
    marketCount: 11,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=32&h=32&fit=crop&crop=center&auto=format&q=80",
    translationKey: "topics.gaming"
  },
  { 
    label: "Culture", 
    href: "/topics/culture", 
    icon: "Culture", 
    marketCount: 13,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=32&h=32&fit=crop&crop=center&auto=format&q=80",
    translationKey: "topics.culture"
  },
  { 
    label: "Sentiment", 
    href: "/topics/sentiment", 
    icon: "Sentiment", 
    marketCount: 4,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=32&h=32&fit=crop&crop=center&auto=format&q=80",
    translationKey: "topics.sentiment"
  },
] as const;

const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed }) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  
  // Determine active item based on current path
  const getActiveItem = () => {
    if (pathname === "/") return "Home";
    if (pathname.startsWith("/fund")) return "Markets";
    if (pathname.startsWith("/propose")) return "Markets";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/referral")) return "Earn";
    if (pathname.startsWith("/about")) return "News";
    return "Home";
  };

  const activeItem = getActiveItem();

  return (
    <nav className="flex grow px-6 pt-3 pb-1 flex-col items-start gap-4 flex-[1_0_0] relative self-stretch">
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
              isActive={false}
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
