import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;