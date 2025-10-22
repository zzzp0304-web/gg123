"use client";

import Icon from "@/components/elements/Icons";
import Link from "next/link";
import SidebarNav from "../partials/SidebarNav";
import { FaXTwitter } from "react-icons/fa6";
import LanguageSwitcher from "@/components/elements/LanguageSwitcher";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";

interface HeaderSideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isCancel?: boolean;
  setIsCanceled?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderSideBar = ({ isCollapsed, setIsCollapsed, isCancel, setIsCanceled }: HeaderSideBarProps) => {
  const { width } = useWindowSize();
  const { t } = useTranslation();

  // Auto-collapse on smaller screens
  useEffect(() => {
    if (width < 1200 && !isCollapsed) {
      setIsCollapsed(true);
    } else if (width >= 1200 && isCollapsed) {
      // Optionally auto-expand on larger screens
      // setIsCollapsed(false);
    }
  }, [width, isCollapsed, setIsCollapsed]);

  return (
    <div
      className={`hidden md:flex fixed top-0 left-0 h-screen z-30 ${isCollapsed ? "w-[104px]" : "w-[280px]"} bg-[#0A0A0A] border-r border-[#374151] flex-col transition-all duration-300 overflow-y-auto overflow-x-hidden sidebar-scroll sidebar-responsive`}
    >
      {/* Logo */}
      <div
        className={`md:flex hidden flex-none items-center h-20 gap-2 px-6 py-[30px] shrink-0 self-stretch transition-all duration-300 ${isCollapsed ? "justify-center" : "justify-start"
          }`}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Link href="/">
            <Icon name="Logo" size={48} />
          </Link>
        </div>
      </div>

      <div className="md:hidden self-stretch h-[60px] px-5 py-3 inline-flex justify-start items-center gap-2">
        <div
          onClick={() => setIsCanceled && setIsCanceled(!isCancel)}
          className="w-4 h-4 relative overflow-hidden"
        >
          <RxCross2 className="text-white" />
        </div>
        <div className="flex-1 flex justify-start items-center gap-0.5">
          <Link href="/">
            <Icon name="Logo" size={24} />
          </Link>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Sidebar Navigation */}
      <SidebarNav isCollapsed={isCollapsed} />

      {/* Deposit Now Section */}
      <div className={`self-stretch px-6 ${isCollapsed ? "pt-1 pb-3" : "pt-1 pb-3"} flex-none`}>
        <Link
          href="/deposit"
          className={`w-full bg-gradient-to-br from-[#F3BA2F] to-[#E8A202] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
            isCollapsed ? "flex flex-col items-center justify-center gap-1.5 py-4 px-4" : "flex items-center justify-start gap-3 py-4 px-5"
          }`}
        >
          {/* BNB Logo */}
          <div className={`${isCollapsed ? "w-14 h-14" : "w-12 h-12"} flex-shrink-0 transition-all duration-300 bg-[#1A1A1A] rounded-2xl p-2 flex items-center justify-center ${isCollapsed ? "mx-auto" : ""}`}>
            <img
              src="/assets/bnb.png"
              alt="BNB"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Text Content */}
          {!isCollapsed && (
            <div className="flex flex-col gap-0.5 items-start text-left flex-1">
              <div className="text-white text-lg font-bold font-satoshi leading-tight">
                {t('deposit.title')}
              </div>
              <div className="text-white/90 text-xs font-medium font-satoshi leading-tight">
                {t('deposit.subtitle')}
              </div>
            </div>
          )}
          
          {/* Mobile Text */}
          <div className="md:hidden flex flex-col gap-0.5 items-center text-center w-full">
            <div className="text-white text-lg font-bold font-satoshi leading-tight">
              {t('deposit.title')}
            </div>
            <div className="text-white/90 text-xs font-medium font-satoshi leading-tight">
              {t('deposit.subtitle')}
            </div>
          </div>
        </Link>
      </div>

      {/* Social Links */}
      <div
        className={`self-stretch px-6 pt-2 pb-3 flex-col flex justify-center items-center flex-none gap-2`}
      >
        <Link
          href="#"
          className="p-3 bg-[#282828] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] inline-flex justify-center items-center gap-2"
        >
          <FaXTwitter className="text-white" />
          {!isCollapsed && (
            <div className="justify-start text-white text-base font-medium font-satoshi leading-normal">
              X (twitter)
            </div>
          )}
          <div className="md:hidden justify-start text-white text-base font-medium font-satoshi leading-normal">
            X (twitter)
          </div>
        </Link>
      </div>

      {/* Footer Section */}
      {!isCollapsed && (
        <div className="self-stretch px-6 pb-5 flex-col justify-start items-start gap-2 flex-none border-t border-[#374151] pt-3">
          {/* Links */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/partner" className="text-[#F3BA2F] hover:text-[#F3BA2F]/80 text-[10px] font-medium font-satoshi transition-colors duration-200">
              Partner with us
            </Link>
            <span className="text-[#F3BA2F] text-[10px]">•</span>
            <Link href="/terms" className="text-[#F3BA2F] hover:text-[#F3BA2F]/80 text-[10px] font-medium font-satoshi transition-colors duration-200">
              Terms of Use
            </Link>
            <span className="text-[#F3BA2F] text-[10px]">•</span>
            <Link href="/privacy" className="text-[#F3BA2F] hover:text-[#F3BA2F]/80 text-[10px] font-medium font-satoshi transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-[#6B7280] text-[10px] font-normal font-satoshi text-center w-full">
            © 2025 All rights reserved
          </div>
        </div>
      )}

      {/* Mobile Footer - Always visible on mobile */}
      <div className="md:hidden self-stretch px-6 pb-5 flex-col justify-start items-start gap-2 flex-none border-t border-[#374151] pt-3">
        {/* Links */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link href="/partner" className="text-[#F3BA2F] hover:text-[#F3BA2F]/80 text-[10px] font-medium font-satoshi transition-colors duration-200">
            Partner with us
          </Link>
          <span className="text-[#F3BA2F] text-[10px]">•</span>
          <Link href="/terms" className="text-[#F3BA2F] hover:text-[#F3BA2F]/80 text-[10px] font-medium font-satoshi transition-colors duration-200">
            Terms of Use
          </Link>
          <span className="text-[#F3BA2F] text-[10px]">•</span>
          <Link href="/privacy" className="text-[#F3BA2F] hover:text-[#F3BA2F]/80 text-[10px] font-medium font-satoshi transition-colors duration-200">
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-[#6B7280] text-[10px] font-normal font-satoshi text-center w-full">
          © 2025 All rights reserved
        </div>
      </div>

      <div
        data-size="Small"
        data-type="Tertiary"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`w-8 h-8 p-2 ${isCollapsed ? "left-[112px] top-[90px]" : "left-[288px] top-[90px]"
          } absolute origin-top-left hover:bg-[#3a3a3a] rotate-180 cursor-pointer bg-[#282828] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] md:inline-flex hidden justify-center items-center gap-2 z-50`}
      >
        <div className="inline-flex flex-col justify-start items-start overflow-hidden">
          <div className="rounded-[3px]" />
          <div className="w-4 h-4 overflow-hidden outline-[1.50px] outline-offset-[-0.75px] outline-white">
            <Icon
              name={isCollapsed ? "ArrowRight" : "ArrowLeft"}
              color={"white"}
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSideBar;
