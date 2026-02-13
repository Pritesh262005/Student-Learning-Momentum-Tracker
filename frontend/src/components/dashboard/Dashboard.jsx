import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import StatsCard from './StatsCard';
import MomentumScore from './MomentumScore';
import SubjectChart from './SubjectChart';
import WeeklyTrend from './WeeklyTrend';
import { Clock, Flame, Target, Calendar } from 'lucide-react';
import { formatDate, getTimeUntilDeadline } from '../../utils/helpers';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get('/dashboard');
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Study Hours"
              value={dashboardData?.totalHours || 0}
              icon={Clock}
              color="blue"
            />
            <StatsCard
              title="Current Streak"
              value={`${dashboardData?.streak || 0} days`}
              icon={Flame}
              color="orange"
            />
            <StatsCard
              title="Active Goals"
              value={dashboardData?.activeGoals?.length || 0}
              icon={Target}
              color="green"
            />
            <StatsCard
              title="Upcoming Deadlines"
              value={dashboardData?.upcomingAssignments?.length || 0}
              icon={Calendar}
              color="purple"
            />
          </div>

          {/* Momentum Score */}
          <div className="mb-8">
            <MomentumScore momentum={dashboardData?.momentum} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SubjectChart data={dashboardData?.subjectBreakdown || []} />
            <WeeklyTrend data={dashboardData?.weeklyTrend || []} />
          </div>

          {/* Goals and Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Goals */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Active Goals</h2>
                <Link to="/goals" className="text-primary hover:underline text-sm">
                  View All
                </Link>
              </div>
              {dashboardData?.activeGoals?.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.activeGoals.map((goal) => (
                    <div key={goal._id} className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-medium text-gray-800">{goal.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{goal.progress}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {formatDate(goal.deadline)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No active goals</p>
              )}
            </div>

            {/* Upcoming Deadlines */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Deadlines</h2>
                <Link to="/assignments" className="text-primary hover:underline text-sm">
                  View All
                </Link>
              </div>
              {dashboardData?.upcomingAssignments?.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subjectId.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                          {getTimeUntilDeadline(assignment.deadline)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(assignment.deadline)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
