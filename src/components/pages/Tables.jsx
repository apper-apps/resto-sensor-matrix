import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button"; 

const Tables = () => {
  const comingSoonFeatures = [
    {
      icon: "Grid3X3",
      title: "Interactive Floor Plan",
      description: "Drag-and-drop table layout designer with customizable seating arrangements"
    },
    {
      icon: "Users",
      title: "Table Status Tracking",
      description: "Real-time status updates: available, occupied, reserved, cleaning required"
    },
    {
      icon: "Clock",
      title: "Reservation Management",
      description: "Advanced booking system with time slots and customer preferences"
    },
    {
      icon: "UserCheck",
      title: "Server Assignment",
      description: "Assign specific servers to tables and track service quality"
    },
    {
      icon: "Timer",
      title: "Service Timer",
      description: "Monitor table turnover times and optimize seating efficiency"
    },
    {
      icon: "Calendar",
      title: "Waitlist Management",
      description: "Smart queue system with SMS notifications for waiting customers"
    }
  ];

  const mockTables = [
    { id: 1, seats: 2, status: "available", server: null },
    { id: 2, seats: 4, status: "occupied", server: "Alice" },
    { id: 3, seats: 6, status: "reserved", server: "Bob" },
    { id: 4, seats: 2, status: "cleaning", server: null },
    { id: 5, seats: 4, status: "available", server: null },
    { id: 6, seats: 8, status: "occupied", server: "Carol" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cleaning': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Users" className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">Table Management</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Optimize your restaurant layout and track table status in real-time
        </p>
      </div>

      {/* Coming Soon Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 font-medium">
          <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
          Coming Soon
        </div>
      </div>

      {/* Mock Floor Plan Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Floor Plan Preview
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
          {mockTables.map((table) => (
            <div 
              key={table.id}
              className={`aspect-square border-2 rounded-lg p-3 flex flex-col items-center justify-center text-center opacity-60 ${getStatusColor(table.status)}`}
            >
              <div className="font-semibold text-sm mb-1">T{table.id}</div>
              <div className="text-xs mb-1">{table.seats} seats</div>
              <div className="text-xs capitalize">{table.status}</div>
              {table.server && (
                <div className="text-xs mt-1 font-medium">{table.server}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-200 rounded-full border border-green-300"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-200 rounded-full border border-red-300"></div>
            <span className="text-sm text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-200 rounded-full border border-yellow-300"></div>
            <span className="text-sm text-gray-600">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full border border-gray-300"></div>
            <span className="text-sm text-gray-600">Cleaning</span>
          </div>
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
              className="p-6 border border-gray-200 rounded-lg hover:border-accent-300 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors duration-200">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-accent-600" />
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
          <div className="text-2xl font-bold text-accent-600">24</div>
          <div className="text-sm text-gray-600">Total Tables</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-green-600">18</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-red-600">4</div>
          <div className="text-sm text-gray-600">Occupied</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-yellow-600">2</div>
          <div className="text-sm text-gray-600">Reserved</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Streamline your table management and improve customer experience
        </p>
        <Button variant="primary" disabled>
          <ApperIcon name="Star" className="h-4 w-4 mr-2" />
          Get Notified When Available
        </Button>
      </div>
    </div>
  );
};

export default Tables;