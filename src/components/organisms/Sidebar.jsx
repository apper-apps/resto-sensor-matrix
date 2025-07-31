import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: "LayoutDashboard" },
    { name: "Menu Management", path: "/menu", icon: "ChefHat" },
    { name: "Orders", path: "/orders", icon: "ClipboardList" },
    { name: "Tables", path: "/tables", icon: "Users" },
    { name: "Inventory", path: "/inventory", icon: "Package" },
    { name: "Staff", path: "/staff", icon: "UserCheck" },
    { name: "Analytics", path: "/analytics", icon: "BarChart3" }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-primary-700 to-primary-800">
      {/* Logo */}
      <div className="p-6 border-b border-primary-600">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <ApperIcon name="ChefHat" className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display">Resto Hub</h1>
            <p className="text-sm text-primary-200">Restaurant Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onClose && onClose()}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-white text-primary-700 shadow-md"
                  : "text-primary-100 hover:bg-primary-600 hover:text-white"
              )
            }
          >
            <ApperIcon name={item.icon} className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-primary-600">
        <div className="flex items-center gap-3 text-primary-200">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Restaurant Admin</p>
            <p className="text-xs">resto@hub.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isOpen ? "block" : "hidden"
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <div className={cn(
          "absolute left-0 top-0 h-full w-64 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;