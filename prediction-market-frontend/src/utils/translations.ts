import { useTranslation } from "react-i18next";
import { Market } from "../data/topicMarkets";

// Hook to get translated market title
export const useTranslatedMarket = (market: Market) => {
  const { t } = useTranslation();
  
  return {
    ...market,
    title: market.titleKey ? t(market.titleKey) : market.title
  };
};

// Function to get translated market title
export const getTranslatedMarketTitle = (market: Market, t: (key: string) => string) => {
  return market.titleKey ? t(market.titleKey) : market.title;
};

// Function to translate option text
export const getTranslatedOptionText = (optionText: string, t: (key: string) => string, i18n?: any) => {
  // Get current language
  const currentLang = i18n?.language || 'en';
  
  const optionMap: Record<string, Record<string, string>> = {
    'Yes': { en: 'Yes', zh: '是' },
    'No': { en: 'No', zh: '否' },
    'More Green': { en: 'More Green', zh: '更多绿色' },
    'More Red': { en: 'More Red', zh: '更多红色' },
    'Gold': { en: 'Gold', zh: '黄金' },
    'ETH': { en: 'ETH', zh: 'ETH' },
    'Fear': { en: 'Fear', zh: '恐惧' },
    'Greed': { en: 'Greed', zh: '贪婪' },
    'Fury': { en: 'Fury', zh: '富里' },
    'Usyk': { en: 'Usyk', zh: '乌西克' },
  };
  
  const translations = optionMap[optionText];
  if (translations) {
    return translations[currentLang] || translations.en || optionText;
  }
  
  return optionText;
};