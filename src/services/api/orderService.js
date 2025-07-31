import ordersData from "@/services/mockData/orders.json";
import customersData from "@/services/mockData/customers.json";

// Simulated delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  constructor() {
    // Initialize with deep copies to prevent mutations
    this.orders = JSON.parse(JSON.stringify(ordersData));
    this.customers = JSON.parse(JSON.stringify(customersData));
  }

  // Order methods
  async getAllOrders() {
    await delay(300);
    return [...this.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getOrderById(id) {
    await delay(200);
    const order = this.orders.find(order => order.Id === parseInt(id));
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  }

  async getOrdersByStatus(status) {
    await delay(300);
    return this.orders.filter(order => order.status === status);
  }

  async createOrder(orderData) {
    await delay(300);
    const orderNumber = `ORD-${String(Math.max(...this.orders.map(o => parseInt(o.orderNumber.split('-')[1])), 0) + 1).padStart(3, '0')}`;
    
    const newOrder = {
      Id: Math.max(...this.orders.map(o => o.Id), 0) + 1,
      orderNumber,
      ...orderData,
      status: "received",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.orders.push(newOrder);
    return newOrder;
  }

  async updateOrder(id, updates) {
    await delay(300);
    const index = this.orders.findIndex(order => order.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    
    this.orders[index] = {
      ...this.orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.orders[index] };
  }

  async updateOrderStatus(id, status) {
    await delay(200);
    return this.updateOrder(id, { status });
  }

  async deleteOrder(id) {
    await delay(300);
    const index = this.orders.findIndex(order => order.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    
    this.orders.splice(index, 1);
    return true;
  }

  // Customer methods
  async getAllCustomers() {
    await delay(200);
    return [...this.customers];
  }

  async getCustomerById(id) {
    await delay(200);
    const customer = this.customers.find(customer => customer.Id === parseInt(id));
    if (!customer) {
      throw new Error("Customer not found");
    }
    return { ...customer };
  }

  // Table/delivery locations
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
    await delay(200);
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = this.orders.filter(order => 
      order.createdAt.startsWith(today)
    );

    return {
      total: this.orders.length,
      today: todayOrders.length,
      pending: this.orders.filter(o => o.status === 'received').length,
      preparing: this.orders.filter(o => o.status === 'preparing').length,
      ready: this.orders.filter(o => o.status === 'ready').length,
      completed: this.orders.filter(o => o.status === 'served').length,
      totalRevenue: this.orders.reduce((sum, order) => sum + order.totalAmount, 0),
      todayRevenue: todayOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    };
  }
}

export const orderService = new OrderService();