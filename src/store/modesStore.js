import { create } from 'zustand';

/**
 * Modes store for managing device modes (Power Saving, Performance, etc.)
 */
export const useModesStore = create((set, get) => ({
  modes: [
    {
      id: 'power-saving',
      name: 'Power Saving',
      description: 'Optimized for energy efficiency',
      settings: {
        brightness: 30,
        temperature: 22,
        autoOff: true,
        autoOffDelay: 30 // minutes
      },
      isActive: false,
      isDefault: false
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'Maximum performance settings',
      settings: {
        brightness: 100,
        temperature: 20,
        autoOff: false,
        autoOffDelay: 0
      },
      isActive: false,
      isDefault: false
    },
    {
      id: 'comfort',
      name: 'Comfort',
      description: 'Balanced comfort settings',
      settings: {
        brightness: 75,
        temperature: 24,
        autoOff: true,
        autoOffDelay: 60
      },
      isActive: true,
      isDefault: true
    }
  ],
  activeMode: 'comfort',
  loading: false,
  error: null,

  // Actions
  setModes: (modes) => set({ modes }),
  setActiveMode: (modeId) => set((state) => ({
    activeMode: modeId,
    modes: state.modes.map(mode => ({
      ...mode,
      isActive: mode.id === modeId
    }))
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addMode: (mode) => set((state) => ({
    modes: [...state.modes, { 
      ...mode, 
      id: Date.now().toString(), 
      createdAt: new Date(),
      isActive: false,
      isDefault: false
    }]
  })),

  updateMode: (id, updates) => set((state) => ({
    modes: state.modes.map(mode => 
      mode.id === id ? { ...mode, ...updates, updatedAt: new Date() } : mode
    )
  })),

  removeMode: (id) => set((state) => {
    const modeToRemove = state.modes.find(mode => mode.id === id);
    if (modeToRemove?.isDefault) {
      return state; // Can't remove default mode
    }
    
    return {
      modes: state.modes.filter(mode => mode.id !== id),
      activeMode: state.activeMode === id ? 'comfort' : state.activeMode
    };
  }),

  // Getters
  getActiveModeSettings: () => {
    const { modes, activeMode } = get();
    const mode = modes.find(mode => mode.id === activeMode);
    return mode?.settings || {};
  },

  getModeById: (id) => {
    const { modes } = get();
    return modes.find(mode => mode.id === id);
  },
}));
