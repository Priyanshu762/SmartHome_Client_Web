import { create } from 'zustand';

/**
 * Group store for managing device groups
 */
export const useGroupStore = create((set, get) => ({
  groups: [],
  loading: false,
  error: null,

  // Actions
  setGroups: (groups) => set({ groups }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addGroup: (group) => set((state) => ({
    groups: [...state.groups, { 
      ...group, 
      id: Date.now().toString(), 
      createdAt: new Date(),
      deviceIds: []
    }]
  })),

  updateGroup: (id, updates) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === id ? { ...group, ...updates, updatedAt: new Date() } : group
    )
  })),

  removeGroup: (id) => set((state) => ({
    groups: state.groups.filter(group => group.id !== id)
  })),

  addDeviceToGroup: (groupId, deviceId) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === groupId 
        ? { ...group, deviceIds: [...new Set([...group.deviceIds, deviceId])] }
        : group
    )
  })),

  removeDeviceFromGroup: (groupId, deviceId) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === groupId 
        ? { ...group, deviceIds: group.deviceIds.filter(id => id !== deviceId) }
        : group
    )
  })),

  // Getters
  getGroupById: (id) => {
    const { groups } = get();
    return groups.find(group => group.id === id);
  },

  getGroupsWithDevices: () => {
    const { groups } = get();
    return groups.filter(group => group.deviceIds.length > 0);
  },
}));
