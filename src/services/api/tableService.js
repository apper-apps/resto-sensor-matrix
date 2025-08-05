class TableService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAllTables() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "number" } },
          { field: { Name: "seats" } },
          { field: { Name: "status" } },
          { field: { Name: "server" } },
          { field: { Name: "x" } },
          { field: { Name: "y" } },
          { field: { Name: "shape" } }
        ],
        orderBy: [
          {
            fieldName: "number",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('table', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tables:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tables:", error.message);
        throw error;
      }
    }
  }

  async getTableById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "number" } },
          { field: { Name: "seats" } },
          { field: { Name: "status" } },
          { field: { Name: "server" } },
          { field: { Name: "x" } },
          { field: { Name: "y" } },
          { field: { Name: "shape" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('table', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching table with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching table with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  async createTable(tableData) {
    try {
      const params = {
        records: [
          {
            Name: `Table ${tableData.number || 'New'}`,
            number: parseInt(tableData.number) || 1,
            seats: parseInt(tableData.seats) || 4,
            status: tableData.status || "available",
            server: tableData.server || "",
            x: parseInt(tableData.x) || 100,
            y: parseInt(tableData.y) || 100,
            shape: tableData.shape || "round"
          }
        ]
      };

      const response = await this.apperClient.createRecord('table', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create table ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
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
        console.error("Error creating table:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating table:", error.message);
        throw error;
      }
    }
  }

  async updateTable(id, updates) {
    try {
      const updateData = {
        Id: parseInt(id)
      };

      // Only include updateable fields
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.number !== undefined) updateData.number = parseInt(updates.number);
      if (updates.seats !== undefined) updateData.seats = parseInt(updates.seats);
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.server !== undefined) updateData.server = updates.server;
      if (updates.x !== undefined) updateData.x = parseInt(updates.x);
      if (updates.y !== undefined) updateData.y = parseInt(updates.y);
      if (updates.shape !== undefined) updateData.shape = updates.shape;

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord('table', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update table ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
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
        console.error("Error updating table:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating table:", error.message);
        throw error;
      }
    }
  }

  async updateTablePosition(id, x, y) {
    return this.updateTable(id, { x, y });
  }

  async updateTableStatus(id, status) {
    return this.updateTable(id, { status });
  }

  async deleteTable(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('table', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete table ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting table:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting table:", error.message);
        throw error;
      }
    }
  }

  async getTableStats() {
    try {
      const tables = await this.getAllTables();
      
      const stats = {
        total: tables.length,
        available: tables.filter(t => t.status === 'available').length,
        occupied: tables.filter(t => t.status === 'occupied').length,
        reserved: tables.filter(t => t.status === 'reserved').length,
        cleaning: tables.filter(t => t.status === 'cleaning').length
      };
      
      return stats;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching table stats:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching table stats:", error.message);
        throw error;
      }
    }
  }

  getFloorPlanTemplates() {
    return [
      { id: 'casual', name: 'Casual Dining', tables: 12 },
      { id: 'fine', name: 'Fine Dining', tables: 8 },
      { id: 'cafe', name: 'Cafe Style', tables: 16 },
      { id: 'bar', name: 'Bar & Grill', tables: 10 }
    ];
  }
}

export const tableService = new TableService();