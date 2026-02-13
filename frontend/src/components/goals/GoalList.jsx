import { useState, useEffect } from 'react';
import { Plus, CheckCircle, Trash2 } from 'lucide-react';
import api from '../../services/api';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import AddGoal from './AddGoal';
import { formatDate } from '../../utils/helpers';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchGoals();
  }, [filter]);

  const fetchGoals = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const { data } = await api.get('/goals', { params });
      setGoals(data.goals);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    }
  };

  const handleComplete = async (goal) => {
    try {
      await api.put(`/goals/${goal._id}`, { isCompleted: true });
      fetchGoals();
    } catch (error) {
      alert('Failed to complete goal');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this goal?')) return;
    try {
      await api.delete(`/goals/${id}`);
      fetchGoals();
    } catch (error) {
      alert('Failed to delete goal');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Goals</h1>
            <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center">
              <Plus size={20} className="mr-2" />
              Add Goal
            </button>
          </div>

          <div className="flex space-x-2 mb-6">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  filter === f ? 'bg-primary text-white' : 'bg-white text-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {goals.map((goal) => (
              <div key={goal._id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-800">{goal.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        goal.type === 'short-term' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {goal.type}
                      </span>
                    </div>
                    {goal.description && <p className="text-sm text-gray-600 mt-1">{goal.description}</p>}
                  </div>
                  <div className="flex space-x-2">
                    {!goal.isCompleted && (
                      <button
                        onClick={() => handleComplete(goal)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(goal._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${goal.isCompleted ? 'bg-green-500' : 'bg-primary'}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
                  <span>Due: {formatDate(goal.deadline)}</span>
                </div>
              </div>
            ))}
          </div>

          {showAddModal && (
            <AddGoal
              onClose={() => setShowAddModal(false)}
              onSuccess={() => {
                fetchGoals();
                setShowAddModal(false);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default GoalList;
