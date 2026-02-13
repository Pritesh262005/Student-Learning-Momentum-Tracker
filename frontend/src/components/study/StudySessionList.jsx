import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import AddStudySession from './AddStudySession';
import { formatDate, formatDuration } from '../../utils/helpers';

const StudySessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSession, setEditSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sessionsRes, subjectsRes] = await Promise.all([
        api.get('/study-sessions'),
        api.get('/study-sessions/subjects')
      ]);
      setSessions(sessionsRes.data.sessions);
      setSubjects(subjectsRes.data.subjects);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this session?')) return;
    try {
      await api.delete(`/study-sessions/${id}`);
      fetchData();
    } catch (error) {
      alert('Failed to delete session');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Study Sessions</h1>
            <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center">
              <Plus size={20} className="mr-2" />
              Add Session
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : sessions.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 mb-4">No study sessions yet</p>
              <button onClick={() => setShowAddModal(true)} className="btn-primary">
                Add Your First Session
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div key={session._id} className="card flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: session.subjectId.color }}
                    ></div>
                    <div>
                      <h3 className="font-medium text-gray-800">{session.subjectId.name}</h3>
                      <p className="text-sm text-gray-600">{formatDate(session.date)}</p>
                      {session.notes && <p className="text-sm text-gray-500 mt-1">{session.notes}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-primary">{formatDuration(session.duration)}</span>
                    <button
                      onClick={() => setEditSession(session)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(showAddModal || editSession) && (
            <AddStudySession
              subjects={subjects}
              session={editSession}
              onClose={() => {
                setShowAddModal(false);
                setEditSession(null);
              }}
              onSuccess={() => {
                fetchData();
                setShowAddModal(false);
                setEditSession(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default StudySessionList;
