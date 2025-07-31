import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Switch from "@/components/atoms/Switch";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MenuItemCard = ({ 
  item, 
  onEdit, 
  onDelete, 
  onToggleAvailability 
}) => {
  return (
    <Card className="hover-card group">
      <CardContent className="p-0">
        {/* Image placeholder */}
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center relative overflow-hidden">
          <ApperIcon name="Image" className="h-12 w-12 text-gray-400" />
          <div className="absolute top-3 right-3">
            <Switch
              checked={item.isAvailable}
              onCheckedChange={() => onToggleAvailability(item.Id)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg truncate flex-1">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-xl font-bold text-primary-600">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            <Badge 
              variant={item.isAvailable ? "success" : "default"}
              className="text-xs"
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </Badge>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                onClick={() => onEdit(item)}
              >
                <ApperIcon name="Edit" className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                onClick={() => onDelete(item.Id)}
              >
                <ApperIcon name="Trash2" className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;