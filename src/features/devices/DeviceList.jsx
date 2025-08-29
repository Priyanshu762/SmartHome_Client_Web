import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  ViewColumnsIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { DeviceCard } from './DeviceCard';
import { Button, Input, LoadingSpinner, Modal } from '../../components/ui/index.jsx';
import { useDeviceStore } from '../../store/deviceStore';
import { deviceApi } from '../../api/deviceApi';

/**
 * Device List Component with grid/list view and filtering
 */
export const DeviceList = () => {
  const { 
    devices, 
    loading, 
    error, 
    setDevices, 
    setLoading, 
    setError,
    updateDevice 
  } = useDeviceStore();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'online', 'offline'
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Load devices on component mount
  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await deviceApi.getDevices();
      setDevices(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  // Filter devices based on search and filters
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
    const matchesType = filterType === 'all' || device.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique device types for filter
  const deviceTypes = [...new Set(devices.map(device => device.type))];

  const handleDeviceControl = async (deviceId, action, value) => {
    try {
      await deviceApi.controlDevice(deviceId, action, value);
      // Update device state optimistically
      updateDevice(deviceId, { 
        isOn: value,
        lastToggled: new Date()
      });
    } catch (error) {
      console.error('Failed to control device:', error);
      // Could show a toast notification here
    }
  };

  const handleDeviceTimer = (device) => {
    setSelectedDevice(device);
    // TODO: Open timer modal
    console.log('Set timer for device:', device.name);
  };

  const handleDeviceEdit = (device) => {
    setSelectedDevice(device);
    // TODO: Open edit modal
    console.log('Edit device:', device.name);
  };

  if (loading && devices.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Devices
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and control your smart home devices
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            icon={<PlusIcon className="h-5 w-5" />}
            onClick={() => setShowAddModal(true)}
          >
            Add Device
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Types</option>
              {deviceTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <ViewColumnsIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <ListBulletIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Showing {filteredDevices.length} of {devices.length} devices</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">
                "{searchTerm}"
              </span>
            )}
            {filterStatus !== 'all' && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded">
                {filterStatus}
              </span>
            )}
            {filterType !== 'all' && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">
                {filterType.replace(/_/g, ' ')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <p className="text-red-800 dark:text-red-300">{error}</p>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={loadDevices}
            className="mt-2"
          >
            Retry
          </Button>
        </motion.div>
      )}

      {/* Device Grid/List */}
      <AnimatePresence mode="wait">
        {filteredDevices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No devices found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first smart device'
              }
            </p>
            <Button
              variant="primary"
              icon={<PlusIcon className="h-5 w-5" />}
              onClick={() => setShowAddModal(true)}
            >
              Add Device
            </Button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onControl={handleDeviceControl}
                onTimer={handleDeviceTimer}
                onEdit={handleDeviceEdit}
                className={viewMode === 'list' ? 'w-full' : ''}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Device Modal - TODO: Implement */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Device"
        size="lg"
      >
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            Add device functionality coming soon...
          </p>
        </div>
      </Modal>
    </div>
  );
};
