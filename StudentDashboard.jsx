import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_MAPPINGS, MOCK_FACULTY, MOCK_SUBJECTS, MOCK_STUDENT_SUBMISSIONS, MOCK_FEEDBACKS } from '../../data/mockData';
import { FeedbackModal } from './FeedbackModal';
import { CheckCircle2, MessageSquarePlus, BookOpen } from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState(MOCK_STUDENT_SUBMISSIONS);
  const [feedbacks, setFeedbacks] = useState(MOCK_FEEDBACKS);
  const [activeModal, setActiveModal] = useState(null);

  const submittedMappingIds = new Set(
    submissions.filter(s => s.studentId === user.id).map(s => s.mappingId)
  );

  const handleOpenFeedback = (mapping) => {
    const faculty = MOCK_FACULTY.find(f => f.id === mapping.facultyId);
    const subject = MOCK_SUBJECTS.find(s => s.id === mapping.subjectId);
    setActiveModal({ mapping, faculty, subject });
  };

  const handleFeedbackSubmit = (feedbackData) => {
    const newFeedback = {
      id: `fb_${Date.now()}`,
      ...feedbackData,
      createdAt: new Date().toISOString()
    };
    setFeedbacks([...feedbacks, newFeedback]);
    setSubmissions([...submissions, { studentId: user.id, mappingId: feedbackData.mappingId }]);
    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assigned Subjects</h1>
          <p className="text-sm text-slate-500">Submit honest, anonymous feedback for your course faculty.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 self-start sm:self-auto">
          Semester 5 • CSE-A
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_MAPPINGS.map((mapping) => {
          const faculty = MOCK_FACULTY.find(f => f.id === mapping.facultyId);
          const subject = MOCK_SUBJECTS.find(s => s.id === mapping.subjectId);
          const isSubmitted = submittedMappingIds.has(mapping.id);

          return (
            <div key={mapping.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 bg-brand-50 text-brand-700 rounded-md">
                    {subject.code}
                  </span>
                  {isSubmitted ? (
                    <span className="flex items-center space-x-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Submitted</span>
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      Pending
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{subject.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>{faculty.name} ({faculty.designation})</span>
                </div>
              </div>

              <button
                disabled={isSubmitted}
                onClick={() => handleOpenFeedback(mapping)}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition ${
                  isSubmitted
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                }`}
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>{isSubmitted ? 'Feedback Submitted' : 'Give Feedback'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {activeModal && (
        <FeedbackModal
          mapping={activeModal.mapping}
          faculty={activeModal.faculty}
          subject={activeModal.subject}
          onClose={() => setActiveModal(null)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};