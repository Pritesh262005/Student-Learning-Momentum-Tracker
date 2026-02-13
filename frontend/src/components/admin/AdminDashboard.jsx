import { useState, useEffect } from 'react';
import { Users, BookOpen, Target, FileText } from 'lucide-react';
import api from '../../services/api';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [showUserManagement, setShowUserManagement] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/admin/analytics');
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.users.total}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {analytics.users.active} active, {analytics.users.blocked} blocked
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Users size={24} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Study Sessions</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.activity.totalSessions}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {analytics.activity.totalStudyHours} hours total
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <BookOpen size={24} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Goals</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.activity.totalGoals}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {analytics.activity.goalCompletionRate}% completion rate
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Target size={24} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assignments</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.activity.totalAssignments}</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <FileText size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Distribution</h2>
            <div className="grid grid-cols-3 gap-4">
              {analytics.users.byRole.map((role) => (
                <div key={role._id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">{role.count}</p>
                  <p className="text-sm text-gray-600 capitalize">{role._id}s</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">User Management</h2>
              <button
                onClick={() => setShowUserManagement(!showUserManagement)}
                className="btn-primary"
              >
                {showUserManagement ? 'Hide' : 'Show'} Users
              </button>
            </div>
            {showUserManagement && <UserManagement />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
