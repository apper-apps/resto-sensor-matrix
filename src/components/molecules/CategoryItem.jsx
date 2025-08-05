import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const CategoryItem = ({ 
  category, 
  isSelected, 
  onSelect, 
  onEdit, 
  onDelete,
  isEditing,
  onEditStart,
  onEditCancel
}) => {
const [editName, setEditName] = useState(category.Name || category.name);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      onEdit(category.Id, editName.trim());
      setEditName(editName.trim());
    }
  };

  const handleEditCancel = () => {
    setEditName(category.Name || category.name);
    onEditCancel();
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 border",
        isSelected 
          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-600 shadow-md" 
          : "bg-white hover:bg-gray-50 border-gray-200 hover:border-primary-300"
      )}
      onClick={() => !isEditing && onSelect(category.Id)}
    >
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="h-8 text-sm"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
            <div className="flex gap-1">
              <Button
                type="submit"
                size="sm"
                variant="primary"
                className="h-8 px-2"
                onClick={(e) => e.stopPropagation()}
              >
                <ApperIcon name="Check" className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditCancel();
                }}
              >
                <ApperIcon name="X" className="h-3 w-3" />
              </Button>
            </div>
          </form>
        ) : (
          <div>
<p className={cn(
              "font-medium truncate",
              isSelected ? "text-white" : "text-gray-900"
            )}>
              {category.Name || category.name}
            </p>
            <p className={cn(
              "text-sm truncate",
              isSelected ? "text-primary-100" : "text-gray-500"
            )}>
              {category.itemCount || 0} items
            </p>
          </div>
        )}
      </div>

{!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "h-8 w-8 p-0 cursor-grab active:cursor-grabbing",
              isSelected ? "text-white hover:bg-primary-400" : "text-gray-500 hover:text-gray-700"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ApperIcon name="GripVertical" className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "h-8 w-8 p-0",
              isSelected ? "text-white hover:bg-primary-400" : "text-gray-500 hover:text-gray-700"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onEditStart();
            }}
          >
            <ApperIcon name="Edit" className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "h-8 w-8 p-0",
              isSelected ? "text-white hover:bg-primary-400" : "text-gray-500 hover:text-red-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(category.Id);
            }}
          >
            <ApperIcon name="Trash2" className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;