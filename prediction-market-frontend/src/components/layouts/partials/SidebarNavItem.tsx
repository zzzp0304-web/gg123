import Icon from "@/components/elements/Icons";
import { SidebarNavItemProps } from "@/types/type";
import Link from "next/link";
import { FC } from "react";

const SidebarNavItem: FC<SidebarNavItemProps> = ({
  label,
  href,
  icon,
  count,
  image,
  isActive,
  isCollapsed,
  isTopic = false,
}) => {
  if (isTopic) {
    return (
      <Link
        href={href}
        className={`self-stretch transition-all duration-150 ease-in-out 
          ${isCollapsed ? "p-2 md:justify-center md:flex" : "px-2 py-2.5 gap-3 justify-start items-center"}
          ${
            isActive
              ? "bg-[#282828] rounded-lg border-l-2 border-[#F3BA2F]"
              : "hover:bg-[#2A2A2A] hover:rounded-lg"
          }
          inline-flex items-center gap-3 cursor-pointer group relative`}
        title={isCollapsed ? `${label} - ${count}` : undefined}
      >
        {/* Topic Image - Always visible */}
        <div className={`${isCollapsed ? "w-8 h-8" : "w-14 h-14"} rounded-lg overflow-hidden flex-shrink-0 transition-all duration-150`}>
          {image ? (
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F3BA2F]/20 to-[#F3BA2F]/10 flex items-center justify-center">
              {icon && (
                <Icon
                  name={icon}
                  size={isCollapsed ? 16 : 22}
                  color="#F3BA2F"
                  className="transition-all duration-150 ease-in-out group-hover:scale-110"
                />
              )}
            </div>
          )}
        </div>

        {/* Topic Content - Hidden when collapsed on desktop */}
        {!isCollapsed && (
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <div className={`text-sm lg:text-base font-medium font-satoshi leading-tight truncate transition-colors duration-150 ${
              isActive ? "text-[#F3BA2F]" : "text-white"
            }`}>
              {label}
            </div>
            <div className="text-[#9CA3AF] text-xs lg:text-sm font-normal font-satoshi leading-tight truncate">
              {count}
            </div>
          </div>
        )}
        
        {/* Mobile label - always visible on mobile */}
        <div className="md:hidden flex flex-col gap-0.5 flex-1">
          <div className={`text-base font-medium font-satoshi leading-tight transition-colors duration-150 ${
            isActive ? "text-[#F3BA2F]" : "text-white"
          }`}>
            {label}
          </div>
          <div className="text-[#9CA3AF] text-sm font-normal font-satoshi leading-tight">
            {count}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`self-stretch transition-all duration-150 ease-in-out 
        ${isCollapsed ? "p-2.5 md:justify-center" : "px-3 py-3 gap-3 justify-start items-center"}
        ${
          isActive
            ? "bg-[#282828] rounded-lg border-l-2 border-[#F3BA2F]"
            : "hover:bg-[#2A2A2A] hover:rounded-lg"
        }
        inline-flex items-center gap-3 cursor-pointer group relative`}
      title={isCollapsed ? label : undefined}
    >
      {icon && (
        <Icon
          name={icon}
          size={22}
          color={isActive ? "#F3BA2F" : "#9CA3AF"}
          className="transition-all duration-150 ease-in-out group-hover:scale-110"
        />
      )}

      {/* Hide label when collapsed */}
      {!isCollapsed && (
        <div
          className={`justify-start font-satoshi text-sm lg:text-base font-medium leading-tight transition-all duration-150 ease-in-out truncate flex-1 min-w-0
          ${isActive ? "text-[#F3BA2F]" : "text-white group-hover:text-[#F3BA2F]"}`}
        >
          {label}
        </div>
      )}

      {/* Mobile label */}
      <div
        className={`justify-start md:hidden font-satoshi text-base font-medium leading-tight transition-all duration-150 ease-in-out
          ${isActive ? "text-[#F3BA2F]" : "text-white"}`}
      >
        {label}
      </div>
    </Link>
  );
};

export default SidebarNavItem;
