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

      const response = await this.apperClient.fetchRecords("category", params);
      
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
        throw new Error(error.message);
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

      const response = await this.apperClient.getRecordById("category", id, params);
      
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
        throw new Error(error.message);
      }
    }
  }

  async createCategory(categoryData) {
    try {
      // Only include Updateable fields based on schema
      const params = {
        records: [{
          Name: categoryData.name || categoryData.Name,
          displayOrder: categoryData.displayOrder || 1,
          itemCount: categoryData.itemCount || 0,
          isActive: categoryData.isActive !== undefined ? categoryData.isActive : true
        }]
      };

      const response = await this.apperClient.createRecord("category", params);
      
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
        throw new Error(error.message);
      }
    }
  }

  async updateCategory(id, updates) {
    try {
      // Only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      };

      if (updates.name !== undefined) updateData.Name = updates.name;
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.displayOrder !== undefined) updateData.displayOrder = updates.displayOrder;
      if (updates.itemCount !== undefined) updateData.itemCount = updates.itemCount;
      if (updates.isActive !== undefined) updateData.isActive = updates.isActive;

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord("category", params);
      
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
        throw new Error(error.message);
      }
    }
  }

  async deleteCategory(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord("category", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete category ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting category:", error.message);
        throw new Error(error.message);
      }
    }
  }

  // Menu Item methods
  async getAllItems() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "imageUrl" } },
          { field: { Name: "isAvailable" } },
          { field: { Name: "categoryId" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords("menu_item", params);
      
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
        throw new Error(error.message);
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
          { field: { Name: "categoryId" } }
        ]
      };

      const response = await this.apperClient.getRecordById("menu_item", id, params);
      
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
        throw new Error(error.message);
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
          { field: { Name: "categoryId" } }
        ],
        where: [
          {
            FieldName: "categoryId",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords("menu_item", params);
      
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
        throw new Error(error.message);
      }
    }
  }

  async createItem(itemData) {
    try {
      // Only include Updateable fields based on schema
      const params = {
        records: [{
          Name: itemData.name || itemData.Name,
          price: parseFloat(itemData.price),
          description: itemData.description || "",
          imageUrl: itemData.imageUrl || "",
          isAvailable: itemData.isAvailable !== undefined ? itemData.isAvailable : true,
          categoryId: parseInt(itemData.categoryId)
        }]
      };

      const response = await this.apperClient.createRecord("menu_item", params);
      
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
        throw new Error(error.message);
      }
    }
  }

  async updateItem(id, updates) {
    try {
      // Only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      };

      if (updates.name !== undefined) updateData.Name = updates.name;
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.price !== undefined) updateData.price = parseFloat(updates.price);
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl;
      if (updates.isAvailable !== undefined) updateData.isAvailable = updates.isAvailable;
      if (updates.categoryId !== undefined) updateData.categoryId = parseInt(updates.categoryId);

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord("menu_item", params);
      
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
        throw new Error(error.message);
      }
    }
  }

  async deleteItem(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord("menu_item", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete menu item ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting menu item:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting menu item:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async toggleItemAvailability(id, isAvailable) {
    try {
      return await this.updateItem(id, { isAvailable });
    } catch (error) {
      throw new Error(`Failed to toggle item availability: ${error.message}`);
    }
  }

  async bulkUpdateAvailability(itemIds, isAvailable) {
    try {
      const updatePromises = itemIds.map(id => 
        this.updateItem(id, { isAvailable })
      );
      
      const results = await Promise.allSettled(updatePromises);
      const failures = results.filter(result => result.status === 'rejected');
      
      if (failures.length > 0) {
        console.error(`${failures.length} items failed to update availability`);
        throw new Error(`${failures.length} items failed to update`);
      }
      
      return results.map(result => result.value);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk updating availability:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error bulk updating availability:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

export const menuService = new MenuService();