import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className,
  onClear,
  ...props 
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm placeholder:text-gray-400 transition-all duration-200"
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;