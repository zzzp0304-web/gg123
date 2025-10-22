"use client";

import React, { useEffect } from "react";
import { FaRegClock, FaRegStar } from "react-icons/fa6";
import Icon from "../Icons";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { elipsKey, getCountDown } from "@/utils";
import { useGlobalContext } from "@/providers/GlobalContext";
import { marketBetting } from "@/components/prediction_market_sdk";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { errorAlert, infoAlert } from "../ToastGroup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MarketDataType } from "@/types/type";
import { motion } from "framer-motion";

// Define types for the props
interface PredictionCardProps {
  index: number,
  currentPage: number
}

const PredictionCard: React.FC<PredictionCardProps> = ({
  index,
  currentPage
}) => {
  const { markets, formatMarketData } = useGlobalContext(); // Use Global Context
  const wallet = useAnchorWallet()
  const router = useRouter()
  const [counter, setCounter] = useState("7d : 6h : 21m : 46s");
  useEffect(() => {
    const interval = setInterval(() => {
      let remainTime: string = getCountDown(markets[index].date);
      setCounter(remainTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const onVote = async (isYes: boolean, token: string) => {
    try {
      if (!wallet) {
        errorAlert("Please connect wallet!");
        return
      }
      const result = await marketBetting({
        creator: markets[index].creator,
        player: wallet,
        marketId: markets[index]._id,
        market: markets[index].market,
        amount: 1000,
        isYes: isYes,
        token: token,
      });

      const res = await axios.post("http://localhost:8080/api/market/betting", {
        player: wallet.publicKey.toBase58(),
        market_id: markets[index]._id,
        amount: 1000,
        isYes,
        currentPage,
        ...result
      });

      if (res.status === 200) {
        infoAlert("Successfully betted!");
        const marketData = await axios.get(`http://localhost:8080/api/market/get?page=${currentPage}&limit=10&marketStatus=ACTIVE&marketField=0`);
        formatMarketData(marketData.data.data);
      }
    } catch (error) {
      console.log(error);
      errorAlert("Betting Filed!")
    }
  }
  const yesPercentage = (markets[index].playerACount + markets[index].playerBCount) === 0 ? 50 : Math.floor(markets[index].playerACount / (markets[index].playerACount + markets[index].playerBCount) * 100);
  const noPercentage = 100 - yesPercentage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.025, boxShadow: "0 8px 32px 0 rgba(7,179,255,0.10)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg"
    >
      {/* Header Image */}
      <div className="relative w-full h-24 overflow-hidden">
        <img 
          src={markets[index].imageUrl} 
          alt={markets[index].feedName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Question */}
        <div className="text-center h-12 flex items-start justify-center pt-2">
          <h3 className="text-white text-sm font-bold leading-tight px-2">
            {markets[index].question}
          </h3>
        </div>

        {/* Percentage Bar */}
        <div className="flex items-center gap-3 h-6">
          <span className="text-white text-sm font-semibold w-8 text-center">
            {yesPercentage}%
          </span>
          <div className="flex-1 h-2 bg-[#F3BA2F] rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${yesPercentage}%` }}
            />
          </div>
          <span className="text-white text-sm font-semibold w-8 text-center">
            {noPercentage}%
          </span>
        </div>

        {/* YES/NO Buttons */}
        <div className="flex gap-2 h-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#F3BA2F] to-[#E8A202] hover:from-[#E8A202] hover:to-[#D4941A] border-2 border-[#F3BA2F] rounded-lg cursor-pointer transition-all duration-200 flex justify-center items-center shadow-lg"
            onClick={() => onVote(true, markets[index].tokenA)}
          >
            <span className="text-white text-sm font-bold">YES</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-2 border-red-600 rounded-lg cursor-pointer transition-all duration-200 flex justify-center items-center shadow-lg"
            onClick={() => onVote(false, markets[index].tokenB)}
          >
            <span className="text-white text-sm font-bold">NO</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionCard;
