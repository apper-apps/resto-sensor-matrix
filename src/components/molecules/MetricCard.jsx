import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = "primary",
  className 
}) => {
  const colorClasses = {
    primary: "bg-gradient-to-br from-primary-500 to-primary-600 text-white",
    secondary: "bg-gradient-to-br from-secondary-500 to-secondary-600 text-white",
    accent: "bg-gradient-to-br from-accent-500 to-accent-600 text-white",
    success: "bg-gradient-to-br from-green-500 to-green-600 text-white",
    warning: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
  };

  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-500"
  };

  return (
    <Card className={cn("hover-card", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold gradient-text mb-2">{value}</p>
            {trend && trendValue && (
              <div className="flex items-center gap-1">
                <ApperIcon 
                  name={trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"} 
                  className={cn("h-4 w-4", trendColors[trend])} 
                />
                <span className={cn("text-sm font-medium", trendColors[trend])}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", colorClasses[color])}>
            <ApperIcon name={icon} className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;