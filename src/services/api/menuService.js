import categoriesData from "@/services/mockData/categories.json";
import menuItemsData from "@/services/mockData/menuItems.json";

// Simulated delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MenuService {
  constructor() {
    // Initialize with deep copies to prevent mutations
    this.categories = JSON.parse(JSON.stringify(categoriesData));
    this.menuItems = JSON.parse(JSON.stringify(menuItemsData));
  }

  // Category methods
  async getAllCategories() {
    await delay(300);
    // Update item counts
    return this.categories.map(category => ({
      ...category,
      itemCount: this.menuItems.filter(item => item.categoryId === category.Id).length
    }));
  }

  async getCategoryById(id) {
    await delay(200);
    const category = this.categories.find(cat => cat.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return {
      ...category,
      itemCount: this.menuItems.filter(item => item.categoryId === category.Id).length
    };
  }

  async createCategory(categoryData) {
    await delay(300);
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      ...categoryData,
      itemCount: 0
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async updateCategory(id, updates) {
    await delay(300);
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = { ...this.categories[index], ...updates };
    return {
      ...this.categories[index],
      itemCount: this.menuItems.filter(item => item.categoryId === this.categories[index].Id).length
    };
  }

  async deleteCategory(id) {
    await delay(300);
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    // Check if category has items
    const hasItems = this.menuItems.some(item => item.categoryId === parseInt(id));
    if (hasItems) {
      throw new Error("Cannot delete category with items");
    }
    
    this.categories.splice(index, 1);
    return true;
  }

  // Menu item methods
  async getAllItems() {
    await delay(300);
    return [...this.menuItems];
  }

  async getItemById(id) {
    await delay(200);
    const item = this.menuItems.find(item => item.Id === parseInt(id));
    if (!item) {
      throw new Error("Menu item not found");
    }
    return { ...item };
  }

  async getItemsByCategory(categoryId) {
    await delay(300);
    return this.menuItems.filter(item => item.categoryId === parseInt(categoryId));
  }

  async createItem(itemData) {
    await delay(300);
    const newItem = {
      Id: Math.max(...this.menuItems.map(i => i.Id), 0) + 1,
      ...itemData,
      imageUrl: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.menuItems.push(newItem);
    return newItem;
  }

  async updateItem(id, updates) {
    await delay(300);
    const index = this.menuItems.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Menu item not found");
    }
    
    this.menuItems[index] = {
      ...this.menuItems[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.menuItems[index] };
  }

  async deleteItem(id) {
    await delay(300);
    const index = this.menuItems.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Menu item not found");
    }
    
    this.menuItems.splice(index, 1);
    return true;
  }

  // Bulk operations
  async toggleItemAvailability(id, isAvailable) {
    await delay(200);
    return this.updateItem(id, { isAvailable });
  }

  async bulkUpdateAvailability(itemIds, isAvailable) {
    await delay(400);
    const updates = itemIds.map(id => this.updateItem(id, { isAvailable }));
    return Promise.all(updates);
  }
}

export const menuService = new MenuService();