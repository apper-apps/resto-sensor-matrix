import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item", 
  action,
  actionLabel = "Add Item",
  icon = "Inbox",
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="h-8 w-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {action && (
        <Button onClick={action} variant="primary">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;