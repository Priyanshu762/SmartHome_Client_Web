import { create } from 'zustand';

/**
 * Rules store for managing automation rules
 */
export const useRulesStore = create((set, get) => ({
  rules: [],
  loading: false,
  error: null,

  // Actions
  setRules: (rules) => set({ rules }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addRule: (rule) => set((state) => ({
    rules: [...state.rules, { 
      ...rule, 
      id: Date.now().toString(), 
      createdAt: new Date(),
      isActive: true,
      lastTriggered: null
    }]
  })),

  updateRule: (id, updates) => set((state) => ({
    rules: state.rules.map(rule => 
      rule.id === id ? { ...rule, ...updates, updatedAt: new Date() } : rule
    )
  })),

  removeRule: (id) => set((state) => ({
    rules: state.rules.filter(rule => rule.id !== id)
  })),

  toggleRule: (id) => set((state) => ({
    rules: state.rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    )
  })),

  triggerRule: (id) => set((state) => ({
    rules: state.rules.map(rule => 
      rule.id === id ? { ...rule, lastTriggered: new Date() } : rule
    )
  })),

  // Getters
  getActiveRules: () => {
    const { rules } = get();
    return rules.filter(rule => rule.isActive);
  },

  getRulesByDevice: (deviceId) => {
    const { rules } = get();
    return rules.filter(rule => 
      rule.condition?.deviceId === deviceId || 
      rule.action?.deviceId === deviceId
    );
  },
}));
