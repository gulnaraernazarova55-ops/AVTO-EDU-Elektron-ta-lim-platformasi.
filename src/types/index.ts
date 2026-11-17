export type Language = 'uz' | 'ru' | 'en';

export interface LocalizedText {
  uz: string;
  ru: string;
  en: string;
}

export type UserRole = 'guest' | 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'teacher';
  avatar?: string;
  preferredLanguage: Language;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  badges: string[];
  createdAt: string;
}

export interface CourseModule {
  id: string;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  published: boolean;
}

export interface LessonComment {
  id: string;
  lessonId: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'teacher';
  text: string;
  createdAt: string;
  reply?: {
    text: string;
    teacherName: string;
    repliedAt: string;
  };
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  durationMinutes: number;
  videoType: 'youtube' | 'file';
  videoUrl: string;
  attachedMaterialIds: string[];
  keyTakeaways: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  published: boolean;
}

export interface EBook {
  id: string;
  title: LocalizedText;
  author: string;
  category: 'diagnostics' | 'maintenance' | 'electrical' | 'reference';
  language: Language | 'all';
  pages: number;
  sizeLabel: string;
  coverUrl?: string;
  tags: string[];
  summary: LocalizedText;
  chapters: {
    uz: { heading: string; body: string }[];
    ru: { heading: string; body: string }[];
    en: { heading: string; body: string }[];
  };
  published: boolean;
  createdAt: string;
}

export type SlideDiagramType =
  | 'four-stroke'
  | 'ignition-wave'
  | 'obd-architecture'
  | 'compression-chart'
  | 'fuel-trim'
  | 'timing-belt';

export interface PresentationSlide {
  id: string;
  title: LocalizedText;
  bullets: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  notes: LocalizedText;
  diagramType?: SlideDiagramType;
}

export interface Presentation {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  moduleRef: string;
  author: string;
  slides: PresentationSlide[];
  published: boolean;
  createdAt: string;
}

export type QuestionType =
  | 'single'
  | 'multiple'
  | 'true_false'
  | 'matching'
  | 'image'
  | 'fault_code';

export interface MatchingPair {
  id: string;
  left: LocalizedText;
  right: LocalizedText;
}

export interface Question {
  id: string;
  type: QuestionType;
  topic: LocalizedText;
  prompt: LocalizedText;
  imageUrl?: string;
  faultCodeBadge?: string;
  options?: LocalizedText[];
  correctIndices?: number[];
  correctBoolean?: boolean;
  matchingPairs?: MatchingPair[];
  explanation: LocalizedText;
  points: number;
}

export interface TestItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  moduleTag: LocalizedText;
  durationMinutes: number;
  passScore: number;
  isFinalExam?: boolean;
  shuffleQuestions: boolean;
  questions: Question[];
  published: boolean;
}

export interface QuestionAnswerRecord {
  questionId: string;
  isCorrect: boolean;
  selectedIndices?: number[];
  selectedBoolean?: boolean;
  matchingSelections?: Record<string, string>;
}

export interface TestAttempt {
  id: string;
  testId: string;
  userId: string;
  scorePercent: number;
  passed: boolean;
  earnedPoints: number;
  totalPoints: number;
  durationSeconds: number;
  completedAt: string;
  answers: QuestionAnswerRecord[];
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseTitle: LocalizedText;
  scorePercent: number;
  issuedAt: string;
  instructorName: string;
}

export interface Assignment {
  id: string;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  estimatedMinutes: number;
  tools: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  safetyWarnings: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  steps: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  published: boolean;
}

export type SubmissionStatus = 'submitted' | 'under_review' | 'accepted' | 'needs_revision';

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  reportText: string;
  attachmentBase64?: string;
  attachmentName?: string;
  checkedSteps: number[];
  status: SubmissionStatus;
  grade?: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
}

export interface DtcCode {
  code: string;
  system: 'fuel_air' | 'ignition' | 'emissions' | 'sensors' | 'cooling_idle' | 'transmission';
  severity: 'low' | 'medium' | 'high';
  meaning: LocalizedText;
  causes: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  checks: {
    uz: string[];
    ru: string[];
    en: string[];
  };
}

export interface Announcement {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  createdAt: string;
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: LocalizedText;
  message: LocalizedText;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface StudentProgress {
  completedLessonIds: string[];
  lessonPositions: Record<string, number>;
  lessonNotes: Record<string, string>;
  bookmarkedEbookIds: string[];
  readEbookIds: string[];
  ebookProgress: Record<string, number>;
  assignmentChecklists: Record<string, number[]>;
}

export interface PlatformBackup {
  version: string;
  exportedAt: string;
  data: Record<string, unknown>;
}
