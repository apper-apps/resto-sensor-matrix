// Mock data for tables
const mockTables = [
  { Id: 1, number: 1, seats: 2, status: "available", server: null, x: 100, y: 100, shape: "round" },
  { Id: 2, number: 2, seats: 4, status: "occupied", server: "Alice", x: 250, y: 100, shape: "square" },
  { Id: 3, number: 3, seats: 6, status: "reserved", server: "Bob", x: 400, y: 100, shape: "rectangle" },
  { Id: 4, number: 4, seats: 2, status: "cleaning", server: null, x: 100, y: 250, shape: "round" },
  { Id: 5, number: 5, seats: 4, status: "available", server: null, x: 250, y: 250, shape: "square" },
  { Id: 6, number: 6, seats: 8, status: "occupied", server: "Carol", x: 400, y: 250, shape: "rectangle" }
];

// Simulated delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TableService {
  constructor() {
    this.tables = JSON.parse(JSON.stringify(mockTables));
  }

  async getAllTables() {
    await delay(300);
    return [...this.tables];
  }

  async getTableById(id) {
    await delay(200);
    const table = this.tables.find(table => table.Id === parseInt(id));
    if (!table) {
      throw new Error("Table not found");
    }
    return { ...table };
  }

  async createTable(tableData) {
    await delay(300);
    const newTable = {
      Id: Math.max(...this.tables.map(t => t.Id), 0) + 1,
      number: Math.max(...this.tables.map(t => t.number), 0) + 1,
      ...tableData,
      server: null,
      status: "available"
    };
    this.tables.push(newTable);
    return newTable;
  }

  async updateTable(id, updates) {
    await delay(300);
    const index = this.tables.findIndex(table => table.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Table not found");
    }
    
    this.tables[index] = { ...this.tables[index], ...updates };
    return { ...this.tables[index] };
  }

  async updateTablePosition(id, x, y) {
    await delay(200);
    return this.updateTable(id, { x, y });
  }

  async updateTableStatus(id, status) {
    await delay(200);
    return this.updateTable(id, { status });
  }

  async deleteTable(id) {
    await delay(300);
    const index = this.tables.findIndex(table => table.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Table not found");
    }
    
    this.tables.splice(index, 1);
    return true;
  }

  async getTableStats() {
    await delay(200);
    const stats = {
      total: this.tables.length,
      available: this.tables.filter(t => t.status === 'available').length,
      occupied: this.tables.filter(t => t.status === 'occupied').length,
      reserved: this.tables.filter(t => t.status === 'reserved').length,
      cleaning: this.tables.filter(t => t.status === 'cleaning').length
    };
    return stats;
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