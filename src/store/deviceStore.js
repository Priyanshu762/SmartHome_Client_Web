import { create } from 'zustand';

/**
 * Device store for managing smart home devices
 */
export const useDeviceStore = create((set, get) => ({
  devices: [],
  loading: false,
  error: null,

  // Actions
  setDevices: (devices) => set({ devices }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addDevice: (device) => set((state) => ({
    devices: [...state.devices, { ...device, id: Date.now().toString(), createdAt: new Date() }]
  })),

  updateDevice: (id, updates) => set((state) => ({
    devices: state.devices.map(device => 
      device.id === id ? { ...device, ...updates, updatedAt: new Date() } : device
    )
  })),

  removeDevice: (id) => set((state) => ({
    devices: state.devices.filter(device => device.id !== id)
  })),

  toggleDevice: (id) => set((state) => ({
    devices: state.devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn, lastToggled: new Date() } : device
    )
  })),

  setDeviceTimer: (id, timer) => set((state) => ({
    devices: state.devices.map(device => 
      device.id === id ? { ...device, timer } : device
    )
  })),

  // Getters
  getDevicesByGroup: (groupId) => {
    const { devices } = get();
    return devices.filter(device => device.groupId === groupId);
  },

  getOnlineDevices: () => {
    const { devices } = get();
    return devices.filter(device => device.status === 'online');
  },

  getActiveDevices: () => {
    const { devices } = get();
    return devices.filter(device => device.isOn);
  },
}));
