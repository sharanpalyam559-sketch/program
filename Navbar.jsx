import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, ShieldCheck, UserCheck } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-600 text-white p-2 rounded-xl font-black text-lg tracking-wider">
            FP
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">FacultyPulse</span>
            <p className="text-xs text-slate-500 font-medium">Anonymous Feedback System</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700">
              {user.role === 'admin' ? <ShieldCheck className="w-4 h-4 text-brand-600" /> : <UserCheck className="w-4 h-4 text-emerald-600" />}
              <span>{user.name}</span>
              <span className="uppercase text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">{user.role}</span>
            </div>
            <button
              onClick={logout}
              className="text-slate-500 hover:text-red-600 p-2 rounded-lg hover:bg-slate-100 transition"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};