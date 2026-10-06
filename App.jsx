import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserCheck, ShieldCheck } from 'lucide-react';

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