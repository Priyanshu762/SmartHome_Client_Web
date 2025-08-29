import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cog6ToothIcon,
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  EyeIcon,
  WifiIcon,
  BoltIcon,
  ChartBarIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  KeyIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Toggle, Input } from '../../components/ui/index.jsx';
import { useThemeStore } from '../../store/themeStore';

/**
 * Enterprise-Grade Settings Component
 */
export const Settings = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    theme: isDark ? 'dark' : 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    apiEncryption: true,
    deviceEncryption: true,
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    criticalAlerts: true,
    
    // Privacy Settings
    dataCollection: true,
    analytics: true,
    crashReporting: true,
    locationTracking: false,
    
    // Device Settings
    autoDiscovery: true,
    devicePolling: 30,
    offlineTimeout: 300,
    energyMonitoring: true,
    
    // Performance Settings
    cacheEnabled: true,
    realtimeUpdates: true,
    backgroundSync: true,
    lowPowerMode: false,
    
    // Integration Settings
    cloudSync: true,
    voiceControl: false,
    geofencing: false,
    aiOptimization: false
  });

  const settingsTabs = [
    {
      id: 'general',
      name: 'General',
      icon: Cog6ToothIcon,
      description: 'Basic app preferences and interface settings'
    },
    {
      id: 'security',
      name: 'Security',
      icon: ShieldCheckIcon,
      description: 'Authentication and security configurations'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: BellIcon,
      description: 'Alert and notification preferences'
    },
    {
      id: 'privacy',
      name: 'Privacy',
      icon: EyeIcon,
      description: 'Data privacy and collection settings'
    },
    {
      id: 'devices',
      name: 'Devices',
      icon: WifiIcon,
      description: 'Device management and discovery settings'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: BoltIcon,
      description: 'App performance and optimization'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: GlobeAltIcon,
      description: 'Third-party services and APIs'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: ChartBarIcon,
      description: 'Advanced configuration options'
    }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Handle special cases
    if (key === 'theme') {
      if ((value === 'dark' && !isDark) || (value === 'light' && isDark)) {
        toggleTheme();
      }
    }
  };

  const SettingItem = ({ title, description, children, warning = false }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${
      warning 
        ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
    }`}>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          {warning && <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />}
        </div>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <SettingItem 
              title="Theme" 
              description="Choose your preferred interface theme"
            >
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </SettingItem>

            <SettingItem 
              title="Language" 
              description="Select your preferred language"
            >
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
              </select>
            </SettingItem>

            <SettingItem 
              title="Timezone" 
              description="Set your local timezone"
            >
              <select
                value={settings.timezone}
                onChange={(e) => updateSetting('timezone', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </SettingItem>

            <SettingItem 
              title="Date Format" 
              description="Choose how dates are displayed"
            >
              <select
                value={settings.dateFormat}
                onChange={(e) => updateSetting('dateFormat', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </SettingItem>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <SettingItem 
              title="Two-Factor Authentication" 
              description="Add an extra layer of security to your account"
            >
              <Toggle
                checked={settings.twoFactorAuth}
                onChange={(checked) => updateSetting('twoFactorAuth', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Session Timeout" 
              description="Automatically log out after inactivity (minutes)"
            >
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                className="w-20"
                min="5"
                max="480"
              />
            </SettingItem>

            <SettingItem 
              title="API Encryption" 
              description="Encrypt all API communications"
            >
              <Toggle
                checked={settings.apiEncryption}
                onChange={(checked) => updateSetting('apiEncryption', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Device Encryption" 
              description="Encrypt device communication data"
            >
              <Toggle
                checked={settings.deviceEncryption}
                onChange={(checked) => updateSetting('deviceEncryption', checked)}
              />
            </SettingItem>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Security Status</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Last Login:</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Failed Attempts:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Active Sessions:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Security Score:</span>
                  <span className="font-medium text-green-600">98/100</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <SettingItem 
              title="Push Notifications" 
              description="Receive push notifications on this device"
            >
              <Toggle
                checked={settings.pushNotifications}
                onChange={(checked) => updateSetting('pushNotifications', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Email Notifications" 
              description="Receive notifications via email"
            >
              <Toggle
                checked={settings.emailNotifications}
                onChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="SMS Notifications" 
              description="Receive critical alerts via SMS"
            >
              <Toggle
                checked={settings.smsNotifications}
                onChange={(checked) => updateSetting('smsNotifications', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Critical Alerts" 
              description="Always receive security and system alerts"
              warning={!settings.criticalAlerts}
            >
              <Toggle
                checked={settings.criticalAlerts}
                onChange={(checked) => updateSetting('criticalAlerts', checked)}
              />
            </SettingItem>

            <div className="mt-8">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Notification Categories</h4>
              <div className="space-y-3">
                {[
                  { name: 'Device Status Changes', enabled: true },
                  { name: 'Energy Alerts', enabled: true },
                  { name: 'Security Events', enabled: true },
                  { name: 'System Updates', enabled: false },
                  { name: 'Marketing Communications', enabled: false },
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                    <Toggle checked={category.enabled} onChange={() => {}} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <SettingItem 
              title="Data Collection" 
              description="Allow collection of usage data to improve the service"
            >
              <Toggle
                checked={settings.dataCollection}
                onChange={(checked) => updateSetting('dataCollection', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Analytics" 
              description="Share anonymous analytics data"
            >
              <Toggle
                checked={settings.analytics}
                onChange={(checked) => updateSetting('analytics', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Crash Reporting" 
              description="Automatically send crash reports"
            >
              <Toggle
                checked={settings.crashReporting}
                onChange={(checked) => updateSetting('crashReporting', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Location Tracking" 
              description="Use device location for geofencing features"
            >
              <Toggle
                checked={settings.locationTracking}
                onChange={(checked) => updateSetting('locationTracking', checked)}
              />
            </SettingItem>

            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Privacy Compliance</h4>
              <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>CCPA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Data Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'devices':
        return (
          <div className="space-y-6">
            <SettingItem 
              title="Auto Discovery" 
              description="Automatically discover new devices on the network"
            >
              <Toggle
                checked={settings.autoDiscovery}
                onChange={(checked) => updateSetting('autoDiscovery', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Device Polling Interval" 
              description="How often to check device status (seconds)"
            >
              <Input
                type="number"
                value={settings.devicePolling}
                onChange={(e) => updateSetting('devicePolling', parseInt(e.target.value))}
                className="w-20"
                min="5"
                max="300"
              />
            </SettingItem>

            <SettingItem 
              title="Offline Timeout" 
              description="Mark devices offline after this many seconds"
            >
              <Input
                type="number"
                value={settings.offlineTimeout}
                onChange={(e) => updateSetting('offlineTimeout', parseInt(e.target.value))}
                className="w-24"
                min="60"
                max="3600"
              />
            </SettingItem>

            <SettingItem 
              title="Energy Monitoring" 
              description="Track energy consumption for compatible devices"
            >
              <Toggle
                checked={settings.energyMonitoring}
                onChange={(checked) => updateSetting('energyMonitoring', checked)}
              />
            </SettingItem>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <SettingItem 
              title="Cache Enabled" 
              description="Cache data for faster loading times"
            >
              <Toggle
                checked={settings.cacheEnabled}
                onChange={(checked) => updateSetting('cacheEnabled', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Real-time Updates" 
              description="Receive live updates via WebSocket"
            >
              <Toggle
                checked={settings.realtimeUpdates}
                onChange={(checked) => updateSetting('realtimeUpdates', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Background Sync" 
              description="Sync data in the background"
            >
              <Toggle
                checked={settings.backgroundSync}
                onChange={(checked) => updateSetting('backgroundSync', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Low Power Mode" 
              description="Reduce background activity to save battery"
            >
              <Toggle
                checked={settings.lowPowerMode}
                onChange={(checked) => updateSetting('lowPowerMode', checked)}
              />
            </SettingItem>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <SettingItem 
              title="Cloud Sync" 
              description="Synchronize data with cloud storage"
            >
              <Toggle
                checked={settings.cloudSync}
                onChange={(checked) => updateSetting('cloudSync', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Voice Control" 
              description="Enable voice commands and control"
            >
              <Toggle
                checked={settings.voiceControl}
                onChange={(checked) => updateSetting('voiceControl', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="Geofencing" 
              description="Trigger automations based on location"
            >
              <Toggle
                checked={settings.geofencing}
                onChange={(checked) => updateSetting('geofencing', checked)}
              />
            </SettingItem>

            <SettingItem 
              title="AI Optimization" 
              description="Use AI to optimize device usage patterns"
            >
              <Toggle
                checked={settings.aiOptimization}
                onChange={(checked) => updateSetting('aiOptimization', checked)}
              />
            </SettingItem>

            <div className="mt-8">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Connected Services</h4>
              <div className="space-y-3">
                {[
                  { name: 'Google Assistant', status: 'Connected', color: 'green' },
                  { name: 'Amazon Alexa', status: 'Disconnected', color: 'gray' },
                  { name: 'Apple HomeKit', status: 'Connected', color: 'green' },
                  { name: 'Samsung SmartThings', status: 'Pending', color: 'yellow' },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{service.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        service.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                        service.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {service.status}
                      </span>
                      <Button size="sm" variant="ghost">Configure</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-2 mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900 dark:text-yellow-300">Advanced Settings</h4>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                These settings are for advanced users only. Changing these may affect system stability.
              </p>
            </div>

            <SettingItem 
              title="Debug Mode" 
              description="Enable detailed logging and debugging features"
            >
              <Toggle
                checked={false}
                onChange={() => {}}
              />
            </SettingItem>

            <SettingItem 
              title="Developer API Access" 
              description="Enable access to developer APIs"
            >
              <Toggle
                checked={false}
                onChange={() => {}}
              />
            </SettingItem>

            <SettingItem 
              title="Beta Features" 
              description="Access experimental features before public release"
            >
              <Toggle
                checked={false}
                onChange={() => {}}
              />
            </SettingItem>

            <div className="mt-8 space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">System Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">App Version:</span>
                    <span className="font-medium">2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Build:</span>
                    <span className="font-medium">20240829.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Environment:</span>
                    <span className="font-medium">Development</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">API Version:</span>
                    <span className="font-medium">v2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cache Size:</span>
                    <span className="font-medium">2.4 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Uptime:</span>
                    <span className="font-medium">2h 34m</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <Button variant="danger" size="sm">
                Clear Cache
              </Button>
              <Button variant="warning" size="sm">
                Reset Settings
              </Button>
              <Button variant="secondary" size="sm">
                Export Logs
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure your smart home platform preferences and security settings
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="secondary" size="sm">
            Export Settings
          </Button>
          <Button variant="primary" size="sm">
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="p-4">
            <nav className="space-y-2">
              {settingsTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{tab.name}</div>
                    <div className="text-xs opacity-75 truncate">{tab.description}</div>
                  </div>
                </motion.button>
              ))}
            </nav>
          </Card>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {settingsTabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {settingsTabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
