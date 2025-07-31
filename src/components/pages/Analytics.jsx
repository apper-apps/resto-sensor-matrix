import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Analytics = () => {
  const comingSoonFeatures = [
    {
      icon: "BarChart3",
      title: "Sales Analytics",
      description: "Track daily, weekly, and monthly sales with detailed revenue breakdowns"
    },
    {
      icon: "TrendingUp",
      title: "Popular Items Report",
      description: "Identify best-selling menu items and customer preferences over time"
    },
    {
      icon: "PieChart",
      title: "Category Performance",
      description: "Analyze which menu categories drive the most revenue and profit"
    },
    {
      icon: "Users",
      title: "Customer Insights",
      description: "Track customer behavior, repeat visits, and average order values"
    },
    {
      icon: "Clock",
      title: "Peak Hours Analysis",
      description: "Optimize staffing and inventory based on busiest restaurant hours"
    },
    {
      icon: "Target",
      title: "Goal Tracking",
      description: "Set and monitor revenue targets with progress indicators and forecasts"
    }
  ];

  const mockChartData = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1800 },
    { day: "Wed", sales: 1600 },
    { day: "Thu", sales: 2200 },
    { day: "Fri", sales: 2800 },
    { day: "Sat", sales: 3200 },
    { day: "Sun", sales: 2400 }
  ];

  const topItems = [
    { name: "Grilled Salmon", sales: 156, revenue: "$2,340" },
    { name: "Chicken Parmesan", sales: 134, revenue: "$2,010" },
    { name: "Caesar Salad", sales: 128, revenue: "$1,536" },
    { name: "Beef Ribeye", sales: 89, revenue: "$2,225" },
    { name: "Pasta Carbonara", sales: 76, revenue: "$1,368" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="BarChart3" className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">Analytics & Reports</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Gain insights into your restaurant's performance with comprehensive analytics
        </p>
      </div>

      {/* Coming Soon Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-medium">
          <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
          Coming Soon
        </div>
      </div>

      {/* Mock Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Weekly Sales Overview
          </h2>
          
          <div className="h-64 flex items-end justify-between gap-4 opacity-60">
            {mockChartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-md relative"
                  style={{ height: `${(item.sales / 3200) * 200}px` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                    ${item.sales}
                  </div>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600">{item.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Top Selling Items
          </h2>
          
          <div className="space-y-4 opacity-60">
            {topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.sales} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{item.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-blue-600">$15,840</div>
          <div className="text-sm text-gray-600">Weekly Revenue</div>
          <div className="text-xs text-green-600 mt-1">+12.5%</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-green-600">847</div>
          <div className="text-sm text-gray-600">Orders</div>
          <div className="text-xs text-green-600 mt-1">+8.3%</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-yellow-600">$18.70</div>
          <div className="text-sm text-gray-600">Avg Order</div>
          <div className="text-xs text-red-600 mt-1">-2.1%</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center opacity-60">
          <div className="text-2xl font-bold text-purple-600">94%</div>
          <div className="text-sm text-gray-600">Customer Satisfaction</div>
          <div className="text-xs text-green-600 mt-1">+1.2%</div>
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
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-blue-600" />
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

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Make data-driven decisions to grow your restaurant business
        </p>
        <Button variant="primary" disabled>
          <ApperIcon name="Star" className="h-4 w-4 mr-2" />
          Get Notified When Available
        </Button>
      </div>
    </div>
  );
};

export default Analytics;