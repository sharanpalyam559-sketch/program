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