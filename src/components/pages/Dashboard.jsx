import React, { useState, useEffect } from "react";
import MetricCard from "@/components/molecules/MetricCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { menuService } from "@/services/api/menuService";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError("");
      
const categories = await menuService.getAllCategories();
      const items = await menuService.getAllItems();
      
      const activeItems = items.filter(item => item.isAvailable);
      setMetrics({
        totalItems: items.length,
        activeItems: activeItems.length,
        categories: categories.length,
        todayRevenue: 2456.78 // Mock data for now
      });
} catch (err) {
      setError(err.message || "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Restaurant overview and key metrics</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white rounded-lg border border-gray-200 p-6 h-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadMetrics} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-gray-600">Restaurant overview and key metrics</p>
      </div>

      {/* Metrics Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Menu Items"
          value={metrics?.totalItems || 0}
          icon="ChefHat"
          trend="up"
          trendValue="+12%"
          color="primary"
        />
        
        <MetricCard
          title="Active Items"
          value={metrics?.activeItems || 0}
          icon="CheckCircle"
          trend="up"
          trendValue="+8%"
          color="success"
        />
        
        <MetricCard
          title="Categories"
          value={metrics?.categories || 0}
          icon="Grid3X3"
          trend="neutral"
          trendValue="0%"
          color="accent"
        />
        
        <MetricCard
          title="Today's Revenue"
          value={`$${(metrics?.todayRevenue || 0).toFixed(2)}`}
          icon="DollarSign"
          trend="up"
          trendValue="+15%"
          color="warning"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors duration-200 cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors duration-200">
                <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Add Menu Item</h3>
                <p className="text-sm text-gray-600">Create new dish</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors duration-200 cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary-100 rounded-lg group-hover:bg-secondary-200 transition-colors duration-200">
                <svg className="h-5 w-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View Orders</h3>
                <p className="text-sm text-gray-600">Check pending orders</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors duration-200 cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors duration-200">
                <svg className="h-5 w-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Check performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;