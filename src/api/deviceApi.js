import { apiClient, handleApiError, withRetry, USE_MOCK_DATA } from './client';
import { mockDevices } from './mockData';

// Simulate API delay for realistic mock behavior
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Device API service
 */
export const deviceApi = {
  // Get all devices
  async getDevices() {
    if (USE_MOCK_DATA) {
      await simulateDelay();
      return { data: mockDevices };
    }

    try {
      return await withRetry(() => apiClient.get('/devices'));
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get device by ID
  async getDevice(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay();
      const device = mockDevices.find(d => d.id === id);
      if (!device) {
        throw new Error('Device not found');
      }
      return { data: device };
    }

    try {
      return await withRetry(() => apiClient.get(`/devices/${id}`));
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Add new device
  async addDevice(deviceData) {
    if (USE_MOCK_DATA) {
      await simulateDelay();
      const newDevice = {
        ...deviceData,
        id: Date.now().toString(),
        status: 'online',
        isOn: false,
        createdAt: new Date(),
        lastSeen: new Date()
      };
      return { data: newDevice };
    }

    try {
      return await withRetry(() => apiClient.post('/devices', deviceData));
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update device
  async updateDevice(id, updates) {
    if (USE_MOCK_DATA) {
      await simulateDelay();
      return { data: { id, ...updates, updatedAt: new Date() } };
    }

    try {
      return await withRetry(() => apiClient.put(`/devices/${id}`, updates));
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete device
  async deleteDevice(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay();
      return { data: { success: true } };
    }

    try {
      return await withRetry(() => apiClient.delete(`/devices/${id}`));
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Control device (toggle, set properties)
  async controlDevice(id, action, value) {
    if (USE_MOCK_DATA) {
      await simulateDelay();
      return { 
        data: { 
          success: true, 
          deviceId: id, 
          action, 
          value, 
          timestamp: new Date() 
        } 
      };
    }

    try {
      return await withRetry(() => 
        apiClient.post(`/devices/${id}/control`, { action, value })
      );
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Set device timer
  async setTimer(id, timerData) {
    if (USE_MOCK_DATA) {
      await simulateDelay();
      return { 
        data: { 
          success: true, 
          deviceId: id, 
          timer: timerData,
          setAt: new Date()
        } 
      };
    }

    try {
      return await withRetry(() => 
        apiClient.post(`/devices/${id}/timer`, timerData)
      );
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get device status
  async getDeviceStatus(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(200);
      const device = mockDevices.find(d => d.id === id);
      return { 
        data: { 
          status: device?.status || 'offline',
          isOn: device?.isOn || false,
          lastSeen: device?.lastSeen || new Date()
        } 
      };
    }

    try {
      return await withRetry(() => apiClient.get(`/devices/${id}/status`));
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Discover new devices on network
  async discoverDevices() {
    if (USE_MOCK_DATA) {
      await simulateDelay(2000); // Longer delay for discovery
      const discoveredDevices = [
        {
          name: 'New Smart Plug',
          type: 'smart_plug',
          brand: 'TP-Link',
          model: 'Kasa HS100',
          apiEndpoint: 'http://192.168.1.110/api',
          capabilities: ['power', 'energy_monitoring']
        },
        {
          name: 'Smart Door Lock',
          type: 'door_lock',
          brand: 'August',
          model: 'Smart Lock Pro',
          apiEndpoint: 'http://192.168.1.111/api',
          capabilities: ['lock', 'unlock', 'auto_lock']
        }
      ];
      return { data: discoveredDevices };
    }

    try {
      return await withRetry(() => apiClient.post('/devices/discover'), 3, 2000);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
