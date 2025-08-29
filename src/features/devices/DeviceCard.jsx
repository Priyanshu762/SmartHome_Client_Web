import React from 'react';
import { motion } from 'framer-motion';
import { 
  PowerIcon, 
  ClockIcon, 
  WifiIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { Card, StatusBadge, Toggle } from '../../components/ui/index.jsx';
import { useDeviceStore } from '../../store/deviceStore';

/**
 * Device Card Component
 */
export const DeviceCard = ({ device, onControl, onTimer, onEdit, className = '' }) => {
  const { toggleDevice, setDeviceTimer } = useDeviceStore();

  const handleToggle = async () => {
    try {
      await onControl?.(device.id, 'toggle', !device.isOn);
      toggleDevice(device.id);
    } catch (error) {
      console.error('Failed to toggle device:', error);
    }
  };

  const handleTimerSet = () => {
    onTimer?.(device);
  };

  const getDeviceIcon = (type, icon) => {
    if (icon) return icon;
    
    const iconMap = {
      air_conditioner: '❄️',
      smart_light: '💡',
      ceiling_fan: '🌀',
      sprinkler: '💧',
      security_camera: '📹',
      thermostat: '🌡️',
      smart_plug: '🔌',
      door_lock: '🔒'
    };
    
    return iconMap[type] || '🏠';
  };

  const getStatusColor = (status, isOn) => {
    if (status === 'offline') return 'text-gray-400';
    if (status === 'error') return 'text-red-500';
    return isOn ? 'text-green-500' : 'text-gray-400';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
      className={`device-card ${device.status === 'online' ? 'online' : 'offline'} ${className}`}
    >
      <Card className="h-full p-6 relative overflow-hidden">
        {/* Device Icon & Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getDeviceIcon(device.type, device.icon)}</div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {device.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {device.brand} {device.model}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <WifiIcon 
              className={`h-4 w-4 ${getStatusColor(device.status, device.isOn)}`} 
            />
            <StatusBadge status={device.status} />
          </div>
        </div>

        {/* Device Controls */}
        <div className="space-y-4">
          {/* Power Control */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PowerIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Power
              </span>
            </div>
            <Toggle
              checked={device.isOn}
              onChange={handleToggle}
              disabled={device.status !== 'online'}
            />
          </div>

          {/* Energy Usage */}
          {device.energyUsage > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Energy Usage</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {device.energyUsage}W
              </span>
            </div>
          )}

          {/* Current Settings */}
          {device.currentSettings && Object.keys(device.currentSettings).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Settings
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(device.currentSettings).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {typeof value === 'boolean' ? (value ? 'On' : 'Off') : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTimerSet}
            disabled={device.status !== 'online'}
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <ClockIcon className="h-4 w-4 mr-1" />
            Timer
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEdit?.(device)}
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            Edit
          </motion.button>
        </div>

        {/* Warning for offline devices */}
        {device.status === 'offline' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2"
          >
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          </motion.div>
        )}

        {/* Last seen indicator */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {device.status === 'online' 
            ? 'Online' 
            : `Last seen: ${new Date(device.lastSeen).toLocaleTimeString()}`
          }
        </div>
      </Card>
    </motion.div>
  );
};
