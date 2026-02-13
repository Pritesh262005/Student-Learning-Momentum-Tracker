import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import AddAssignment from './AddAssignment';
import { formatDate, getTimeUntilDeadline } from '../../utils/helpers';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [assignmentsRes, subjectsRes] = await Promise.all([
        api.get('/assignments'),
        api.get('/study-sessions/subjects')
      ]);
      setAssignments(assignmentsRes.data.assignments);
      setSubjects(subjectsRes.data.subjects);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this assignment?')) return;
    try {
      await api.delete(`/assignments/${id}`);
      fetchData();
    } catch (error) {
      alert('Failed to delete assignment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
            <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center">
              <Plus size={20} className="mr-2" />
              Add Assignment
            </button>
          </div>

          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-800">{assignment.title}</h3>
                      {assignment.isCompleted && (
                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{assignment.subjectId.name}</p>
                    {assignment.description && (
                      <p className="text-sm text-gray-500 mb-2">{assignment.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">
                        Due: {formatDate(assignment.deadline)} ({getTimeUntilDeadline(assignment.deadline)})
                      </span>
                      {assignment.obtainedScore !== null && (
                        <span className="font-medium text-primary">
                          Score: {assignment.obtainedScore}/{assignment.maxScore} ({assignment.percentage}%)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditAssignment(assignment)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(showAddModal || editAssignment) && (
            <AddAssignment
              subjects={subjects}
              assignment={editAssignment}
              onClose={() => {
                setShowAddModal(false);
                setEditAssignment(null);
              }}
              onSuccess={() => {
                fetchData();
                setShowAddModal(false);
                setEditAssignment(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AssignmentList;
