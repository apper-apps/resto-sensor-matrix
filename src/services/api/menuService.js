class MenuService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  // Category methods
  async getAllCategories() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "displayOrder" } },
          { field: { Name: "itemCount" } },
          { field: { Name: "isActive" } }
        ],
        orderBy: [
          {
            fieldName: "displayOrder",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching categories:", error.message);
        throw error;
      }
    }
  }

  async getCategoryById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "displayOrder" } },
          { field: { Name: "itemCount" } },
          { field: { Name: "isActive" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('category', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching category with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  async createCategory(categoryData) {
    try {
      const params = {
        records: [
          {
            Name: categoryData.name,
            displayOrder: categoryData.displayOrder || 1,
            itemCount: categoryData.itemCount || 0,
            isActive: categoryData.isActive !== undefined ? categoryData.isActive : true
          }
        ]
      };

      const response = await this.apperClient.createRecord('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create category ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating category:", error.message);
        throw error;
      }
    }
  }

  async updateCategory(id, updates) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: updates.name || updates.Name,
            displayOrder: updates.displayOrder,
            itemCount: updates.itemCount,
            isActive: updates.isActive
          }
        ]
      };

      const response = await this.apperClient.updateRecord('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update category ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating category:", error.message);
        throw error;
      }
    }
  }

  async deleteCategory(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete category ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting category:", error.message);
        throw error;
      }
    }
  }

  // Menu item methods
  async getAllItems() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "imageUrl" } },
          { field: { Name: "isAvailable" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching menu items:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching menu items:", error.message);
        throw error;
      }
    }
  }

  async getItemById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "imageUrl" } },
          { field: { Name: "isAvailable" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('menu_item', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching menu item with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching menu item with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  async getItemsByCategory(categoryId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "imageUrl" } },
          { field: { Name: "isAvailable" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } }
        ],
        where: [
          {
            FieldName: "categoryId",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching menu items by category:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching menu items by category:", error.message);
        throw error;
      }
    }
  }

  async createItem(itemData) {
    try {
      const params = {
        records: [
          {
            Name: itemData.name,
            price: parseFloat(itemData.price),
            description: itemData.description || "",
            categoryId: parseInt(itemData.categoryId),
            imageUrl: itemData.imageUrl || "",
            isAvailable: itemData.isAvailable !== undefined ? itemData.isAvailable : true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };

      const response = await this.apperClient.createRecord('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create menu item ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating menu item:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating menu item:", error.message);
        throw error;
      }
    }
  }

  async updateItem(id, updates) {
    try {
      const updateData = {
        Id: parseInt(id)
      };

      // Only include updateable fields
      if (updates.name !== undefined) updateData.Name = updates.name;
      if (updates.price !== undefined) updateData.price = parseFloat(updates.price);
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.categoryId !== undefined) updateData.categoryId = parseInt(updates.categoryId);
      if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl;
      if (updates.isAvailable !== undefined) updateData.isAvailable = updates.isAvailable;
      if (updates.updatedAt !== undefined) updateData.updatedAt = updates.updatedAt;

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update menu item ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating menu item:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating menu item:", error.message);
        throw error;
      }
    }
  }

  async deleteItem(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete menu item ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting menu item:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting menu item:", error.message);
        throw error;
      }
    }
  }

  // Bulk operations
  async toggleItemAvailability(id, isAvailable) {
    return this.updateItem(id, { isAvailable });
  }

  async bulkUpdateAvailability(itemIds, isAvailable) {
    const updates = itemIds.map(id => this.updateItem(id, { isAvailable }));
    return Promise.all(updates);
  }
}

export const menuService = new MenuService();