import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const DraggableOrderCard = ({ order, timer, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.Id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusConfig = (status) => {
    const configs = {
      received: { color: "bg-blue-100 text-blue-800", icon: "Clock", label: "Received" },
      preparing: { color: "bg-orange-100 text-orange-800", icon: "ChefHat", label: "Preparing" },
      ready: { color: "bg-green-100 text-green-800", icon: "CheckCircle", label: "Ready" },
      served: { color: "bg-gray-100 text-gray-800", icon: "Check", label: "Served" }
    };
    return configs[status] || configs.received;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 border border-gray-200 rounded-lg cursor-grab hover:border-primary-300 transition-all duration-200 ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="font-semibold text-sm text-gray-900">
          {order.orderNumber}
        </div>
        {timer && (
          <div className={`text-xs px-1.5 py-0.5 rounded font-medium ${
            timer.minutes > 30 ? 'bg-red-100 text-red-800' :
            timer.minutes > 15 ? 'bg-orange-100 text-orange-800' :
            'bg-green-100 text-green-800'
          }`}>
            {timer.minutes}m {timer.seconds}s
          </div>
        )}
      </div>
      
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <ApperIcon name="User" className="h-3 w-3" />
          {order.customerName}
        </div>
        <div className="flex items-center gap-1">
          <ApperIcon name={order.orderType === 'delivery' ? 'Truck' : 'MapPin'} className="h-3 w-3" />
          {order.tableNumber}
        </div>
        <div className="flex items-center gap-1">
          <ApperIcon name="Clock" className="h-3 w-3" />
          {formatTime(order.createdAt)}
        </div>
        <div className="flex items-center gap-1">
          <ApperIcon name="Package" className="h-3 w-3" />
          {order.items.length} items - {formatCurrency(order.totalAmount)}
        </div>
        {order.specialRequests && (
          <div className="flex items-center gap-1 text-orange-600">
            <ApperIcon name="AlertCircle" className="h-3 w-3" />
            Special requests
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableOrderCard;