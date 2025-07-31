import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <ApperIcon name="Menu" className="h-5 w-5" />
        </Button>

        {/* Search and actions */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Bell" className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Settings" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;