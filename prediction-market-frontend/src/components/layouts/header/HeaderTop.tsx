"use client";

import { useState } from "react";
import Icon from "@/components/elements/Icons";
import { useGlobalContext } from "@/providers/GlobalContext";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/elements/LanguageSwitcher";
import { useWeb3 } from "@/providers/Web3Provider";

interface HeaderTopProps {
  isCollapsed?: boolean;
}

const HeaderTop: React.FC<HeaderTopProps> = ({ isCollapsed }) => {
  const { activeTab, setActiveTab } = useGlobalContext(); // Use Global Context
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col relative">
      <div className="self-stretch  px-[50px] py-4 inline-flex justify-between items-center w-full">
        <div className="flex gap-2 items-center md:hidden">
          <div className="w-4 h-4 md:hidden relative overflow-hidden">
            <RxHamburgerMenu size={16} className="text-white" />
          </div>
          <div className="flex-1 md:hidden flex justify-start items-center gap-2">
            <Link href="/">
              <Icon name="Logo" size={24} />
            </Link>
          </div>
        </div>

        <div className="md:flex hidden justify-start items-center gap-5">
          {/* Market Tab Switch */}
          {pathname === "/" ? (
            <div className="p-0.5 bg-[#111111] rounded-[18px] outline-1 outline-offset-[-1px] outline-[#313131] flex">
              {/* Active Market Button */}
              <button
                onClick={() => setActiveTab("ACTIVE")}
                className={`px-4 py-2.5 rounded-2xl flex items-center cursor-pointer gap-2 transition-all duration-300
        ${activeTab === "ACTIVE"
                    ? "bg-[#282828] shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)]"
                    : "bg-transparent hover:bg-[#2a2a2a] hover:shadow-md hover:scale-95"
                  }`}
              >
                <Icon
                  name="ActiveMarket"
                  color={activeTab === "ACTIVE" ? "#FF6464" : "#838587"}
                  className="transition-all duration-300 ease-in-out hover:scale-110"
                />
                <span
                  className={`text-base font-medium font-satoshi leading-normal transition-all duration-300 ease-in-out
          ${activeTab === "ACTIVE" ? "text-white" : "text-[#838587]"}`}
                >
                  {t('market.activeMarkets')}
                </span>
              </button>
            </div>
          ) : (
            ""
          )}

          {/* Search Bar */}
          <div className="2xl:w-[480px] hidden px-4 py-3 bg-[#1e1e1e]  rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] lg:flex lg:w-auto justify-start items-center gap-3">
            <span className="pointer-events-none">
              <Icon name="Search" />
            </span>
            <input
              type="text"
              placeholder={t('common.search')}
              className="flex-1 bg-transparent hover:text-gray-400 text-[#838587] text-base font-medium font-satoshi leading-normal outline-none"
            />
          </div>
        </div>

        {/* Language Selector & Wallet Button */}
        <div className="flex justify-start items-center gap-5">
          {/* Language Selector */}
          <div className="xl:flex hidden">
            <LanguageSwitcher />
          </div>

          {/* Connect Wallet Button */}
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="px-6 py-3 bg-gradient-to-r from-[#F3BA2F] to-[#E8A202] hover:from-[#E8A202] hover:to-[#D4941A] rounded-2xl font-bold text-black transition-all duration-300 shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.16)] hover:shadow-xl active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <div className="w-5 h-5 bg-[#1A1A1A] rounded-lg p-1 flex items-center justify-center">
                <img src="/assets/bnb.png" alt="BNB" className="w-full h-full object-contain" />
              </div>
              <span className="hidden md:inline">{t('common.selectWallet') || 'Select Wallet'}</span>
              <span className="md:hidden">Connect</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="pl-1 pr-4 py-2.5 bg-[#282828] rounded-2xl text-white font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="hidden md:inline">{account?.slice(0, 6)}...{account?.slice(-4)}</span>
                <span className="md:hidden">{account?.slice(0, 4)}...</span>
              </div>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2.5 bg-[#282828] hover:bg-[#383838] rounded-2xl text-white font-medium transition-all duration-300 active:scale-95"
              >
                {t('common.disconnect') || 'Disconnect'}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-[50px]">
        {/* Search Bar */}
        <div className="lg:hidden px-4 py-3 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-3">
          <span className="cursor-pointer">
            <Icon name="Search" />
          </span>
          <input
            type="text"
            placeholder={t('common.search')}
            className="flex-1 bg-transparent text-[#838587] md:text-base text-sm font-medium font-satoshi leading-normal outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
