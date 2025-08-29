import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  CameraIcon,
  PencilIcon,
  ShieldCheckIcon,
  KeyIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  BellIcon,
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  ChartBarIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Input, Badge } from '../../components/ui/index.jsx';

/**
 * Enterprise-Grade Profile Management Component
 */
export const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Basic Profile
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    bio: 'Smart home enthusiast and technology professional',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    
    // Security
    twoFactorEnabled: true,
    lastPasswordChange: '2024-01-15',
    activeDevices: 3,
    
    // Preferences
    theme: 'dark',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    
    // Subscription
    plan: 'Pro',
    billingCycle: 'annual',
    nextBilling: '2024-12-15',
    
    // Activity
    lastLogin: '2024-08-29T10:30:00Z',
    accountCreated: '2023-03-15T00:00:00Z',
    totalDevices: 24,
    totalAutomations: 12
  });

  const profileTabs = [
    {
      id: 'profile',
      name: 'Profile',
      icon: UserIcon,
      description: 'Personal information and preferences'
    },
    {
      id: 'security',
      name: 'Security',
      icon: ShieldCheckIcon,
      description: 'Password, 2FA, and security settings'
    },
    {
      id: 'devices',
      name: 'Devices',
      icon: DevicePhoneMobileIcon,
      description: 'Connected devices and sessions'
    },
    {
      id: 'billing',
      name: 'Billing',
      icon: CreditCardIcon,
      description: 'Subscription and payment information'
    },
    {
      id: 'activity',
      name: 'Activity',
      icon: ChartBarIcon,
      description: 'Account activity and usage analytics'
    },
    {
      id: 'privacy',
      name: 'Privacy',
      icon: GlobeAltIcon,
      description: 'Data privacy and account management'
    }
  ];

  const updateProfile = (key, value) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfile('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfileHeader = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
    >
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
            {profileData.avatar ? (
              <img 
                src={profileData.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="h-12 w-12 text-white/80" />
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full p-2 cursor-pointer transition-colors">
              <CameraIcon className="h-4 w-4 text-white" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarUpload}
                className="hidden" 
              />
            </label>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <Badge variant="success">
              {profileData.plan}
            </Badge>
            {profileData.twoFactorEnabled && (
              <Badge variant="primary">
                <ShieldCheckIcon className="h-3 w-3 mr-1" />
                2FA
              </Badge>
            )}
          </div>
          <p className="text-white/80 mb-1">{profileData.email}</p>
          <p className="text-white/60 text-sm">{profileData.bio}</p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-white/80">
            <div className="flex items-center space-x-1">
              <MapPinIcon className="h-4 w-4" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>Member since {new Date(profileData.accountCreated).getFullYear()}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={isEditing ? "success" : "secondary"}
          onClick={() => setIsEditing(!isEditing)}
          className="text-white border-white hover:bg-white/10"
        >
          {isEditing ? (
            <>
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <Input
                  value={profileData.firstName}
                  onChange={(e) => updateProfile('firstName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <Input
                  value={profileData.lastName}
                  onChange={(e) => updateProfile('lastName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => updateProfile('email', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={profileData.phone}
                onChange={(e) => updateProfile('phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => updateProfile('bio', e.target.value)}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <Input
                  value={profileData.location}
                  onChange={(e) => updateProfile('location', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={profileData.timezone}
                  onChange={(e) => updateProfile('timezone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
                >
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {profileData.totalDevices}
                </div>
                <div className="text-sm text-blue-500 dark:text-blue-300">Connected Devices</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {profileData.totalAutomations}
                </div>
                <div className="text-sm text-green-500 dark:text-green-300">Automations</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  98%
                </div>
                <div className="text-sm text-purple-500 dark:text-purple-300">Uptime</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  247
                </div>
                <div className="text-sm text-orange-500 dark:text-orange-300">Days Active</div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Password Section */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Password</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Last changed</p>
                    <p className="text-xs text-gray-500">{new Date(profileData.lastPasswordChange).toLocaleDateString()}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Change Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                <Badge variant={profileData.twoFactorEnabled ? "success" : "warning"}>
                  {profileData.twoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Add an extra layer of security to your account with two-factor authentication.
              </p>
              <div className="flex space-x-3">
                <Button variant={profileData.twoFactorEnabled ? "danger" : "primary"} size="sm">
                  {profileData.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </Button>
                {profileData.twoFactorEnabled && (
                  <Button variant="secondary" size="sm">
                    View Backup Codes
                  </Button>
                )}
              </div>
            </div>

            {/* Active Sessions */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'San Francisco, CA', current: true, lastActive: '2 minutes ago' },
                  { device: 'iPhone App', location: 'San Francisco, CA', current: false, lastActive: '1 hour ago' },
                  { device: 'Safari on macOS', location: 'San Francisco, CA', current: false, lastActive: '3 hours ago' }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
                        {session.current && (
                          <Badge variant="success" size="sm">Current</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
                    </div>
                    {!session.current && (
                      <Button variant="danger" size="sm">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="danger" size="sm">
                  Sign out all other sessions
                </Button>
              </div>
            </div>

            {/* Security Log */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Recent Security Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Successful login', time: '2 hours ago', ip: '192.168.1.100' },
                  { action: 'Password changed', time: '1 week ago', ip: '192.168.1.100' },
                  { action: '2FA enabled', time: '2 weeks ago', ip: '192.168.1.100' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-gray-500">{activity.time} from {activity.ip}</p>
                    </div>
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'devices':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">Connected Devices</h3>
              <Button variant="primary" size="sm">
                Add Device
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Living Room Hub', type: 'Smart Hub', status: 'online', lastSeen: 'Now' },
                { name: 'Kitchen Display', type: 'Smart Display', status: 'online', lastSeen: '2 min ago' },
                { name: 'Bedroom Speaker', type: 'Smart Speaker', status: 'offline', lastSeen: '1 hour ago' },
                { name: 'Garden Sensors', type: 'Environmental', status: 'online', lastSeen: '5 min ago' },
                { name: 'Security Camera', type: 'Camera', status: 'online', lastSeen: 'Now' },
                { name: 'Smart Thermostat', type: 'Climate', status: 'online', lastSeen: '1 min ago' }
              ].map((device, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <Button variant="ghost" size="sm">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{device.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{device.type}</p>
                  <p className="text-xs text-gray-400">Last seen: {device.lastSeen}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Current Plan</h3>
                <Badge variant="primary">{profileData.plan}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Billing Cycle</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">{profileData.billingCycle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Billing</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(profileData.nextBilling).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium text-gray-900 dark:text-white">$99/year</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="primary" size="sm">
                  Upgrade Plan
                </Button>
                <Button variant="secondary" size="sm">
                  Change Billing
                </Button>
                <Button variant="danger" size="sm">
                  Cancel Subscription
                </Button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Payment Method</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <CreditCardIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/25</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Update Payment Method
              </Button>
            </div>

            {/* Billing History */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Billing History</h3>
              <div className="space-y-3">
                {[
                  { date: '2024-08-15', amount: '$99.00', status: 'Paid', invoice: 'INV-2024-008' },
                  { date: '2023-08-15', amount: '$99.00', status: 'Paid', invoice: 'INV-2023-008' },
                  { date: '2023-03-15', amount: '$0.00', status: 'Trial', invoice: 'INV-2023-003' }
                ].map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <p className="font-medium text-gray-900 dark:text-white">{bill.date}</p>
                        <p className="text-gray-700 dark:text-gray-300">{bill.amount}</p>
                        <Badge variant={bill.status === 'Paid' ? 'success' : 'secondary'}>
                          {bill.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{bill.invoice}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-6">
            {/* Activity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</div>
                <div className="text-sm text-blue-500 dark:text-blue-300">Total Actions</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">156</div>
                <div className="text-sm text-green-500 dark:text-green-300">This Week</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">23</div>
                <div className="text-sm text-purple-500 dark:text-purple-300">Today</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">98%</div>
                <div className="text-sm text-orange-500 dark:text-orange-300">Success Rate</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Turned on Living Room Lights', time: '2 minutes ago', type: 'device' },
                  { action: 'Security automation triggered', time: '15 minutes ago', type: 'automation' },
                  { action: 'Added new device: Kitchen Speaker', time: '1 hour ago', type: 'device' },
                  { action: 'Updated temperature settings', time: '3 hours ago', type: 'device' },
                  { action: 'Created new automation rule', time: '1 day ago', type: 'automation' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'device' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-green-100 dark:bg-green-900/20'
                    }`}>
                      {activity.type === 'device' ? (
                        <DevicePhoneMobileIcon className={`h-4 w-4 ${
                          activity.type === 'device' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
                        }`} />
                      ) : (
                        <ChartBarIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            {/* Data Export */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Export Your Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Download a copy of all your data stored in our system.
              </p>
              <Button variant="primary" size="sm">
                Request Data Export
              </Button>
            </div>

            {/* Account Deletion */}
            <div className="border border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
              <div className="flex items-center space-x-2 mb-4">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                <h3 className="font-medium text-red-900 dark:text-red-300">Delete Account</h3>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="danger" size="sm">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>

            {/* Privacy Settings */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Privacy Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Analytics Data</p>
                    <p className="text-sm text-gray-500">Help improve our service by sharing usage analytics</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Marketing Communications</p>
                    <p className="text-sm text-gray-500">Receive updates about new features and offers</p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Third-party Integrations</p>
                    <p className="text-sm text-gray-500">Allow data sharing with connected services</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="p-4">
            <nav className="space-y-2">
              {profileTabs.map((tab) => (
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

        {/* Profile Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {profileTabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {profileTabs.find(tab => tab.id === activeTab)?.description}
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
