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
export const getTranslatedOptionText = (optionText: string, t: (key: string) => string) => {
  const optionMap: Record<string, string> = {
    'Yes': t('common.yes'),
    'No': t('common.no'),
    'More Green': '更多绿色',
    'More Red': '更多红色',
    'Gold': '黄金',
    'ETH': 'ETH',
    'Fear': '恐惧',
    'Greed': '贪婪',
    'Fury': '富里',
    'Usyk': '乌西克',
  };
  
  return optionMap[optionText] || optionText;
};