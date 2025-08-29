# 🏠 Smart Home - Smart Home Control Platform

A modern, scalable React application for controlling and managing smart home devices with a beautiful UI and powerful automation features.

## 🚀 Features

### Core Functionality
- **Device Management**: Add, control, and monitor API-based smart devices
- **Device Control**: Power on/off, set timers, change modes and settings
- **Group Management**: Organize devices by rooms/areas (Living Room, Bedroom, etc.)
- **Automation Rules**: Create IF-THEN rules for intelligent device automation
- **Performance Modes**: Power Saving, Performance, and Custom modes
- **Real-time Dashboard**: Overview of all devices, energy usage, and system status

### UI/UX Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Interactive Dashboard**: Real-time device status and energy monitoring
- **Drag & Drop**: Intuitive device grouping (planned feature)
- **Search & Filter**: Powerful filtering by device type, status, and location

### Technical Features
- **Scalable Architecture**: Feature-based folder structure for maintainability
- **State Management**: Zustand for lightweight, scalable state management
- **API Layer**: Axios with interceptors, retry logic, and mock support
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: ARIA roles, keyboard navigation, and screen reader support
- **Performance**: Optimized rendering and lazy loading

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions

### State Management & Data
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **Axios** - HTTP client with interceptors

### UI & Icons
- **Heroicons** - Beautiful SVG icons
- **Custom Components** - Reusable UI component library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, Card, etc.)
│   └── layout/         # Layout components (Navbar, Sidebar, Layout)
├── features/           # Feature-based modules
│   ├── dashboard/      # Dashboard overview
│   ├── devices/        # Device management
│   ├── groups/         # Group management
│   ├── rules/          # Automation rules
│   └── modes/          # Performance modes
├── store/              # Zustand state stores
├── api/                # API layer and mock data
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-home-smart-home
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173/`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_MOCK_DATA=true
```

## 🎯 Core Components

### Device Management
- **DeviceCard**: Interactive device control cards
- **DeviceList**: Grid/list view with filtering and search
- **Device Control**: Power, timer, and settings management

### Dashboard
- **Real-time Overview**: System status and active devices
- **Energy Monitoring**: Current usage and trends
- **Quick Actions**: Rapid access to common tasks

### State Management
- **Device Store**: Device state and operations
- **Group Store**: Room/area organization
- **Rules Store**: Automation rule management
- **Modes Store**: Performance mode settings
- **Theme Store**: UI theme preferences

### API Layer
- **Mock Support**: Development with realistic mock data
- **Error Handling**: Retry logic and user-friendly errors
- **Device Discovery**: Automatic network device detection

## 🔌 Device Integration

### Supported Device Types
- Air Conditioners
- Smart Lights
- Ceiling Fans
- Sprinkler Systems
- Security Cameras
- Smart Thermostats
- Smart Plugs
- Door Locks
- And more...

### Device Capabilities
- Power Control
- Temperature/Brightness Settings
- Timer Functionality
- Energy Monitoring
- Motion Detection
- Recording Controls
- Mode Selection

## 🎨 Customization

### Theme Customization
The app supports full theme customization through TailwindCSS:

```css
/* Custom colors in tailwind.config.js */
primary: {
  50: '#eff6ff',
  500: '#3b82f6',
  900: '#1e3a8a'
}
```

### Component Styling
- Utility-first approach with TailwindCSS
- Custom CSS classes for complex components
- Dark mode support throughout

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layouts for tablets
- **Desktop**: Full-featured desktop experience
- **Adaptive Navigation**: Collapsible sidebar on smaller screens

## 🔒 Security Features

- **API Authentication**: Token-based authentication
- **Input Validation**: Client-side and server-side validation
- **Error Boundaries**: Graceful error handling
- **Secure Storage**: Safe handling of sensitive data

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: Responsive images and lazy loading
- **State Optimization**: Efficient state updates and subscriptions
- **Bundle Optimization**: Tree shaking and dead code elimination

## 🧪 Development Features

### Mock Data Support
- Realistic device simulation
- API delay simulation
- Error scenario testing
- Offline development capability

### Developer Tools
- React DevTools support
- State inspection with Zustand DevTools
- Network request monitoring
- Performance profiling

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core device management
- ✅ Dashboard overview
- ✅ Basic automation rules
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Advanced rule builder
- 🔄 Device grouping with drag & drop
- 🔄 Energy analytics and charts
- 🔄 Real-time notifications

### Phase 3 (Future)
- 📱 Voice control integration
- 🎯 Machine learning optimization
- 🔗 Third-party integrations
- 📊 Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS approach
- Framer Motion for smooth animations
- Heroicons for beautiful icons
- All contributors and testers

---

**Built with ❤️ for the smart home community**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
