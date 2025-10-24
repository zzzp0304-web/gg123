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
    'More Green': t('marketOptions.moreGreen'),
    'More Red': t('marketOptions.moreRed'),
    'Gold': t('marketOptions.gold'),
    'ETH': t('marketOptions.eth'),
    'Fear': t('marketOptions.fear'),
    'Greed': t('marketOptions.greed'),
    'Fury': t('marketOptions.fury'),
    'Usyk': t('marketOptions.usyk'),
  };
  
  return optionMap[optionText] || optionText;
};