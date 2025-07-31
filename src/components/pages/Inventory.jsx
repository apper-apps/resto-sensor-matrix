import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Inventory = () => {
  const comingSoonFeatures = [
    {
      icon: "Package",
      title: "Real-time Stock Tracking",
      description: "Monitor ingredient levels with automatic low-stock alerts and reorder points"
    },
    {
      icon: "Truck",
      title: "Supplier Management",
      description: "Manage vendor relationships, pricing, and delivery schedules in one place"
    },
    {
      icon: "Calendar",
      title: "Expiration Date Tracking",
      description: "FIFO inventory rotation with alerts for expiring items to minimize waste"
    },
    {
      icon: "TrendingUp",
      title: "Usage Analytics", 
      description: "Track consumption patterns and forecast inventory needs based on sales data"
    },
    {
      icon: "AlertTriangle",
      title: "Automated Reordering",
      description: "Set minimum stock levels and automatically generate purchase orders"
    },
    {
      icon: "DollarSign",
      title: "Cost Management",
      description: "Track food costs, portion control, and profit margins per menu item"
    }
  ];

  const mockInventoryItems = [
    { name: "Salmon Fillets", current: 12, minimum: 10, unit: "lbs", status: "low" },
    { name: "Olive Oil", current: 25, minimum: 5, unit: "bottles", status: "good" },
    { name: "Fresh Basil", current: 3, minimum: 8, unit: "bunches", status: "critical" },
    { name: "Chicken Breast", current: 45, minimum: 20, unit: "lbs", status: "good" },
    { name: "Parmesan Cheese", current: 8, minimum: 15, unit: "lbs", status: "low" },
    { name: "Pasta", current: 150, minimum: 50, unit: "lbs", status: "good" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return 'CheckCircle';
      case 'low': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      default: return 'Package';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Package" className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">Inventory Management</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track ingredients, manage suppliers, and optimize your restaurant's inventory
        </p>
      </div>

      {/* Coming Soon Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 font-medium">
          <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
          Coming Soon
        </div>
      </div>

      {/* Mock Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Current Inventory Preview
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Item</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Current Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Minimum</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInventoryItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 opacity-60">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <ApperIcon name={getStatusIcon(item.status)} className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.current} {item.unit}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.minimum} {item.unit}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status === 'good' ? 'In Stock' : item.status === 'low' ? 'Low Stock' : 'Critical'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Planned Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comingSoonFeatures.map((feature, index) => (
            <div 
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors duration-200">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-orange-600">156</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-red-600">8</div>
          <div className="text-sm text-gray-600">Low Stock</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-yellow-600">12</div>
          <div className="text-sm text-gray-600">Expiring Soon</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-green-600">$12,450</div>
          <div className="text-sm text-gray-600">Total Value</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Reduce waste and optimize costs with intelligent inventory management
        </p>
        <Button variant="primary" disabled>
          <ApperIcon name="Star" className="h-4 w-4 mr-2" />
          Get Notified When Available
        </Button>
      </div>
    </div>
  );
};

export default Inventory;