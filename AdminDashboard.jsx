import React, { useState } from 'react';
import { MOCK_FACULTY, MOCK_SUBJECTS, MOCK_MAPPINGS, MOCK_FEEDBACKS } from '../../data/mockData';
import { Star, Users, BookOpen, Download, Filter } from 'lucide-react';

export const AdminDashboard = () => {
  const [selectedMappingId, setSelectedMappingId] = useState('m1');

  const selectedMapping = MOCK_MAPPINGS.find(m => m.id === selectedMappingId) || MOCK_MAPPINGS[0];
  const faculty = MOCK_FACULTY.find(f => f.id === selectedMapping.facultyId);
  const subject = MOCK_SUBJECTS.find(s => s.id === selectedMapping.subjectId);

  const feedbacks = MOCK_FEEDBACKS.filter(fb => fb.mappingId === selectedMapping.id);
  const totalResponses = feedbacks.length;

  const calcAvg = (key) => {
    if (!totalResponses) return '0.0';
    const sum = feedbacks.reduce((acc, curr) => acc + curr[key], 0);
    return (sum / totalResponses).toFixed(1);
  };

  const averages = {
    clarity: calcAvg('clarity'),
    punctuality: calcAvg('punctuality'),
    knowledge: calcAvg('knowledge'),
    communication: calcAvg('communication'),
    support: calcAvg('support')
  };

  const overallAvg = totalResponses
    ? (
        Object.values(averages).reduce((acc, val) => acc + parseFloat(val), 0) / 5
      ).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Faculty Feedback Dashboard</h1>
          <p className="text-sm text-slate-500">Aggregated rating metrics and anonymous student insights.</p>
        </div>
        <button
          onClick={() => alert("Downloading CSV feedback report...")}
          className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
          <Filter className="w-4 h-4" />
          <span>Select Mapping:</span>
        </div>
        <select
          value={selectedMappingId}
          onChange={(e) => setSelectedMappingId(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {MOCK_MAPPINGS.map((m) => {
            const f = MOCK_FACULTY.find(fac => fac.id === m.facultyId);
            const s = MOCK_SUBJECTS.find(sub => sub.id === m.subjectId);
            return (
              <option key={m.id} value={m.id}>
                {f.name} — {s.name} ({m.className})
              </option>
            );
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Faculty Member</p>
            <h3 className="text-lg font-bold text-slate-900">{faculty?.name}</h3>
            <p className="text-xs text-slate-500">{faculty?.department}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject & Class</p>
            <h3 className="text-lg font-bold text-slate-900">{subject?.name}</h3>
            <p className="text-xs text-slate-500">{selectedMapping.className} • Sem {selectedMapping.semester}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Rating</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black text-slate-900">{overallAvg}</span>
              <span className="text-sm font-semibold text-slate-400">/ 5.0</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{totalResponses} Responses Recorded</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Star className="w-8 h-8 fill-amber-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Parameter Averages</h3>
          <div className="space-y-3">
            {[
              { label: 'Clarity of Teaching', score: averages.clarity },
              { label: 'Punctuality', score: averages.punctuality },
              { label: 'Subject Knowledge', score: averages.knowledge },
              { label: 'Communication Skills', score: averages.communication },
              { label: 'Student Support', score: averages.support }
            ].map((param) => (
              <div key={param.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{param.label}</span>
                  <span>{param.score} / 5</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(parseFloat(param.score) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
            Anonymous Student Comments
          </h3>
          <div className="space-y-3 overflow-y-auto max-h-[260px] pr-2">
            {feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <div key={fb.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
                  "{fb.comment || 'No specific comment provided.'}"
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic py-8 text-center">No comments submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};