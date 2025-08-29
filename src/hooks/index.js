import { useState, useEffect, useCallback } from 'react';
import { useDeviceStore } from '../store/deviceStore';
import { deviceApi } from '../api/deviceApi';

/**
 * Custom hook for managing devices
 */
export const useDevices = () => {
  const {
    devices,
    loading,
    error,
    setDevices,
    setLoading,
    setError,
    addDevice,
    updateDevice,
    removeDevice,
    toggleDevice
  } = useDeviceStore();

  const [refreshing, setRefreshing] = useState(false);

  // Load devices
  const loadDevices = useCallback(async () => {
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
  }, [setDevices, setLoading, setError]);

  // Refresh devices
  const refreshDevices = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await deviceApi.getDevices();
      setDevices(response.data);
    } catch (err) {
      console.error('Failed to refresh devices:', err);
    } finally {
      setRefreshing(false);
    }
  }, [setDevices]);

  // Control device
  const controlDevice = useCallback(async (deviceId, action, value) => {
    try {
      await deviceApi.controlDevice(deviceId, action, value);
      
      // Update local state optimistically
      if (action === 'toggle') {
        toggleDevice(deviceId);
      } else {
        updateDevice(deviceId, { [action]: value });
      }
    } catch (error) {
      console.error('Failed to control device:', error);
      throw error;
    }
  }, [toggleDevice, updateDevice]);

  // Set device timer
  const setTimer = useCallback(async (deviceId, timerData) => {
    try {
      await deviceApi.setTimer(deviceId, timerData);
      updateDevice(deviceId, { timer: timerData });
    } catch (error) {
      console.error('Failed to set timer:', error);
      throw error;
    }
  }, [updateDevice]);

  // Add new device
  const createDevice = useCallback(async (deviceData) => {
    try {
      const response = await deviceApi.addDevice(deviceData);
      addDevice(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to add device:', error);
      throw error;
    }
  }, [addDevice]);

  // Delete device
  const deleteDevice = useCallback(async (deviceId) => {
    try {
      await deviceApi.deleteDevice(deviceId);
      removeDevice(deviceId);
    } catch (error) {
      console.error('Failed to delete device:', error);
      throw error;
    }
  }, [removeDevice]);

  // Discover new devices
  const discoverDevices = useCallback(async () => {
    try {
      const response = await deviceApi.discoverDevices();
      return response.data;
    } catch (error) {
      console.error('Failed to discover devices:', error);
      throw error;
    }
  }, []);

  // Load devices on mount
  useEffect(() => {
    if (devices.length === 0 && !loading) {
      loadDevices();
    }
  }, [devices.length, loading, loadDevices]);

  return {
    devices,
    loading,
    error,
    refreshing,
    loadDevices,
    refreshDevices,
    controlDevice,
    setTimer,
    createDevice,
    deleteDevice,
    discoverDevices
  };
};

/**
 * Custom hook for device status monitoring
 */
export const useDeviceStatus = (deviceId, pollingInterval = 30000) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = useCallback(async () => {
    if (!deviceId) return;

    try {
      setLoading(true);
      const response = await deviceApi.getDeviceStatus(deviceId);
      setStatus(response.data);
    } catch (error) {
      console.error('Failed to check device status:', error);
      setStatus(prev => prev ? { ...prev, status: 'error' } : null);
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    checkStatus();

    if (pollingInterval > 0) {
      const interval = setInterval(checkStatus, pollingInterval);
      return () => clearInterval(interval);
    }
  }, [checkStatus, pollingInterval]);

  return { status, loading, refresh: checkStatus };
};

/**
 * Custom hook for local storage
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Custom hook for debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for window size
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Custom hook for online status
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
