import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Staff = () => {
  const comingSoonFeatures = [
    {
      icon: "UserCheck",
      title: "Employee Profiles",
      description: "Comprehensive staff profiles with roles, contact info, and performance metrics"
    },
    {
      icon: "Calendar",
      title: "Shift Scheduling",
      description: "Drag-and-drop schedule builder with availability tracking and shift swapping"
    },
    {
      icon: "Clock",
      title: "Time & Attendance",
      description: "Digital clock-in/out system with break tracking and overtime calculations"
    },
    {
      icon: "DollarSign",
      title: "Payroll Integration",
      description: "Automated payroll calculations based on hours worked and performance bonuses"
    },
    {
      icon: "Award",
      title: "Performance Tracking",
      description: "Monitor staff performance with customer feedback and sales metrics"
    },
    {
      icon: "MessageSquare",
      title: "Internal Communication",
      description: "Team messaging, announcements, and shift handover notes"
    }
  ];

  const mockStaff = [
    { name: "Alice Johnson", role: "Head Chef", status: "on-shift", shift: "Morning", performance: 95 },
    { name: "Bob Martinez", role: "Server", status: "on-shift", shift: "Morning", performance: 88 },
    { name: "Carol Williams", role: "Server", status: "off-shift", shift: "Evening", performance: 92 },
    { name: "David Chen", role: "Sous Chef", status: "on-break", shift: "Morning", performance: 90 },
    { name: "Emma Thompson", role: "Bartender", status: "off-shift", shift: "Evening", performance: 94 },
    { name: "Frank Rodriguez", role: "Manager", status: "on-shift", shift: "All Day", performance: 97 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-shift': return 'bg-green-100 text-green-800';
      case 'off-shift': return 'bg-gray-100 text-gray-800';
      case 'on-break': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Manager': return 'bg-purple-100 text-purple-800';
      case 'Head Chef': return 'bg-red-100 text-red-800';
      case 'Sous Chef': return 'bg-orange-100 text-orange-800';
      case 'Server': return 'bg-blue-100 text-blue-800';
      case 'Bartender': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="UserCheck" className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">Staff Management</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your team schedules, track performance, and streamline communication
        </p>
      </div>

      {/* Coming Soon Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 font-medium">
          <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
          Coming Soon
        </div>
      </div>

      {/* Mock Staff List */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Current Staff Status
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStaff.map((employee, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 opacity-60">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(employee.role)}`}>
                      {employee.role}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                    {employee.status.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Shift:</span>
                  <span className="text-sm font-medium text-gray-900">{employee.shift}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Performance:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                        style={{ width: `${employee.performance}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{employee.performance}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Weekly Schedule Preview
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Monday</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Tuesday</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Wednesday</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Thursday</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Friday</th>
              </tr>
            </thead>
            <tbody className="opacity-60">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-900">9:00 AM</td>
                <td className="py-3 px-4 text-gray-600">Alice (Chef)</td>
                <td className="py-3 px-4 text-gray-600">Bob (Server)</td>
                <td className="py-3 px-4 text-gray-600">Alice (Chef)</td>
                <td className="py-3 px-4 text-gray-600">Carol (Server)</td>
                <td className="py-3 px-4 text-gray-600">Alice (Chef)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-900">2:00 PM</td>
                <td className="py-3 px-4 text-gray-600">David (Sous)</td>
                <td className="py-3 px-4 text-gray-600">Emma (Bar)</td>
                <td className="py-3 px-4 text-gray-600">David (Sous)</td>
                <td className="py-3 px-4 text-gray-600">Frank (Mgr)</td>
                <td className="py-3 px-4 text-gray-600">Emma (Bar)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-900">6:00 PM</td>
                <td className="py-3 px-4 text-gray-600">Carol (Server)</td>
                <td className="py-3 px-4 text-gray-600">Alice (Chef)</td>
                <td className="py-3 px-4 text-gray-600">Emma (Bar)</td>
                <td className="py-3 px-4 text-gray-600">Bob (Server)</td>
                <td className="py-3 px-4 text-gray-600">Frank (Mgr)</td>
              </tr>
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
              className="p-6 border border-gray-200 rounded-lg hover:border-purple-300 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-200">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-purple-600" />
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
          <div className="text-2xl font-bold text-purple-600">12</div>
          <div className="text-sm text-gray-600">Total Staff</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-gray-600">On Shift</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-yellow-600">2</div>
          <div className="text-sm text-gray-600">On Break</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-primary-600">92%</div>
          <div className="text-sm text-gray-600">Avg Performance</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Streamline staff management and improve team productivity
        </p>
        <Button variant="primary" disabled>
          <ApperIcon name="Star" className="h-4 w-4 mr-2" />
          Get Notified When Available
        </Button>
      </div>
    </div>
  );
};

export default Staff;