import React, { createContext, useContext, useState } from 'react';
import { UserCheck, ShieldCheck, LogOut, GraduationCap, CheckCircle2 } from 'lucide-react';

// ==========================================
// 1. MOCK DATA
// ==========================================
export const MOCK_FACULTY = [
  { id: 'f1', name: 'Dr. Ravi Kumar', department: 'Computer Science', designation: 'Associate Professor' },
  { id: 'f2', name: 'Prof. Ananya Roy', department: 'Information Technology', designation: 'Assistant Professor' },
  { id: 'f3', name: 'Dr. Suresh Varma', department: 'Electronics', designation: 'Professor' }
];

export const MOCK_SUBJECTS = [
  { id: 's1', code: 'CS301', name: 'Database Management Systems', semester: 5 },
  { id: 's2', code: 'CS302', name: 'Web Technologies', semester: 5 },
  { id: 's3', code: 'EC204', name: 'Digital Electronics', semester: 3 }
];

export const MOCK_MAPPINGS = [
  { id: 'm1', facultyId: 'f1', subjectId: 's1', className: 'CSE-A', semester: 5 },
  { id: 'm2', facultyId: 'f2', subjectId: 's2', className: 'CSE-A', semester: 5 },
  { id: 'm3', facultyId: 'f3', subjectId: 's3', className: 'ECE-B', semester: 3 }
];

export const MOCK_FEEDBACKS = [
  {
    id: 'fb1',
    mappingId: 'm1',
    clarity: 5,
    punctuality: 4,
    knowledge: 5,
    communication: 4,
    support: 5,
    comment: 'Explains concepts clearly with real-world examples.',
    createdAt: '2026-10-01T10:30:00Z'
  },
  {
    id: 'fb2',
    mappingId: 'm1',
    clarity: 4,
    punctuality: 4,
    knowledge: 4,
    communication: 4,
    support: 4,
    comment: 'More practical lab demonstrations would be helpful.',
    createdAt: '2026-10-02T14:15:00Z'
  }
];

export const MOCK_STUDENT_SUBMISSIONS = [
  { studentId: 'st101', mappingId: 'm2' }
];

// ==========================================
// 2. AUTHENTICATION & STATE CONTEXT
// ==========================================
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState(MOCK_FEEDBACKS);
  const [submissions, setSubmissions] = useState(MOCK_STUDENT_SUBMISSIONS);

  const login = (role) => {
    if (role === 'student') {
      setUser({ id: 'st101', name: 'Student User', role: 'student' });
    } else {
      setUser({ id: 'adm1', name: 'Admin User', role: 'admin' });
    }
  };

  const logout = () => setUser(null);

  const submitFeedback = (mappingId, ratings, comment) => {
    const newFeedback = {
      id: `fb${Date.now()}`,
      mappingId,
      ...ratings,
      comment,
      createdAt: new Date().toISOString()
    };

    setFeedbacks((prev) => [...prev, newFeedback]);
    setSubmissions((prev) => [...prev, { studentId: user.id, mappingId }]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, feedbacks, submissions, submitFeedback }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// ==========================================
// 3. NAVBAR COMPONENT
// ==========================================
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-600 text-white p-2 rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-slate-900">FacultyPulse</span>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-600">
              {user.name} ({user.role})
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// ==========================================
// 4. STUDENT DASHBOARD COMPONENT
// ==========================================
const StudentDashboard = () => {
  const { user, submissions, submitFeedback } = useAuth();
  const [selectedMapping, setSelectedMapping] = useState(null);
  const [ratings, setRatings] = useState({ clarity: 5, punctuality: 5, knowledge: 5, communication: 5, support: 5 });
  const [comment, setComment] = useState('');

  const isSubmitted = (mappingId) => submissions.some(s => s.studentId === user.id && s.mappingId === mappingId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMapping) {
      submitFeedback(selectedMapping.id, ratings, comment);
      setSelectedMapping(null);
      setComment('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Student Feedback Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_MAPPINGS.map((m) => {
          const faculty = MOCK_FACULTY.find(f => f.id === m.facultyId);
          const subject = MOCK_SUBJECTS.find(s => s.id === m.subjectId);
          const done = isSubmitted(m.id);

          return (
            <div key={m.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">{subject?.name} ({subject?.code})</h3>
                <p className="text-sm text-slate-600">Faculty: {faculty?.name}</p>
                <p className="text-xs text-slate-400 mt-1">Class: {m.className} | Sem {m.semester}</p>
              </div>
              <div className="mt-4">
                {done ? (
                  <span className="inline-flex items-center text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Submitted
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedMapping(m)}
                    className="w-full bg-brand-600 text-white font-medium text-sm py-2 rounded-xl hover:bg-brand-700 transition"
                  >
                    Provide Feedback
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedMapping && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl max-w-lg w-full space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Feedback Form</h2>
            {['clarity', 'punctuality', 'knowledge', 'communication', 'support'].map((field) => (
              <div key={field} className="flex justify-between items-center">
                <span className="capitalize text-sm text-slate-700 font-medium">{field}</span>
                <select
                  value={ratings[field]}
                  onChange={(e) => setRatings({ ...ratings, [field]: Number(e.target.value) })}
                  className="border border-slate-300 rounded-lg p-1 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>{val} Stars</option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <label className="block text-sm text-slate-700 font-medium mb-1">Comments</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                rows={3}
                placeholder="Optional constructive feedback..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedMapping(null)}
                className="px-4 py-2 border text-slate-600 rounded-xl text-sm font-medium"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-medium">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. ADMIN DASHBOARD COMPONENT
// ==========================================
const AdminDashboard = () => {
  const { feedbacks } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
          <p className="text-sm text-slate-500">Total Submissions</p>
          <p className="text-3xl font-extrabold text-slate-900">{feedbacks.length}</p>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
          <p className="text-sm text-slate-500">Active Faculty</p>
          <p className="text-3xl font-extrabold text-slate-900">{MOCK_FACULTY.length}</p>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
          <p className="text-sm text-slate-500">Subjects Tracked</p>
          <p className="text-3xl font-extrabold text-slate-900">{MOCK_SUBJECTS.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Anonymous Comment Feed</h2>
        <div className="space-y-3">
          {feedbacks.map((fb) => {
            const mapping = MOCK_MAPPINGS.find(m => m.id === fb.mappingId);
            const subject = MOCK_SUBJECTS.find(s => s.id === mapping?.subjectId);
            const faculty = MOCK_FACULTY.find(f => f.id === mapping?.facultyId);

            return (
              <div key={fb.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{subject?.name} — {faculty?.name}</span>
                  <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-slate-800">{fb.comment || "No comment provided."}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. MAIN APPLICATION ENTRY
// ==========================================
const AppContent = () => {
  const { user, login } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Welcome to FacultyPulse</h2>
            <p className="text-sm text-slate-500 mt-1">Select your portal to continue</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => login('student')}
              className="w-full flex items-center justify-center space-x-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-2xl shadow-md transition"
            >
              <UserCheck className="w-5 h-5" />
              <span>Login as Student</span>
            </button>

            <button
              onClick={() => login('admin')}
              className="w-full flex items-center justify-center space-x-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-2xl shadow-md transition"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Login as Admin</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
    </main>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <AppContent />
      </div>
    </AuthProvider>
  );
}