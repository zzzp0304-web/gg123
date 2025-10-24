"use client";

import Icon from "@/components/elements/Icons";

interface SearchBarProps {
  placeholder?: string;
  showShortcut?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  showShortcut = true,
}) => {
  return (
    <div className="w-full max-w-[480px] px-4 py-3 bg-[#1e1e1e] rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#313131] flex items-center gap-3">
      <Icon name="Search" />
      <input
        type="text"
        placeholder={placeholder}
        aria-label="Search"
        className="flex-1 bg-transparent text-[#838587] text-base font-medium font-satoshi leading-normal outline-none placeholder-[#838587]"
      />
    </div>
  );
};

export default SearchBar;
