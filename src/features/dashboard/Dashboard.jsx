import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CpuChipIcon,
  BoltIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Card, StatusBadge, Button } from '../../components/ui/index.jsx';
import { DeviceCard } from '../devices/DeviceCard';
import { useDeviceStore } from '../../store/deviceStore';
import { useGroupStore } from '../../store/groupStore';
import { useModesStore } from '../../store/modesStore';
import { deviceApi } from '../../api/deviceApi';

/**
 * Main Dashboard Component
 */
export const Dashboard = () => {
  const { devices, getOnlineDevices, getActiveDevices } = useDeviceStore();
  const { groups } = useGroupStore();
  const { activeMode, getModeById } = useModesStore();
  
  const [recentDevices, setRecentDevices] = useState([]);
  const [energyStats, setEnergyStats] = useState({
    today: 0,
    thisWeek: 0,
    trend: 0
  });

  useEffect(() => {
    // Load recent devices (last 4 active devices)
    const recent = devices
      .filter(device => device.isOn)
      .sort((a, b) => new Date(b.lastToggled || b.createdAt) - new Date(a.lastToggled || a.createdAt))
      .slice(0, 4);
    setRecentDevices(recent);

    // Calculate energy stats
    const totalEnergyToday = devices
      .filter(device => device.isOn)
      .reduce((sum, device) => sum + (device.energyUsage || 0), 0);
    
    setEnergyStats({
      today: totalEnergyToday / 1000, // Convert to kWh
      thisWeek: (totalEnergyToday * 7) / 1000,
      trend: Math.random() * 20 - 10 // Mock trend percentage
    });
  }, [devices]);

  const onlineDevices = getOnlineDevices();
  const activeDevices = getActiveDevices();
  const currentMode = getModeById(activeMode);

  const stats = [
    {
      name: 'Total Devices',
      value: devices.length,
      subtext: `${onlineDevices.length} online`,
      icon: CpuChipIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Active Devices',
      value: activeDevices.length,
      subtext: `${devices.length - activeDevices.length} inactive`,
      icon: BoltIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      name: 'Energy Today',
      value: `${energyStats.today.toFixed(1)} kWh`,
      subtext: energyStats.trend > 0 ? `+${energyStats.trend.toFixed(1)}%` : `${energyStats.trend.toFixed(1)}%`,
      icon: ArrowTrendingUpIcon,
      color: energyStats.trend > 0 ? 'text-red-600' : 'text-green-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      name: 'Groups',
      value: groups.length,
      subtext: `${groups.filter(g => g.deviceIds.length > 0).length} active`,
      icon: ClockIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const handleDeviceControl = async (deviceId, action, value) => {
    try {
      await deviceApi.controlDevice(deviceId, action, value);
    } catch (error) {
      console.error('Failed to control device:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your smart home.
          </p>
        </div>
        
        {/* Current Mode Display */}
        {currentMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg"
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              {currentMode.name} Mode
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card hover className="p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <p className={`text-sm ${stat.color}`}>
                    {stat.subtext}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Devices */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recently Active Devices
              </h2>
              <Link to="/devices">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {recentDevices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentDevices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onControl={handleDeviceControl}
                    className="h-auto"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CpuChipIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recently active devices</p>
                <Link to="/devices">
                  <Button variant="primary" size="sm" className="mt-4">
                    Manage Devices
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/devices/add">
                <Button variant="primary" className="w-full justify-start">
                  <CpuChipIcon className="h-5 w-5 mr-3" />
                  Add Device
                </Button>
              </Link>
              <Link to="/groups">
                <Button variant="secondary" className="w-full justify-start">
                  <BoltIcon className="h-5 w-5 mr-3" />
                  Manage Groups
                </Button>
              </Link>
              <Link to="/rules">
                <Button variant="secondary" className="w-full justify-start">
                  <ClockIcon className="h-5 w-5 mr-3" />
                  Create Rule
                </Button>
              </Link>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Network
                </span>
                <StatusBadge status="online">
                  Connected
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Hub Status
                </span>
                <StatusBadge status="online">
                  Operational
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Auto Updates
                </span>
                <StatusBadge status="loading">
                  Enabled
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Offline Devices
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {devices.filter(d => d.status === 'offline').length}
                </span>
              </div>
            </div>
          </Card>

          {/* Energy Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Energy Summary
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Today
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {energyStats.today.toFixed(1)} kWh
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((energyStats.today / 10) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    This Week
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {energyStats.thisWeek.toFixed(1)} kWh
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((energyStats.thisWeek / 50) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <Link to="/analytics">
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View Detailed Analytics
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
