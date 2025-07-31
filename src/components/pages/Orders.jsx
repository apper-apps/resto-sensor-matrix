import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Orders = () => {
  const comingSoonFeatures = [
    {
      icon: "ClipboardList",
      title: "Order Queue Management",
      description: "Real-time order tracking with priority levels and estimated completion times"
    },
    {
      icon: "Clock",
      title: "Kitchen Timer Integration", 
      description: "Automatic timing for each order with notifications for kitchen staff"
    },
    {
      icon: "Users",
      title: "Table Assignment",
      description: "Link orders to specific tables and track dining progress"
    },
    {
      icon: "Receipt",
      title: "Order History & Analytics",
      description: "Detailed order reports and customer preference tracking"
    },
    {
      icon: "Smartphone",
      title: "Mobile Order Integration",
      description: "Seamless integration with delivery apps and online ordering systems"
    },
    {
      icon: "Bell",
      title: "Smart Notifications",
      description: "Automated alerts for order status changes and customer updates"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="ClipboardList" className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">Order Management</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Streamline your restaurant's order processing with our comprehensive order management system
        </p>
      </div>

      {/* Coming Soon Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 font-medium">
          <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
          Coming Soon
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
              className="p-6 border border-gray-200 rounded-lg hover:border-secondary-300 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-100 rounded-lg group-hover:bg-secondary-200 transition-colors duration-200">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-secondary-600" />
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

      {/* Preview Interface */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Interface Preview
        </h2>
        
        <div className="space-y-4">
          {/* Mock order cards */}
          {[
            { id: "#001", table: "Table 5", items: 3, time: "12:45 PM", status: "preparing" },
            { id: "#002", table: "Table 2", items: 2, time: "12:50 PM", status: "ready" },
            { id: "#003", table: "Delivery", items: 5, time: "1:15 PM", status: "pending" }
          ].map((order, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-60"
            >
              <div className="flex items-center gap-4">
                <div className="font-semibold text-gray-900">{order.id}</div>
                <div className="text-gray-600">{order.table}</div>
                <div className="text-sm text-gray-500">{order.items} items</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">{order.time}</div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'ready' ? 'bg-green-100 text-green-800' :
                  order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Stay tuned for the complete order management experience
        </p>
        <Button variant="primary" disabled>
          <ApperIcon name="Star" className="h-4 w-4 mr-2" />
          Get Notified When Available
        </Button>
      </div>
    </div>
  );
};

export default Orders;