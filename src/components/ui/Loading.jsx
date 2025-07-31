import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "default" }) => {
  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent"></div>
        <span className="text-gray-600 font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;