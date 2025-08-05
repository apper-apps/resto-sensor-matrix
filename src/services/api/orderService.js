class OrderService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  // Order methods
  async getAllOrders() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "orderNumber" } },
          { field: { Name: "customerName" } },
          { field: { Name: "tableNumber" } },
          { field: { Name: "orderType" } },
          { field: { Name: "status" } },
          { field: { Name: "specialRequests" } },
          { field: { Name: "totalAmount" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "customerId" } }
        ],
        orderBy: [
          {
            fieldName: "createdAt",
            sorttype: "DESC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching orders:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching orders:", error.message);
        throw error;
      }
    }
  }

  async getOrderById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "orderNumber" } },
          { field: { Name: "customerName" } },
          { field: { Name: "tableNumber" } },
          { field: { Name: "orderType" } },
          { field: { Name: "status" } },
          { field: { Name: "specialRequests" } },
          { field: { Name: "totalAmount" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "customerId" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('order', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching order with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching order with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  async getOrdersByStatus(status) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "orderNumber" } },
          { field: { Name: "customerName" } },
          { field: { Name: "tableNumber" } },
          { field: { Name: "orderType" } },
          { field: { Name: "status" } },
          { field: { Name: "specialRequests" } },
          { field: { Name: "totalAmount" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "customerId" } }
        ],
        where: [
          {
            FieldName: "status",
            Operator: "EqualTo",
            Values: [status]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching orders by status:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching orders by status:", error.message);
        throw error;
      }
    }
  }

  async createOrder(orderData) {
    try {
      const orderNumber = `ORD-${String(Date.now()).slice(-6)}`;
      
      const params = {
        records: [
          {
            Name: orderData.customerName || `Order for ${orderData.customerName}`,
            orderNumber: orderNumber,
            customerName: orderData.customerName,
            tableNumber: orderData.tableNumber,
            orderType: orderData.orderType || "dine-in",
            status: "received",
            specialRequests: orderData.specialRequests || "",
            totalAmount: parseFloat(orderData.totalAmount) || 0,
            customerId: orderData.customerId ? parseInt(orderData.customerId) : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };

      const response = await this.apperClient.createRecord('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create order ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
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
        console.error("Error creating order:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating order:", error.message);
        throw error;
      }
    }
  }

  async updateOrder(id, updates) {
    try {
      const updateData = {
        Id: parseInt(id)
      };

      // Only include updateable fields
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.orderNumber !== undefined) updateData.orderNumber = updates.orderNumber;
      if (updates.customerName !== undefined) updateData.customerName = updates.customerName;
      if (updates.tableNumber !== undefined) updateData.tableNumber = updates.tableNumber;
      if (updates.orderType !== undefined) updateData.orderType = updates.orderType;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.specialRequests !== undefined) updateData.specialRequests = updates.specialRequests;
      if (updates.totalAmount !== undefined) updateData.totalAmount = parseFloat(updates.totalAmount);
      if (updates.customerId !== undefined) updateData.customerId = updates.customerId ? parseInt(updates.customerId) : null;
      updateData.updatedAt = new Date().toISOString();

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update order ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
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
        console.error("Error updating order:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating order:", error.message);
        throw error;
      }
    }
  }

  async updateOrderStatus(id, status) {
    return this.updateOrder(id, { status });
  }

  async deleteOrder(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete order ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting order:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting order:", error.message);
        throw error;
      }
    }
  }

  // Customer methods
  async getAllCustomers() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('app_Customer', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching customers:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching customers:", error.message);
        throw error;
      }
    }
  }

  async getCustomerById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('app_Customer', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching customer with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching customer with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  // Table/delivery locations - keeping as static for now
  getTables() {
    return [
      "Table 1", "Table 2", "Table 3", "Table 4", "Table 5",
      "Table 6", "Table 7", "Table 8", "Table 9", "Table 10",
      "Bar Seat 1", "Bar Seat 2", "Bar Seat 3", "Bar Seat 4",
      "Patio Table 1", "Patio Table 2", "Patio Table 3"
    ];
  }

  // Order statistics
  async getOrderStats() {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Get all orders
      const allOrders = await this.getAllOrders();
      const todayOrders = allOrders.filter(order => 
        order.createdAt && order.createdAt.startsWith(today)
      );

      return {
        total: allOrders.length,
        today: todayOrders.length,
        pending: allOrders.filter(o => o.status === 'received').length,
        preparing: allOrders.filter(o => o.status === 'preparing').length,
        ready: allOrders.filter(o => o.status === 'ready').length,
        completed: allOrders.filter(o => o.status === 'served').length,
        totalRevenue: allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
        todayRevenue: todayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching order stats:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching order stats:", error.message);
        throw error;
      }
    }
  }
}

export const orderService = new OrderService();