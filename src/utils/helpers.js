/**
 * Utility functions for the Smart Home Control Platform
 */

/**
 * Format device type for display
 */
export const formatDeviceType = (type) => {
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Get device icon based on type
 */
export const getDeviceIcon = (type, customIcon = null) => {
  if (customIcon) return customIcon;

  const iconMap = {
    air_conditioner: '❄️',
    smart_light: '💡',
    ceiling_fan: '🌀',
    sprinkler: '💧',
    security_camera: '📹',
    thermostat: '🌡️',
    smart_plug: '🔌',
    door_lock: '🔒',
    smoke_detector: '🚨',
    motion_sensor: '👁️',
    window_sensor: '🪟',
    garage_door: '🚪',
    water_heater: '🔥',
    dishwasher: '🍽️',
    washing_machine: '👕',
    refrigerator: '🧊',
    oven: '🔥',
    vacuum_cleaner: '🤖',
    air_purifier: '🌪️',
    humidifier: '💨',
    dehumidifier: '💧',
    heater: '🔥',
    blinds: '🪟',
    speaker: '🔊',
    tv: '📺',
    router: '📡',
    smart_switch: '⚡',
    doorbell: '🔔',
    water_leak_sensor: '💧'
  };

  return iconMap[type] || '🏠';
};

/**
 * Get status color class based on device status
 */
export const getStatusColor = (status, isOn = false) => {
  switch (status) {
    case 'online':
      return isOn ? 'text-green-500' : 'text-gray-400';
    case 'offline':
      return 'text-red-400';
    case 'error':
      return 'text-red-500';
    case 'loading':
    case 'connecting':
      return 'text-yellow-500';
    default:
      return 'text-gray-400';
  }
};

/**
 * Format energy usage for display
 */
export const formatEnergyUsage = (watts, includeUnit = true) => {
  if (watts === 0) return '0W';
  
  if (watts < 1000) {
    return `${watts}${includeUnit ? 'W' : ''}`;
  } else {
    return `${(watts / 1000).toFixed(1)}${includeUnit ? 'kW' : ''}`;
  }
};

/**
 * Format date/time for display
 */
export const formatDateTime = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };

  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);

  if (diffInDay > 0) {
    return `${diffInDay} day${diffInDay > 1 ? 's' : ''} ago`;
  } else if (diffInHour > 0) {
    return `${diffInHour} hour${diffInHour > 1 ? 's' : ''} ago`;
  } else if (diffInMin > 0) {
    return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

/**
 * Generate a random ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function for search inputs
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Clamp a number between min and max
 */
export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Check if device is online and responsive
 */
export const isDeviceOnline = (device) => {
  if (!device.lastSeen) return false;
  
  const lastSeenTime = new Date(device.lastSeen);
  const now = new Date();
  const timeDiff = now - lastSeenTime;
  
  // Consider offline if not seen in last 5 minutes
  return device.status === 'online' && timeDiff < 5 * 60 * 1000;
};

/**
 * Calculate device uptime percentage
 */
export const calculateUptime = (device) => {
  // Mock calculation - in real app, this would use historical data
  const baseUptime = device.status === 'online' ? 95 : 85;
  const randomVariation = Math.random() * 10 - 5;
  return Math.max(0, Math.min(100, baseUptime + randomVariation));
};

/**
 * Group devices by location/room
 */
export const groupDevicesByLocation = (devices, groups) => {
  const groupedDevices = {};
  
  // Initialize with groups
  groups.forEach(group => {
    groupedDevices[group.name] = {
      ...group,
      devices: []
    };
  });
  
  // Add ungrouped devices to "Other" category
  groupedDevices['Other'] = {
    id: 'other',
    name: 'Other',
    devices: []
  };
  
  // Assign devices to groups
  devices.forEach(device => {
    const group = groups.find(g => g.deviceIds.includes(device.id));
    if (group) {
      groupedDevices[group.name].devices.push(device);
    } else {
      groupedDevices['Other'].devices.push(device);
    }
  });
  
  // Remove empty groups
  Object.keys(groupedDevices).forEach(key => {
    if (groupedDevices[key].devices.length === 0 && key !== 'Other') {
      delete groupedDevices[key];
    }
  });
  
  return groupedDevices;
};

/**
 * Get device capabilities as human-readable list
 */
export const formatDeviceCapabilities = (capabilities) => {
  const capabilityMap = {
    power: 'Power Control',
    temperature: 'Temperature',
    brightness: 'Brightness',
    color: 'Color',
    timer: 'Timer',
    schedule: 'Scheduling',
    energy_monitoring: 'Energy Monitoring',
    motion_detection: 'Motion Detection',
    night_vision: 'Night Vision',
    recording: 'Recording',
    lock: 'Lock Control',
    unlock: 'Unlock Control',
    auto_lock: 'Auto Lock',
    speed: 'Speed Control',
    direction: 'Direction Control',
    zones: 'Zone Control',
    mode: 'Mode Selection',
    eco_mode: 'Eco Mode'
  };
  
  return capabilities
    .map(cap => capabilityMap[cap] || cap.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
    .join(', ');
};

/**
 * Validate device configuration
 */
export const validateDeviceConfig = (device) => {
  const errors = [];
  
  if (!device.name || device.name.trim().length === 0) {
    errors.push('Device name is required');
  }
  
  if (!device.type) {
    errors.push('Device type is required');
  }
  
  if (!device.apiEndpoint || !isValidUrl(device.apiEndpoint)) {
    errors.push('Valid API endpoint is required');
  }
  
  if (!device.capabilities || device.capabilities.length === 0) {
    errors.push('At least one capability is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Check if string is a valid URL
 */
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Format bytes to human readable size
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
