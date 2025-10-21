"use client";

import React from "react";
import Icon from "../Icons";
import { useTranslation } from "react-i18next";

interface VoteButtonProps {
  onClick: () => void;
  label: string;
  color: string; // Example: "#3fd145" or "#ff6464"
  icon: "yes" | "no"; // Example: "check", "cross"
}

const VoteButton: React.FC<VoteButtonProps> = ({
  onClick,
  label,
  color,
  icon,
}) => {
  const isYes = icon === "yes";
  const buttonColor = isYes ? "#10B981" : "#EF4444";
  const { t } = useTranslation();
  
  return (
    <button
      className={`flex-1 px-6 py-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group
                 ${isYes 
                   ? 'bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/10 border border-[#10B981]/30 hover:from-[#10B981]/30 hover:to-[#10B981]/20' 
                   : 'bg-gradient-to-r from-[#EF4444]/20 to-[#EF4444]/10 border border-[#EF4444]/30 hover:from-[#EF4444]/30 hover:to-[#EF4444]/20'
                 }`}
      onClick={onClick}
    >
      {/* Icon Container */}
      <div className="w-6 h-6 relative overflow-hidden mb-2">
        <Icon name={icon} color={buttonColor} />
      </div>

      {/* Button Label */}
      <div
        className={`justify-center text-center text-lg font-bold font-satoshi leading-7 transition-colors duration-300
                   ${isYes ? 'text-[#10B981] group-hover:text-[#0D9268]' : 'text-[#EF4444] group-hover:text-[#DC2626]'}
                 `}
      >
        {isYes ? t('common.yes') : t('common.no')}
      </div>
    </button>
  );
};

export default VoteButton;
