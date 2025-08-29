// Mock data for development
export const mockDevices = [
  {
    id: '1',
    name: 'Living Room AC',
    type: 'air_conditioner',
    brand: 'Samsung',
    model: 'WindFree AR24',
    status: 'online',
    isOn: false,
    groupId: 'living-room',
    capabilities: ['power', 'temperature', 'mode', 'timer'],
    currentSettings: {
      temperature: 24,
      mode: 'cool',
      fanSpeed: 'auto'
    },
    energyUsage: 1200, // watts
    location: { x: 10, y: 20 },
    lastSeen: new Date(),
    createdAt: new Date('2024-01-15'),
    apiEndpoint: 'http://192.168.1.100/api',
    icon: '❄️'
  },
  {
    id: '2',
    name: 'Bedroom Light',
    type: 'smart_light',
    brand: 'Philips',
    model: 'Hue White',
    status: 'online',
    isOn: true,
    groupId: 'bedroom',
    capabilities: ['power', 'brightness', 'color'],
    currentSettings: {
      brightness: 75,
      color: '#ffffff'
    },
    energyUsage: 9,
    location: { x: 30, y: 15 },
    lastSeen: new Date(),
    createdAt: new Date('2024-01-10'),
    apiEndpoint: 'http://192.168.1.101/api',
    icon: '💡'
  },
  {
    id: '3',
    name: 'Kitchen Fan',
    type: 'ceiling_fan',
    brand: 'Hunter',
    model: 'Smart Fan Pro',
    status: 'online',
    isOn: false,
    groupId: 'kitchen',
    capabilities: ['power', 'speed', 'direction'],
    currentSettings: {
      speed: 2,
      direction: 'forward'
    },
    energyUsage: 45,
    location: { x: 50, y: 40 },
    lastSeen: new Date(),
    createdAt: new Date('2024-01-20'),
    apiEndpoint: 'http://192.168.1.102/api',
    icon: '🌀'
  },
  {
    id: '4',
    name: 'Garden Sprinkler',
    type: 'sprinkler',
    brand: 'Rain Bird',
    model: 'Smart Sprinkler ST8',
    status: 'offline',
    isOn: false,
    groupId: 'garden',
    capabilities: ['power', 'timer', 'zones'],
    currentSettings: {
      activeZones: [],
      duration: 15
    },
    energyUsage: 0,
    location: { x: 80, y: 60 },
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    createdAt: new Date('2024-02-01'),
    apiEndpoint: 'http://192.168.1.103/api',
    icon: '💧'
  },
  {
    id: '5',
    name: 'Security Camera',
    type: 'security_camera',
    brand: 'Arlo',
    model: 'Pro 4',
    status: 'online',
    isOn: true,
    groupId: 'security',
    capabilities: ['power', 'recording', 'motion_detection'],
    currentSettings: {
      recording: true,
      motionSensitivity: 'medium',
      nightVision: true
    },
    energyUsage: 12,
    location: { x: 90, y: 10 },
    lastSeen: new Date(),
    createdAt: new Date('2024-01-25'),
    apiEndpoint: 'http://192.168.1.104/api',
    icon: '📹'
  },
  {
    id: '6',
    name: 'Smart Thermostat',
    type: 'thermostat',
    brand: 'Nest',
    model: 'Learning Thermostat',
    status: 'online',
    isOn: true,
    groupId: 'living-room',
    capabilities: ['power', 'temperature', 'schedule', 'eco_mode'],
    currentSettings: {
      targetTemp: 22,
      currentTemp: 21,
      mode: 'heat',
      schedule: 'home'
    },
    energyUsage: 3,
    location: { x: 25, y: 25 },
    lastSeen: new Date(),
    createdAt: new Date('2024-01-12'),
    apiEndpoint: 'http://192.168.1.105/api',
    icon: '🌡️'
  }
];

export const mockGroups = [
  {
    id: 'living-room',
    name: 'Living Room',
    description: 'Main living area devices',
    deviceIds: ['1', '6'],
    color: '#3b82f6',
    icon: '🛋️',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Master bedroom devices',
    deviceIds: ['2'],
    color: '#8b5cf6',
    icon: '🛏️',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Kitchen and dining area',
    deviceIds: ['3'],
    color: '#f59e0b',
    icon: '👨‍🍳',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'garden',
    name: 'Garden',
    description: 'Outdoor garden devices',
    deviceIds: ['4'],
    color: '#10b981',
    icon: '🌱',
    createdAt: new Date('2024-02-01')
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Security and monitoring devices',
    deviceIds: ['5'],
    color: '#ef4444',
    icon: '🔒',
    createdAt: new Date('2024-01-25')
  }
];

export const mockRules = [
  {
    id: '1',
    name: 'AC Auto Off',
    description: 'Turn off AC after 2 hours of continuous operation',
    isActive: true,
    condition: {
      type: 'time_based',
      deviceId: '1',
      property: 'isOn',
      value: true,
      duration: 120, // minutes
      operator: 'equals'
    },
    action: {
      type: 'device_control',
      deviceId: '1',
      property: 'isOn',
      value: false
    },
    triggerCount: 5,
    lastTriggered: new Date(Date.now() - 86400000), // 1 day ago
    createdAt: new Date('2024-01-16')
  },
  {
    id: '2',
    name: 'Bedroom Night Mode',
    description: 'Dim bedroom light when it\'s past 10 PM',
    isActive: true,
    condition: {
      type: 'time_based',
      time: '22:00',
      operator: 'after'
    },
    action: {
      type: 'device_control',
      deviceId: '2',
      property: 'brightness',
      value: 20
    },
    triggerCount: 12,
    lastTriggered: new Date(Date.now() - 3600000), // 1 hour ago
    createdAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Kitchen Fan Auto',
    description: 'Turn on kitchen fan when temperature exceeds 26°C',
    isActive: false,
    condition: {
      type: 'sensor_based',
      deviceId: '6', // thermostat
      property: 'currentTemp',
      value: 26,
      operator: 'greater_than'
    },
    action: {
      type: 'device_control',
      deviceId: '3',
      property: 'isOn',
      value: true
    },
    triggerCount: 3,
    lastTriggered: new Date(Date.now() - 172800000), // 2 days ago
    createdAt: new Date('2024-01-22')
  }
];

export const mockAnalytics = {
  energyUsage: {
    today: 45.2, // kWh
    yesterday: 52.1,
    thisWeek: 315.6,
    lastWeek: 342.8,
    thisMonth: 1205.4,
    lastMonth: 1156.7
  },
  deviceActivity: {
    totalDevices: 6,
    onlineDevices: 5,
    activeDevices: 3,
    recentlyUsed: ['1', '2', '6']
  },
  topEnergyConsumers: [
    { deviceId: '1', consumption: 28.8, percentage: 64 },
    { deviceId: '3', consumption: 8.1, percentage: 18 },
    { deviceId: '2', consumption: 4.3, percentage: 10 },
    { deviceId: '5', consumption: 2.9, percentage: 6 },
    { deviceId: '6', consumption: 1.1, percentage: 2 }
  ],
  usageByHour: [
    { hour: 0, usage: 0.8 }, { hour: 1, usage: 0.6 }, { hour: 2, usage: 0.5 },
    { hour: 3, usage: 0.4 }, { hour: 4, usage: 0.5 }, { hour: 5, usage: 0.7 },
    { hour: 6, usage: 1.2 }, { hour: 7, usage: 2.1 }, { hour: 8, usage: 3.4 },
    { hour: 9, usage: 2.8 }, { hour: 10, usage: 2.2 }, { hour: 11, usage: 2.5 },
    { hour: 12, usage: 3.1 }, { hour: 13, usage: 2.9 }, { hour: 14, usage: 2.6 },
    { hour: 15, usage: 2.8 }, { hour: 16, usage: 3.2 }, { hour: 17, usage: 3.8 },
    { hour: 18, usage: 4.2 }, { hour: 19, usage: 4.8 }, { hour: 20, usage: 4.1 },
    { hour: 21, usage: 3.5 }, { hour: 22, usage: 2.8 }, { hour: 23, usage: 1.9 }
  ]
};
