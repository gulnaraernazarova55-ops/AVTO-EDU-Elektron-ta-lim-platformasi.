import React, { useState } from 'react';
import { KeyRound, UserPlus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Input, Select } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const { t } = useT();
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  usePageMeta(t.auth.loginTitle);

  const stateMsg = (location.state as { message?: string; from?: string } | null)?.message;
  const fromPath = (location.state as { from?: string } | null)?.from;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = t.common.invalidEmail;
    if (password.length < 6) errs.password = t.common.passwordShort;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const res = login(email, password, rememberMe);
    if (!res.ok) {
      setFormError(t.auth.invalidCredentials);
      return;
    }
    showToast(t.auth.welcomeBack, 'success');
    const target = fromPath || (email.trim().toLowerCase() === 'teacher@avtoedu.uz' ? '/teacher' : '/student');
    navigate(target, { replace: true });
  };

  const fillDemo = (role: 'student' | 'teacher') => {
    setErrors({});
    setFormError('');
    if (role === 'student') {
      setEmail('student@avtoedu.uz');
      setPassword('Student123');
    } else {
      setEmail('teacher@avtoedu.uz');
      setPassword('Teacher123');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <Card className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {t.auth.loginTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t.auth.loginSubtitle}</p>
        </div>

        {stateMsg && (
          <div className="rounded-lg border border-amber-500/40 bg-amber-50 dark:bg-amber-950/30 px-3.5 py-2.5 text-xs text-amber-800 dark:text-amber-300">
            {stateMsg}
          </div>
        )}

        {formError && (
          <div className="rounded-lg border border-red-500/40 bg-red-50 dark:bg-red-950/30 px-3.5 py-2.5 text-xs text-red-700 dark:text-red-300">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label={t.auth.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="student@avtoedu.uz"
          />
          <Input
            label={t.auth.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••"
          />
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <span>{t.auth.rememberMe}</span>
          </label>
          <Button type="submit" className="w-full" variant="primary">
            <KeyRound className="w-4 h-4" />
            <span>{t.auth.signIn}</span>
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t.auth.demoTitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button size="sm" variant="outline" onClick={() => fillDemo('student')}>
              {t.auth.fillStudentDemo}
            </Button>
            <Button size="sm" variant="outline" onClick={() => fillDemo('teacher')}>
              {t.auth.fillTeacherDemo}
            </Button>
          </div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 space-y-1">
            <p>student@avtoedu.uz / Student123</p>
            <p>teacher@avtoedu.uz / Teacher123</p>
          </div>
        </div>

        <p className="text-sm text-center text-slate-600 dark:text-slate-400">
          {t.auth.noAccount}{' '}
          <Link to="/register" className="text-orange-600 dark:text-amber-400 font-medium hover:underline">
            {t.nav.register}
          </Link>
        </p>
      </Card>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { t } = useT();
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  usePageMeta(t.auth.registerTitle);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t.common.requiredField;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = t.common.invalidEmail;
    if (password.length < 6) errs.password = t.common.passwordShort;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const res = register({ name, email, password, role });
    if (!res.ok) {
      setFormError(t.auth.emailExists);
      return;
    }

    showToast(t.auth.welcomeBack, 'success');
    navigate(role === 'teacher' ? '/teacher' : '/student', { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <Card className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {t.auth.registerTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t.auth.registerSubtitle}</p>
        </div>

        {formError && (
          <div className="rounded-lg border border-red-500/40 bg-red-50 dark:bg-red-950/30 px-3.5 py-2.5 text-xs text-red-700 dark:text-red-300">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label={t.auth.fullName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <Input
            label={t.auth.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label={t.auth.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Select
            label={t.auth.role}
            value={role}
            onChange={(e) => setRole(e.target.value as 'student' | 'teacher')}
          >
            <option value="student">{t.auth.roleStudent}</option>
            <option value="teacher">{t.auth.roleTeacher}</option>
          </Select>

          <Button type="submit" className="w-full" variant="primary">
            <UserPlus className="w-4 h-4" />
            <span>{t.auth.signUp}</span>
          </Button>
        </form>

        <p className="text-sm text-center text-slate-600 dark:text-slate-400">
          {t.auth.haveAccount}{' '}
          <Link to="/login" className="text-orange-600 dark:text-amber-400 font-medium hover:underline">
            {t.nav.login}
          </Link>
        </p>
      </Card>
    </div>
  );
};
