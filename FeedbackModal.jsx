import React, { useState } from 'react';
import { Star, ShieldAlert, X } from 'lucide-react';

const CRITERIA = [
  { key: 'clarity', label: 'Clarity of Teaching', desc: 'Explains complex topics simply and effectively' },
  { key: 'punctuality', label: 'Punctuality', desc: 'Arrives on time and manages class schedule well' },
  { key: 'knowledge', label: 'Subject Knowledge', desc: 'Demonstrates deep understanding of the subject' },
  { key: 'communication', label: 'Communication Skills', desc: 'Clear articulation, audible and engaging tone' },
  { key: 'support', label: 'Student Support', desc: 'Approachable for doubts and academic guidance' }
];

export const FeedbackModal = ({ mapping, faculty, subject, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState({ clarity: 5, punctuality: 5, knowledge: 5, communication: 5, support: 5 });
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      mappingId: mapping.id,
      ...ratings,
      comment
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{subject.name}</h3>
            <p className="text-sm text-slate-600">Faculty: {faculty.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="p-3.5 bg-sky-50 border border-sky-100 rounded-xl flex items-start space-x-3 text-sky-800 text-xs leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sky-900">100% Anonymous Feedback</span>
              Your ratings and comments will be stored without any link to your name or student ID.
            </div>
          </div>

          <div className="space-y-4">
            {CRITERIA.map((item) => (
              <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg hover:bg-slate-50">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatings({ ...ratings, [item.key]: star })}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition ${
                          star <= ratings[item.key] ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">Optional Comments</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Constructive feedback to help improve teaching quality..."
              className="w-full text-sm rounded-xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition"
            >
              Submit Anonymous Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};