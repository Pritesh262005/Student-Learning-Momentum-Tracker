import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyTrend = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Study Trend</h2>
        <p className="text-gray-500 text-center py-8">No study data available</p>
      </div>
    );
  }

  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    minutes: item.minutes
  }));

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Study Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `${value} minutes`} />
          <Line type="monotone" dataKey="minutes" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyTrend;
