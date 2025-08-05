import React, { useEffect, useState } from "react";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, useDraggable } from "@dnd-kit/core";
import { toast } from "react-toastify";
import { tableService } from "@/services/api/tableService";
import ApperIcon from "@/components/ApperIcon";
import Modal from "@/components/molecules/Modal";
import Loading from "@/components/ui/Loading";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

// Draggable Table Component
const DraggableTable = ({ table, onClick, onStatusChange, viewMode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: table.Id.toString(),
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200';
      case 'cleaning': return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
    }
  };

  const getShapeClass = (shape) => {
    switch (shape) {
      case 'round': return 'rounded-full';
      case 'square': return 'rounded-lg';
      case 'rectangle': return 'rounded-lg';
      default: return 'rounded-lg';
    }
  };

  const getSize = () => {
    if (viewMode === 'compact') {
      return 'w-16 h-16';
    }
    return table.shape === 'rectangle' ? 'w-20 h-16' : 'w-18 h-18';
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'absolute',
        left: table.x,
        top: table.y,
        zIndex: isDragging ? 1000 : 1
      }}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab active:cursor-grabbing select-none",
        isDragging && "opacity-50"
      )}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick(table);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          onStatusChange(table);
        }}
        className={cn(
          "border-2 flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm hover:shadow-md",
          getSize(),
          getShapeClass(table.shape),
          getStatusColor(table.status)
        )}
      >
        <div className="font-bold text-xs">{table.number}</div>
        {viewMode === 'detailed' && (
          <>
            <div className="text-xs">{table.seats}</div>
            {table.server && (
              <div className="text-xs font-medium">{table.server}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('detailed');
  const [selectedTemplate, setSelectedTemplate] = useState('casual');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [statusMenuTable, setStatusMenuTable] = useState(null);
  const [statusMenuPosition, setStatusMenuPosition] = useState({ x: 0, y: 0 });

  const [newTable, setNewTable] = useState({
    seats: 4,
    shape: 'round',
    x: 200,
    y: 200
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load tables and stats
  const loadData = async () => {
    try {
      setLoading(true);
      const [tablesData, statsData] = await Promise.all([
        tableService.getAllTables(),
        tableService.getTableStats()
      ]);
      setTables(tablesData);
      setStats(statsData);
    } catch (error) {
      toast.error('Failed to load tables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle drag end
  const handleDragEnd = async (event) => {
    const { active, delta } = event;
    
    if (delta.x === 0 && delta.y === 0) return;

    const tableId = parseInt(active.id);
    const table = tables.find(t => t.Id === tableId);
    
    if (table) {
      const newX = Math.max(0, table.x + delta.x);
      const newY = Math.max(0, table.y + delta.y);
      
try {
        await tableService.updateTablePosition(tableId, newX, newY);
        setTables(prev => prev.map(t => 
          t.Id === tableId ? { ...t, x: newX, y: newY } : t
        ));
        toast.success(`Table ${table.number} moved`);
      } catch (error) {
        toast.error(error.message || 'Failed to move table');
      }
    }
  };

  // Handle table click for editing
  const handleTableClick = (table) => {
    setEditingTable(table);
    setShowEditModal(true);
  };

  // Handle right-click for status menu
  const handleStatusChange = (table) => {
    setStatusMenuTable(table);
    setShowStatusMenu(true);
  };

  // Update table status
  const updateTableStatus = async (tableId, status) => {
    try {
      await tableService.updateTableStatus(tableId, status);
      setTables(prev => prev.map(t => 
        t.Id === tableId ? { ...t, status } : t
      ));
await loadData(); // Refresh stats
      toast.success(`Table status updated to ${status}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update table status');
    }
    setShowStatusMenu(false);
    setStatusMenuTable(null);
  };

  // Add new table
  const handleAddTable = async () => {
    try {
      const addedTable = await tableService.createTable(newTable);
      setTables(prev => [...prev, addedTable]);
      await loadData(); // Refresh stats
      setShowAddModal(false);
      setNewTable({
        seats: 4,
        shape: 'round',
        x: 200,
        y: 200
      });
toast.success(`Table ${addedTable.number} added`);
    } catch (error) {
      toast.error(error.message || 'Failed to add table');
    }
  };

  // Update table
  const handleUpdateTable = async () => {
    try {
      await tableService.updateTable(editingTable.Id, editingTable);
      setTables(prev => prev.map(t => 
        t.Id === editingTable.Id ? editingTable : t
      ));
      await loadData(); // Refresh stats
      setShowEditModal(false);
      setEditingTable(null);
toast.success(`Table ${editingTable.number} updated`);
    } catch (error) {
      toast.error(error.message || 'Failed to update table');
    }
  };

  // Delete table
  const handleDeleteTable = async (tableId) => {
    try {
      await tableService.deleteTable(tableId);
      setTables(prev => prev.filter(t => t.Id !== tableId));
      await loadData(); // Refresh stats
      setShowEditModal(false);
      setEditingTable(null);
toast.success('Table deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete table');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading floor plan...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Table Management</h1>
          <p className="text-gray-600 mt-2">
            Drag tables to reposition • Right-click to change status
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed')}
          >
            <ApperIcon name={viewMode === 'detailed' ? 'Minimize2' : 'Maximize2'} className="h-4 w-4 mr-2" />
            {viewMode === 'detailed' ? 'Compact' : 'Detailed'}
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-accent-600">{stats.total || 0}</div>
          <div className="text-sm text-gray-600">Total Tables</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.available || 0}</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.occupied || 0}</div>
          <div className="text-sm text-gray-600">Occupied</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.reserved || 0}</div>
          <div className="text-sm text-gray-600">Reserved</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.cleaning || 0}</div>
          <div className="text-sm text-gray-600">Cleaning</div>
        </div>
      </div>

      {/* Floor Plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Floor Plan</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded-full border border-green-300"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 rounded-full border border-red-300"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-200 rounded-full border border-yellow-300"></div>
                <span>Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded-full border border-blue-300"></div>
                <span>Cleaning</span>
              </div>
            </div>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div 
            className="relative bg-gray-50 border border-gray-200 rounded-lg min-h-96 overflow-hidden"
            onClick={() => setShowStatusMenu(false)}
          >
            {tables.map((table) => (
              <DraggableTable
                key={table.Id}
                table={table}
                onClick={handleTableClick}
                onStatusChange={handleStatusChange}
                viewMode={viewMode}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {/* Add Table Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Table"
      >
        <div className="space-y-4">
          <Input
            label="Number of Seats"
            type="number"
            value={newTable.seats}
            onChange={(e) => setNewTable(prev => ({ ...prev, seats: parseInt(e.target.value) }))}
            min="1"
            max="12"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table Shape
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['round', 'square', 'rectangle'].map((shape) => (
                <button
                  key={shape}
                  onClick={() => setNewTable(prev => ({ ...prev, shape }))}
                  className={cn(
                    "p-2 text-sm rounded-lg border-2 transition-colors capitalize",
                    newTable.shape === shape
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="X Position"
              type="number"
              value={newTable.x}
              onChange={(e) => setNewTable(prev => ({ ...prev, x: parseInt(e.target.value) }))}
              min="0"
            />
            <Input
              label="Y Position"
              type="number"
              value={newTable.y}
              onChange={(e) => setNewTable(prev => ({ ...prev, y: parseInt(e.target.value) }))}
              min="0"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddTable} className="flex-1">
              Add Table
            </Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Table Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit Table ${editingTable?.number}`}
      >
        {editingTable && (
          <div className="space-y-4">
            <Input
              label="Table Number"
              type="number"
              value={editingTable.number}
              onChange={(e) => setEditingTable(prev => ({ ...prev, number: parseInt(e.target.value) }))}
              min="1"
            />
            
            <Input
              label="Number of Seats"
              type="number"
              value={editingTable.seats}
              onChange={(e) => setEditingTable(prev => ({ ...prev, seats: parseInt(e.target.value) }))}
              min="1"
              max="12"
            />

            <Input
              label="Server"
              value={editingTable.server || ''}
              onChange={(e) => setEditingTable(prev => ({ ...prev, server: e.target.value || null }))}
              placeholder="Assign server (optional)"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Table Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['round', 'square', 'rectangle'].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setEditingTable(prev => ({ ...prev, shape }))}
                    className={cn(
                      "p-2 text-sm rounded-lg border-2 transition-colors capitalize",
                      editingTable.shape === shape
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['available', 'occupied', 'reserved', 'cleaning'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setEditingTable(prev => ({ ...prev, status }))}
                    className={cn(
                      "p-2 text-sm rounded-lg border-2 transition-colors capitalize",
                      editingTable.status === status
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleUpdateTable} className="flex-1">
                Update Table
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDeleteTable(editingTable.Id)}
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Menu */}
      {showStatusMenu && statusMenuTable && (
        <div 
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-32"
          style={{
            left: statusMenuPosition.x,
            top: statusMenuPosition.y
          }}
        >
          {['available', 'occupied', 'reserved', 'cleaning'].map((status) => (
            <button
              key={status}
              onClick={() => updateTableStatus(statusMenuTable.Id, status)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 capitalize"
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tables;