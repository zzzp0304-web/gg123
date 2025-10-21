"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "./Icons";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="relative group">
      <button
        className="px-4 py-2.5 bg-[#282828] rounded-2xl flex justify-center items-center gap-2 
                   transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md cursor-pointer"
        onClick={() => {
          const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
          changeLanguage(newLang);
        }}
      >
        <span className="text-white text-lg font-medium font-satoshi leading-7 transition-all duration-300 ease-in-out hover:text-[#F3BA2F]">
          {currentLanguage === 'zh' ? '中文' : 'EN'}
        </span>
        <Icon
          name="Down"
          className="transition-all duration-300 ease-in-out group-hover:rotate-180"
        />
      </button>
      
      {/* Language Options Dropdown */}
      <div className="absolute top-full right-0 mt-2 bg-[#1e1e1e] rounded-xl border border-[#313131] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="py-2">
          <button
            onClick={() => changeLanguage('zh')}
            className={`w-full px-4 py-2 text-left hover:bg-[#343434] transition-colors duration-200 ${
              currentLanguage === 'zh' ? 'text-[#F3BA2F] bg-[#343434]' : 'text-white'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full px-4 py-2 text-left hover:bg-[#343434] transition-colors duration-200 ${
              currentLanguage === 'en' ? 'text-[#F3BA2F] bg-[#343434]' : 'text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
