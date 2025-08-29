import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './features/dashboard/Dashboard';
import { DeviceList } from './features/devices/DeviceList';
import { Groups } from './features/groups/Groups';
import { Settings } from './features/settings/Settings';
import { Profile } from './features/profile/Profile';
import { useDeviceStore } from './store/deviceStore';
import { useGroupStore } from './store/groupStore';
import { useThemeStore } from './store/themeStore';
import { deviceApi } from './api/deviceApi';
import { mockGroups } from './api/mockData';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

/**
 * Main App Component
 */
const App = () => {
  const { setDevices, setLoading, setError } = useDeviceStore();
  const { setGroups } = useGroupStore();
  const { isDark } = useThemeStore();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Load devices
        const devicesResponse = await deviceApi.getDevices();
        setDevices(devicesResponse.data);
        
        // Load groups (mock data for now)
        setGroups(mockGroups);
        
      } catch (error) {
        console.error('Failed to load initial data:', error);
        setError(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [setDevices, setGroups, setLoading, setError]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDark ? 'dark' : ''}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="devices" element={<DeviceList />} />
              <Route path="groups" element={<Groups />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="rules" element={<div className="p-8 text-center text-gray-500">Rules page coming soon...</div>} />
              <Route path="modes" element={<div className="p-8 text-center text-gray-500">Modes page coming soon...</div>} />
              <Route path="analytics" element={<div className="p-8 text-center text-gray-500">Analytics page coming soon...</div>} />
              <Route path="*" element={<div className="p-8 text-center text-gray-500">Page not found</div>} />
            </Route>
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App;