import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Target, FileText, Bell, BarChart3, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/study-sessions', icon: BookOpen, label: 'Study Sessions' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/assignments', icon: FileText, label: 'Assignments' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ path: '/admin', icon: Shield, label: 'Admin Panel' });
  }

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
