import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  CpuChipIcon,
  RectangleGroupIcon,
  BoltIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

/**
 * Sidebar Navigation Component
 */
export const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: HomeIcon,
      description: 'Overview and quick controls'
    },
    {
      name: 'Devices',
      href: '/devices',
      icon: CpuChipIcon,
      description: 'Manage your smart devices'
    },
    {
      name: 'Groups',
      href: '/groups',
      icon: RectangleGroupIcon,
      description: 'Organize devices by room'
    },
    {
      name: 'Rules',
      href: '/rules',
      icon: BoltIcon,
      description: 'Automation and smart rules'
    },
    {
      name: 'Modes',
      href: '/modes',
      icon: AdjustmentsHorizontalIcon,
      description: 'Power and performance modes'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: ChartBarIcon,
      description: 'Energy usage and insights'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      description: 'System and app preferences'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
      description: 'Account and profile management'
    }
  ];

  const SidebarItem = ({ item, isCollapsed }) => {
    return (
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
            isActive
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
          }`
        }
      >
        <item.icon className={`flex-shrink-0 h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="truncate"
          >
            {item.name}
          </motion.span>
        )}
        {isCollapsed && (
          <div className="absolute left-16 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {item.name}
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Navigation
            </motion.h2>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <SidebarItem key={item.href} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors ${
            isCollapsed ? 'px-2' : ''
          }`}
        >
          <PlusIcon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-2'}`} />
          {!isCollapsed && 'Add Device'}
        </motion.button>

        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center"
          >
            <p>Smart Home Control</p>
            <p className="font-semibold">v2.1.0</p>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};
