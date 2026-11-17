import {
  Announcement,
  AppNotification,
  Assignment,
  ContactMessage,
  CourseModule,
  DtcCode,
  EBook,
  Lesson,
  LessonComment,
  LocalizedText,
  Presentation,
  StudentProgress,
  Submission,
  SubmissionStatus,
} from '../types';
import { generateId } from '../utils/crypto';
import { authService } from './authService';
import { ensureSeeded, readStore, STORAGE_KEYS, writeStore } from './storageService';

const DEFAULT_PROGRESS: StudentProgress = {
  completedLessonIds: [],
  lessonPositions: {},
  lessonNotes: {},
  bookmarkedEbookIds: [],
  readEbookIds: [],
  ebookProgress: {},
  assignmentChecklists: {},
};

export const contentService = {
  // Modules
  getModules(): CourseModule[] {
    ensureSeeded();
    return readStore<CourseModule[]>(STORAGE_KEYS.MODULES, []).sort((a, b) => a.order - b.order);
  },

  saveModule(mod: CourseModule): void {
    const list = this.getModules();
    const exists = list.some((m) => m.id === mod.id);
    const next = exists ? list.map((m) => (m.id === mod.id ? mod : m)) : [...list, mod];
    writeStore(STORAGE_KEYS.MODULES, next);
  },

  // Lessons
  getLessons(includeDrafts = false): Lesson[] {
    ensureSeeded();
    const list = readStore<Lesson[]>(STORAGE_KEYS.LESSONS, []).sort((a, b) => a.order - b.order);
    return includeDrafts ? list : list.filter((l) => l.published);
  },

  saveLesson(lesson: Lesson): void {
    const list = this.getLessons(true);
    const exists = list.some((l) => l.id === lesson.id);
    const next = exists ? list.map((l) => (l.id === lesson.id ? lesson : l)) : [...list, lesson];
    writeStore(STORAGE_KEYS.LESSONS, next);
  },

  deleteLesson(id: string): void {
    const next = this.getLessons(true).filter((l) => l.id !== id);
    writeStore(STORAGE_KEYS.LESSONS, next);
  },

  reorderLessons(orderedIds: string[]): void {
    const all = this.getLessons(true);
    const map = new Map(all.map((l) => [l.id, l]));
    const reordered: Lesson[] = [];
    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) reordered.push({ ...item, order: idx + 1 });
    });
    all.forEach((item) => {
      if (!orderedIds.includes(item.id)) {
        reordered.push({ ...item, order: reordered.length + 1 });
      }
    });
    writeStore(STORAGE_KEYS.LESSONS, reordered);
  },

  // Lesson Comments / Q&A
  getLessonComments(lessonId?: string): LessonComment[] {
    ensureSeeded();
    const all = readStore<LessonComment[]>(STORAGE_KEYS.COMMENTS, []);
    return lessonId ? all.filter((c) => c.lessonId === lessonId) : all;
  },

  addLessonComment(comment: Omit<LessonComment, 'id' | 'createdAt'>): LessonComment {
    const all = this.getLessonComments();
    const created: LessonComment = {
      ...comment,
      id: generateId('cmt'),
      createdAt: new Date().toISOString(),
    };
    writeStore(STORAGE_KEYS.COMMENTS, [created, ...all]);
    return created;
  },

  replyToComment(commentId: string, text: string, teacherName: string): void {
    const all = this.getLessonComments();
    const next = all.map((c) =>
      c.id === commentId
        ? {
            ...c,
            reply: {
              text,
              teacherName,
              repliedAt: new Date().toISOString(),
            },
          }
        : c
    );
    writeStore(STORAGE_KEYS.COMMENTS, next);
  },

  // E-Books
  getEbooks(includeDrafts = false): EBook[] {
    ensureSeeded();
    const list = readStore<EBook[]>(STORAGE_KEYS.EBOOKS, []);
    return includeDrafts ? list : list.filter((b) => b.published);
  },

  saveEbook(book: EBook): void {
    const list = this.getEbooks(true);
    const exists = list.some((b) => b.id === book.id);
    const next = exists ? list.map((b) => (b.id === book.id ? book : b)) : [book, ...list];
    writeStore(STORAGE_KEYS.EBOOKS, next);
  },

  deleteEbook(id: string): void {
    const next = this.getEbooks(true).filter((b) => b.id !== id);
    writeStore(STORAGE_KEYS.EBOOKS, next);
  },

  // Presentations
  getPresentations(includeDrafts = false): Presentation[] {
    ensureSeeded();
    const list = readStore<Presentation[]>(STORAGE_KEYS.PRESENTATIONS, []);
    return includeDrafts ? list : list.filter((p) => p.published);
  },

  savePresentation(pres: Presentation): void {
    const list = this.getPresentations(true);
    const exists = list.some((p) => p.id === pres.id);
    const next = exists ? list.map((p) => (p.id === pres.id ? pres : p)) : [pres, ...list];
    writeStore(STORAGE_KEYS.PRESENTATIONS, next);
  },

  deletePresentation(id: string): void {
    const next = this.getPresentations(true).filter((p) => p.id !== id);
    writeStore(STORAGE_KEYS.PRESENTATIONS, next);
  },

  // Practical Assignments & Submissions
  getAssignments(includeDrafts = false): Assignment[] {
    ensureSeeded();
    const list = readStore<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, []).sort((a, b) => a.order - b.order);
    return includeDrafts ? list : list.filter((a) => a.published);
  },

  saveAssignment(assignment: Assignment): void {
    const list = this.getAssignments(true);
    const exists = list.some((a) => a.id === assignment.id);
    const next = exists ? list.map((a) => (a.id === assignment.id ? assignment : a)) : [...list, assignment];
    writeStore(STORAGE_KEYS.ASSIGNMENTS, next);
  },

  deleteAssignment(id: string): void {
    const next = this.getAssignments(true).filter((a) => a.id !== id);
    writeStore(STORAGE_KEYS.ASSIGNMENTS, next);
  },

  getSubmissions(): Submission[] {
    ensureSeeded();
    return readStore<Submission[]>(STORAGE_KEYS.SUBMISSIONS, []);
  },

  submitAssignment(payload: {
    assignmentId: string;
    studentId: string;
    studentName: string;
    reportText: string;
    attachmentBase64?: string;
    attachmentName?: string;
    checkedSteps: number[];
  }): Submission {
    const list = this.getSubmissions();
    const existing = list.find(
      (s) => s.assignmentId === payload.assignmentId && s.studentId === payload.studentId
    );
    const submission: Submission = {
      id: existing ? existing.id : generateId('sub'),
      assignmentId: payload.assignmentId,
      studentId: payload.studentId,
      studentName: payload.studentName,
      reportText: payload.reportText,
      attachmentBase64: payload.attachmentBase64,
      attachmentName: payload.attachmentName,
      checkedSteps: payload.checkedSteps,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };
    const next = existing
      ? list.map((s) => (s.id === existing.id ? submission : s))
      : [submission, ...list];
    writeStore(STORAGE_KEYS.SUBMISSIONS, next);
    authService.awardXpAndBadge(payload.studentId, 30);
    return submission;
  },

  gradeSubmission(submissionId: string, grade: number, status: SubmissionStatus, feedback: string): void {
    const list = this.getSubmissions();
    let target: Submission | undefined;
    const next = list.map((s) => {
      if (s.id === submissionId) {
        target = {
          ...s,
          grade,
          status,
          feedback,
          gradedAt: new Date().toISOString(),
        };
        return target;
      }
      return s;
    });
    writeStore(STORAGE_KEYS.SUBMISSIONS, next);

    if (target) {
      if (status === 'accepted') {
        authService.awardXpAndBadge(target.studentId, 50);
      }
      this.pushNotification({
        userId: target.studentId,
        title: {
          uz: 'Amaliy ish baholandi',
          ru: 'Практическая работа проверена',
          en: 'Assignment Graded',
        },
        message: {
          uz: `Sizning ishingizga ${grade}/100 ball qo‘yildi.`,
          ru: `Ваша работа оценена на ${grade}/100 баллов.`,
          en: `Your lab report received a grade of ${grade}/100.`,
        },
        link: '/student',
      });
    }
  },

  // DTC Codes
  getDtcCodes(): DtcCode[] {
    ensureSeeded();
    return readStore<DtcCode[]>(STORAGE_KEYS.DTC_CODES, []);
  },

  // Announcements
  getAnnouncements(includeDrafts = false): Announcement[] {
    ensureSeeded();
    const list = readStore<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, []);
    return includeDrafts ? list : list.filter((a) => a.published);
  },

  saveAnnouncement(ann: Announcement): void {
    const list = this.getAnnouncements(true);
    const exists = list.some((a) => a.id === ann.id);
    const next = exists ? list.map((a) => (a.id === ann.id ? ann : a)) : [ann, ...list];
    writeStore(STORAGE_KEYS.ANNOUNCEMENTS, next);
  },

  deleteAnnouncement(id: string): void {
    const next = this.getAnnouncements(true).filter((a) => a.id !== id);
    writeStore(STORAGE_KEYS.ANNOUNCEMENTS, next);
  },

  // Contact Messages
  getContactMessages(): ContactMessage[] {
    ensureSeeded();
    return readStore<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, []);
  },

  addContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const list = this.getContactMessages();
    const created: ContactMessage = {
      ...msg,
      id: generateId('msg'),
      createdAt: new Date().toISOString(),
      read: false,
    };
    writeStore(STORAGE_KEYS.CONTACT_MESSAGES, [created, ...list]);
    return created;
  },

  markMessageRead(id: string): void {
    const next = this.getContactMessages().map((m) => (m.id === id ? { ...m, read: true } : m));
    writeStore(STORAGE_KEYS.CONTACT_MESSAGES, next);
  },

  // Notifications
  getNotifications(userId: string): AppNotification[] {
    ensureSeeded();
    return readStore<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []).filter(
      (n) => n.userId === userId || n.userId === 'all'
    );
  },

  pushNotification(payload: { userId: string; title: LocalizedText; message: LocalizedText; link?: string }): void {
    const list = readStore<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const created: AppNotification = {
      id: generateId('notif'),
      userId: payload.userId,
      title: payload.title,
      message: payload.message,
      link: payload.link,
      read: false,
      createdAt: new Date().toISOString(),
    };
    writeStore(STORAGE_KEYS.NOTIFICATIONS, [created, ...list]);
  },

  markAllNotificationsRead(userId: string): void {
    const list = readStore<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    writeStore(
      STORAGE_KEYS.NOTIFICATIONS,
      list.map((n) => (n.userId === userId || n.userId === 'all' ? { ...n, read: true } : n))
    );
  },

  // Student Progress
  getStudentProgress(userId: string): StudentProgress {
    ensureSeeded();
    return readStore<StudentProgress>(`${STORAGE_KEYS.PROGRESS_PREFIX}${userId}`, DEFAULT_PROGRESS);
  },

  updateStudentProgress(userId: string, updater: (prev: StudentProgress) => StudentProgress): StudentProgress {
    const prev = this.getStudentProgress(userId);
    const next = updater(prev);
    writeStore(`${STORAGE_KEYS.PROGRESS_PREFIX}${userId}`, next);
    return next;
  },

  toggleLessonComplete(userId: string, lessonId: string): StudentProgress {
    let wasAdded = false;
    const next = this.updateStudentProgress(userId, (prev) => {
      const exists = prev.completedLessonIds.includes(lessonId);
      wasAdded = !exists;
      return {
        ...prev,
        completedLessonIds: exists
          ? prev.completedLessonIds.filter((id) => id !== lessonId)
          : [...prev.completedLessonIds, lessonId],
      };
    });
    if (wasAdded) {
      authService.awardXpAndBadge(userId, 25, 'first_lesson');
    }
    return next;
  },
};
