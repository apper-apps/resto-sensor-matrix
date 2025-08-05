import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { menuService } from "@/services/api/menuService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryItem from "@/components/molecules/CategoryItem";
import Modal from "@/components/molecules/Modal";
import MenuItemCard from "@/components/molecules/MenuItemCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Switch from "@/components/atoms/Switch";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const MenuManagement = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal states
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  
  // Form states
  const [itemForm, setItemForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    isAvailable: true
  });
  const [newCategoryName, setNewCategoryName] = useState("");

  // DnD Kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [categoriesData, itemsData] = await Promise.all([
        menuService.getAllCategories(),
        menuService.getAllItems()
      ]);
      setCategories(categoriesData);
      setItems(itemsData);
      
      if (categoriesData.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(categoriesData[0].Id);
      }
    } catch (err) {
      setError("Failed to load menu data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

const filteredItems = items.filter(item => {
    const categoryId = item.categoryId?.Id || item.categoryId;
    const matchesCategory = !selectedCategoryId || categoryId === selectedCategoryId;
    const itemName = item.Name || item.name || '';
    const itemDescription = item.description || '';
    const matchesSearch = !searchQuery || 
      itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
const newCategory = await menuService.createCategory({
        name: newCategoryName.trim(),
        displayOrder: categories.length + 1,
        itemCount: 0,
        isActive: true
      });
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setShowAddCategory(false);
      toast.success("Category added successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to add category");
    }
  };

const handleEditCategory = async (categoryId, newName) => {
    try {
      const updatedCategory = await menuService.updateCategory(categoryId, { name: newName });
      setCategories(categories.map(cat => 
        cat.Id === categoryId ? updatedCategory : cat
      ));
      setEditingCategoryId(null);
      toast.success("Category updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const categoryItems = items.filter(item => item.categoryId === categoryId);
    if (categoryItems.length > 0) {
      toast.error("Cannot delete category with items. Please move or delete items first.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await menuService.deleteCategory(categoryId);
        setCategories(categories.filter(cat => cat.Id !== categoryId));
        if (selectedCategoryId === categoryId) {
          setSelectedCategoryId(categories.length > 1 ? categories.find(cat => cat.Id !== categoryId)?.Id : null);
        }
toast.success("Category deleted successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to delete category");
      }
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setItemForm({
      name: "",
      price: "",
      description: "",
      categoryId: selectedCategoryId || (categories.length > 0 ? categories[0].Id.toString() : ""),
      isAvailable: true
    });
    setShowItemModal(true);
  };

const handleEditItem = (item) => {
    setEditingItem(item);
    setItemForm({
      name: item.Name || item.name,
      price: (item.price || 0).toString(),
      description: item.description || "",
      categoryId: (item.categoryId?.Id || item.categoryId || "").toString(),
      isAvailable: item.isAvailable || true
    });
    setShowItemModal(true);
  };

  const handleSaveItem = async () => {
    if (!itemForm.name.trim() || !itemForm.price || !itemForm.categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const itemData = {
        name: itemForm.name.trim(),
        price: parseFloat(itemForm.price),
        description: itemForm.description.trim(),
        categoryId: parseInt(itemForm.categoryId),
        isAvailable: itemForm.isAvailable
      };

      if (editingItem) {
        const updatedItem = await menuService.updateItem(editingItem.Id, itemData);
        setItems(items.map(item => item.Id === editingItem.Id ? updatedItem : item));
        toast.success("Menu item updated successfully!");
      } else {
        const newItem = await menuService.createItem(itemData);
        setItems([...items, newItem]);
        toast.success("Menu item added successfully!");
      }

      // Update category item counts
      const updatedCategories = await menuService.getAllCategories();
      setCategories(updatedCategories);
      
setShowItemModal(false);
    } catch (err) {
      toast.error(err.message || "Failed to save menu item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await menuService.deleteItem(itemId);
        setItems(items.filter(item => item.Id !== itemId));
        
        // Update category item counts
        const updatedCategories = await menuService.getAllCategories();
        setCategories(updatedCategories);
        
toast.success("Menu item deleted successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to delete menu item");
      }
    }
  };

  const handleToggleAvailability = async (itemId) => {
    try {
      const item = items.find(i => i.Id === itemId);
      const updatedItem = await menuService.updateItem(itemId, {
        ...item,
        isAvailable: !item.isAvailable
      });
      setItems(items.map(i => i.Id === itemId ? updatedItem : i));
toast.success(`Item ${updatedItem.isAvailable ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      toast.error(err.message || "Failed to update item availability");
    }
};

  const handleReorderCategories = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex(cat => cat.Id === active.id);
      const newIndex = categories.findIndex(cat => cat.Id === over.id);
      
      const reorderedCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(reorderedCategories);

      try {
        // Update display order in backend
        await Promise.all(
          reorderedCategories.map((category, index) =>
            menuService.updateCategory(category.Id, { ...category, displayOrder: index + 1 })
          )
        );
        toast.success("Categories reordered successfully!");
      } catch (err) {
        // Revert on error
        setCategories(categories);
        toast.error("Failed to reorder categories");
      }
    }
  };

  if (loading) {
    return <Loading variant="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Menu Management</h1>
          <p className="text-gray-600">Organize your restaurant menu items and categories</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowAddCategory(true)}
          >
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button
            variant="primary"
            onClick={handleAddItem}
            disabled={categories.length === 0}
          >
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
        </div>
      </div>

      {categories.length === 0 ? (
        <Empty
          title="No categories found"
          description="Start by creating your first menu category to organize your items"
          action={() => setShowAddCategory(true)}
          actionLabel="Add Category"
          icon="Grid3X3"
        />
      ) : (
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Categories</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowAddCategory(true)}
                >
                  <ApperIcon name="Plus" className="h-4 w-4" />
                </Button>
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleReorderCategories}
              >
                <SortableContext 
                  items={categories.map(cat => cat.Id)} 
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <CategoryItem
                        key={category.Id}
                        category={category}
                        isSelected={selectedCategoryId === category.Id}
                        onSelect={setSelectedCategoryId}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                        isEditing={editingCategoryId === category.Id}
                        onEditStart={() => setEditingCategoryId(category.Id)}
                        onEditCancel={() => setEditingCategoryId(null)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>

          {/* Items Grid */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
              />
            </div>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
              <Empty
                title="No menu items found"
                description={searchQuery ? "No items match your search criteria" : "Add your first menu item to get started"}
                action={!searchQuery ? handleAddItem : undefined}
                actionLabel="Add Menu Item"
                icon="ChefHat"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.Id}
                    item={item}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    onToggleAvailability={handleToggleAvailability}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddCategory}
        onClose={() => {
          setShowAddCategory(false);
          setNewCategoryName("");
        }}
        title="Add New Category"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g., Appetizers, Main Courses, Desserts"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddCategory(false);
                setNewCategoryName("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              Add Category
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add/Edit Item Modal */}
      <Modal
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Item Name"
              placeholder="e.g., Grilled Salmon"
              value={itemForm.name}
              onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={itemForm.price}
              onChange={(e) => setItemForm(prev => ({ ...prev, price: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe the dish, ingredients, preparation..."
              value={itemForm.description}
              onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={itemForm.categoryId}
              onChange={(e) => setItemForm(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.Id} value={category.Id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Available</label>
              <p className="text-xs text-gray-500">Item is available for ordering</p>
            </div>
            <Switch
              checked={itemForm.isAvailable}
              onCheckedChange={(checked) => setItemForm(prev => ({ ...prev, isAvailable: checked }))}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => setShowItemModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveItem}
            >
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuManagement;