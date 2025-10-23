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
