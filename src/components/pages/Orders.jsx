import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DraggableOrderCard from "@/components/atoms/DraggableOrderCard";
import DroppableColumn from "@/components/atoms/DroppableColumn";
import { menuService } from "@/services/api/menuService";
import { orderService } from "@/services/api/orderService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Modal from "@/components/molecules/Modal";
import MenuItemCard from "@/components/molecules/MenuItemCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { Card, CardContent } from "@/components/atoms/Card";
const Orders = () => {
  // State management
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    items: [],
    customerId: '',
    customerName: '',
    tableNumber: '',
    orderType: 'dine-in',
    specialRequests: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
// Timer state for real-time updates
  const [timers, setTimers] = useState({});
  const [activeId, setActiveId] = useState(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Timer effect for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newTimers = {};
      
      orders.forEach(order => {
        const createdTime = new Date(order.updatedAt || order.createdAt);
        const diffMs = now - createdTime;
        const diffMins = Math.floor(diffMs / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        newTimers[order.Id] = { minutes: diffMins, seconds: diffSecs };
      });
      
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [ordersData, menuItemsData, customersData] = await Promise.all([
        orderService.getAllOrders(),
        menuService.getAllItems(),
        orderService.getAllCustomers()
      ]);
      setOrders(ordersData);
      setMenuItems(menuItemsData);
      setCustomers(customersData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load orders data");
    } finally {
      setLoading(false);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      received: { color: 'bg-blue-100 text-blue-800', icon: 'Clock', label: 'Received' },
      preparing: { color: 'bg-orange-100 text-orange-800', icon: 'ChefHat', label: 'Preparing' },
      ready: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle', label: 'Ready' },
      served: { color: 'bg-gray-100 text-gray-800', icon: 'Check', label: 'Served' }
    };
    return configs[status] || configs.received;
  };

  // Order operations
  const handleCreateOrder = () => {
    setCurrentOrder({
      items: [],
      customerId: '',
      customerName: '',
      tableNumber: '',
      orderType: 'dine-in',
      specialRequests: ''
    });
    setShowOrderModal(true);
  };

  const handleAddMenuItem = (item) => {
    const existingItem = currentOrder.items.find(orderItem => orderItem.menuItemId === item.Id);
    
    if (existingItem) {
      setCurrentOrder(prev => ({
        ...prev,
        items: prev.items.map(orderItem =>
          orderItem.menuItemId === item.Id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      }));
    } else {
      const newOrderItem = {
        Id: Date.now(),
        menuItemId: item.Id,
        menuItemName: item.name,
        quantity: 1,
        price: item.price,
        specialRequests: ''
      };
      setCurrentOrder(prev => ({
        ...prev,
        items: [...prev.items, newOrderItem]
      }));
    }
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      setCurrentOrder(prev => ({
        ...prev,
        items: prev.items.filter(item => item.Id !== itemId)
      }));
    } else {
      setCurrentOrder(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.Id === itemId ? { ...item, quantity } : item
        )
      }));
    }
  };

  const handleSaveOrder = async () => {
    try {
      if (!currentOrder.customerName || !currentOrder.tableNumber || currentOrder.items.length === 0) {
        toast.error("Please fill in all required fields and add at least one item");
        return;
      }

      const totalAmount = currentOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const orderData = {
        ...currentOrder,
        totalAmount
      };

      await orderService.createOrder(orderData);
      toast.success("Order created successfully!");
      setShowOrderModal(false);
      loadData();
    } catch (err) {
      toast.error("Failed to create order");
    }
  };

const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      loadData();
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  // Drag and drop handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const orderId = parseInt(active.id);
    const newStatus = over.id;
    const order = orders.find(o => o.Id === orderId);

    if (order && order.status !== newStatus) {
      await handleStatusUpdate(orderId, newStatus);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    
    try {
      await orderService.deleteOrder(orderId);
      toast.success("Order deleted successfully!");
      setSelectedOrder(null);
      loadData();
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage restaurant orders in real-time</p>
        </div>
        <Button onClick={handleCreateOrder} className="shrink-0">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search orders, customers, or tables..."
          />
        </div>
        <div className="flex gap-2">
          {['all', 'received', 'preparing', 'ready', 'served'].map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status === 'all' ? 'All' : getStatusConfig(status).label}
            </Button>
          ))}
        </div>
      </div>

      {/* Three-column layout */}
<DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
          {/* Status Columns - Kanban Style */}
          {['received', 'preparing', 'ready', 'served'].map(status => {
            const statusConfig = getStatusConfig(status);
            const statusOrders = filteredOrders.filter(order => order.status === status);
            
            return (
              <div key={status} className="flex flex-col">
                <Card className="flex-1 flex flex-col">
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <ApperIcon name={statusConfig.icon} className="h-4 w-4" />
                        <h2 className="text-sm font-semibold text-gray-900">{statusConfig.label}</h2>
                      </div>
                      <Badge className={`text-xs ${statusConfig.color}`}>
                        {statusOrders.length}
                      </Badge>
                    </div>

                    <DroppableColumn status={status}>
                      <div className="flex-1 overflow-y-auto space-y-3">
                        {statusOrders.length === 0 ? (
                          <div className="text-center text-gray-400 py-8">
                            <ApperIcon name="Package" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">No orders</p>
                          </div>
                        ) : (
                          statusOrders.map(order => (
                            <DraggableOrderCard
                              key={order.Id}
                              order={order}
                              timer={timers[order.Id]}
                              isSelected={selectedOrder?.Id === order.Id}
                              onClick={() => setSelectedOrder(order)}
                            />
                          ))
                        )}
                      </div>
                    </DroppableColumn>
                  </CardContent>
                </Card>
              </div>
            );
          })}

          {/* Right Column - Order Details */}
          <div className="flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                {selectedOrder ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(null)}
                      >
                        <ApperIcon name="X" className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4">
                      {/* Order Info */}
                      <div className="space-y-2">
                        <div className="font-semibold text-gray-900">{selectedOrder.orderNumber}</div>
                        <div className="text-sm text-gray-600">
                          <div>Customer: {selectedOrder.customerName}</div>
                          <div>Location: {selectedOrder.tableNumber}</div>
                          <div>Type: {selectedOrder.orderType}</div>
                          <div className="flex items-center gap-1">
                            <ApperIcon name="Clock" className="h-3 w-3" />
                            {formatTime(selectedOrder.createdAt)}
                            {timers[selectedOrder.Id] && (
                              <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                                {timers[selectedOrder.Id].minutes}m {timers[selectedOrder.Id].seconds}s
                              </span>
                            )}
                          </div>
                        </div>
                        {selectedOrder.specialRequests && (
                          <div className="text-sm">
                            <div className="font-medium text-gray-700">Special Requests:</div>
                            <div className="text-gray-600">{selectedOrder.specialRequests}</div>
                          </div>
                        )}
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Items</h3>
                        <div className="space-y-2">
                          {selectedOrder.items.map(item => (
                            <div key={item.Id} className="text-sm border border-gray-200 rounded p-2">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="font-medium">{item.menuItemName}</div>
                                  <div className="text-gray-600">Qty: {item.quantity}</div>
                                  {item.specialRequests && (
                                    <div className="text-gray-500 text-xs mt-1">
                                      Note: {item.specialRequests}
                                    </div>
                                  )}
                                </div>
                                <div className="font-medium">
                                  {formatCurrency(item.price * item.quantity)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-200 mt-2 pt-2 text-sm font-semibold flex justify-between">
                          <span>Total:</span>
                          <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                        </div>
                      </div>

                      {/* Menu Items Section */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Add Items</h3>
                        <div className="max-h-64 overflow-y-auto">
                          <div className="grid grid-cols-1 gap-2">
                            {menuItems.filter(item => item.isAvailable).slice(0, 6).map(item => (
                              <div key={item.Id} className="flex items-center justify-between p-2 border border-gray-200 rounded text-xs">
                                <div className="flex-1">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-gray-600">{formatCurrency(item.price)}</div>
                                </div>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="text-xs px-2 py-1"
                                  onClick={() => handleAddMenuItem(item)}
                                >
                                  <ApperIcon name="Plus" className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Payment & Actions */}
                      <div className="space-y-2">
                        <Button
                          variant="primary"
                          className="w-full"
                          disabled={selectedOrder.status !== 'served'}
                        >
                          <ApperIcon name="CreditCard" className="h-4 w-4 mr-2" />
                          Process Payment
                        </Button>
                        <Button
                          variant="danger"
                          className="w-full"
                          onClick={() => handleDeleteOrder(selectedOrder.Id)}
                        >
                          <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                          Delete Order
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <ApperIcon name="ClipboardList" className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>Select an order to view details</p>
                      <p className="text-xs mt-1">or drag orders between columns</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="p-3 border-2 border-primary-300 bg-primary-50 rounded-lg shadow-lg opacity-90">
              <div className="font-semibold text-sm text-gray-900">
                {orders.find(o => o.Id === parseInt(activeId))?.orderNumber}
              </div>
            </div>
          ) : null}
</DragOverlay>
      </DndContext>

      {/* Order Creation Modal */}
      <Modal 
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title="Create New Order"
        size="lg"
      >
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Customer Name *"
              value={currentOrder.customerName}
              onChange={(e) => setCurrentOrder(prev => ({...prev, customerName: e.target.value}))}
              placeholder="Enter customer name"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Table/Location *
              </label>
              <select
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={currentOrder.tableNumber}
                onChange={(e) => setCurrentOrder(prev => ({...prev, tableNumber: e.target.value}))}
              >
                <option value="">Select table or location</option>
                {orderService.getTables().map(table => (
                  <option key={table} value={table}>{table}</option>
                ))}
                <option value="Takeout">Takeout</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
          </div>

          {/* Order Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <div className="flex gap-4">
              {['dine-in', 'takeout', 'delivery'].map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="orderType"
                    value={type}
                    checked={currentOrder.orderType === type}
                    onChange={(e) => setCurrentOrder(prev => ({...prev, orderType: e.target.value}))}
                    className="mr-2"
                  />
                  <span className="capitalize">{type.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Current Order Items */}
          {currentOrder.items.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Current Order</h3>
              <div className="border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                {currentOrder.items.map(item => (
                  <div key={item.Id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.menuItemName}</div>
                      <div className="text-xs text-gray-500">{formatCurrency(item.price)} each</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => handleUpdateQuantity(item.Id, item.quantity - 1)}
                      >
                        <ApperIcon name="Minus" className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => handleUpdateQuantity(item.Id, item.quantity + 1)}
                      >
                        <ApperIcon name="Plus" className="h-3 w-3" />
                      </Button>
                      <div className="text-sm font-medium ml-2">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 mt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(currentOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
                </div>
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="3"
              value={currentOrder.specialRequests}
              onChange={(e) => setCurrentOrder(prev => ({...prev, specialRequests: e.target.value}))}
              placeholder="Any special requests or dietary restrictions..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowOrderModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSaveOrder}
              disabled={!currentOrder.customerName || !currentOrder.tableNumber || currentOrder.items.length === 0}
            >
              <ApperIcon name="Check" className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;