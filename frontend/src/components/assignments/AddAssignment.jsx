import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../services/api';

const AddAssignment = ({ subjects, assignment, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    subjectId: '',
    title: '',
    description: '',
    deadline: '',
    maxScore: '',
    obtainedScore: '',
    isCompleted: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (assignment) {
      setFormData({
        subjectId: assignment.subjectId._id,
        title: assignment.title,
        description: assignment.description || '',
        deadline: new Date(assignment.deadline).toISOString().split('T')[0],
        maxScore: assignment.maxScore,
        obtainedScore: assignment.obtainedScore || '',
        isCompleted: assignment.isCompleted
      });
    }
  }, [assignment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData };
      if (payload.obtainedScore === '') payload.obtainedScore = null;

      if (assignment) {
        await api.put(`/assignments/${assignment._id}`, payload);
      } else {
        await api.post('/assignments', payload);
      }
      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{assignment ? 'Edit' : 'Add'} Assignment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              required
              className="input-field"
              value={formData.subjectId}
              onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="input-field"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="input-field"
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <input
              type="date"
              required
              className="input-field"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Score</label>
              <input
                type="number"
                required
                min="0"
                className="input-field"
                value={formData.maxScore}
                onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Obtained Score</label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={formData.obtainedScore}
                onChange={(e) => setFormData({ ...formData, obtainedScore: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isCompleted"
              checked={formData.isCompleted}
              onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="isCompleted" className="text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
