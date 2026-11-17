import React, { useEffect, useState } from 'react';
import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  User as UserIcon,
  X,
} from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useT } from '../context/I18nContext';
import { useTheme } from '../context/ThemeContext';
import { contentService } from '../services/contentService';
import { Language } from '../types';
import { AvtoAiWidget } from './AvtoAiWidget';
import { CommandPalette } from './CommandPalette';
import { OfflineIndicator, PWAInstallButton } from './PWAInstallButton';
import { BrandLogo, Button } from './ui';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, setLang, t } = useT();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(() =>
    user ? contentService.getNotifications(user.id) : []
  );

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    setNotifications(user ? contentService.getNotifications(user.id) : []);
  }, [user, location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/videos', label: t.nav.videos },
    { to: '/ebooks', label: t.nav.ebooks },
    { to: '/presentations', label: t.nav.presentations },
    { to: '/tests', label: t.nav.tests },
    { to: '/practical', label: t.nav.practical },
  ];

  const cabinetPath = user?.role === 'teacher' ? '/teacher' : '/student';
  const cabinetLabel = user?.role === 'teacher' ? t.nav.teacherCabinet : t.nav.studentCabinet;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand */}
          <Link to="/" className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg">
            <BrandLogo />
          </Link>

          {/* Zone 2: Primary navigation */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                    isActive
                      ? 'border-orange-600 text-slate-950 dark:text-white dark:border-amber-500'
                      : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Controls & Account */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t.common.search}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Ctrl+K"
            >
              <Search className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-0.5">
              {(['uz', 'ru', 'en'] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    lang === code
                      ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifOpen((v) => !v)}
                  aria-label={t.student.notificationsTitle}
                  className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-600" />
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">
                        {t.student.notificationsTitle}
                      </span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            contentService.markAllNotificationsRead(user.id);
                            setNotifications(contentService.getNotifications(user.id));
                          }}
                          className="text-xs text-orange-600 dark:text-amber-400 hover:underline cursor-pointer"
                        >
                          {t.student.markAllRead}
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 py-4 text-center">{t.common.noData}</p>
                      ) : (
                        notifications.slice(0, 6).map((n) => (
                          <button
                            key={n.id}
                            type="button"
                            onClick={() => {
                              if (n.link) navigate(n.link);
                              setNotifOpen(false);
                            }}
                            className={`w-full text-left p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                              n.read
                                ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                                : 'bg-orange-50/70 dark:bg-orange-950/30 text-slate-900 dark:text-slate-100'
                            }`}
                          >
                            <p className="font-semibold">{n.title[lang]}</p>
                            <p className="mt-0.5 text-slate-500 dark:text-slate-400">{n.message[lang]}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to={cabinetPath}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5" />
                  )}
                  <span className="max-w-28 truncate">{cabinetLabel}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  aria-label={t.nav.logout}
                  title={t.nav.logout}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:inline-flex">
                <Button size="sm" variant="primary">
                  {t.nav.login}
                </Button>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-0.5">
                {(['uz', 'ru', 'en'] as Language[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer ${
                      lang === code
                        ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-400'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
              <PWAInstallButton />
            </div>

            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-amber-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/verify-certificate"
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {t.nav.verifyCert}
              </NavLink>
            </nav>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              {user ? (
                <>
                  <Link to={cabinetPath} className="flex-1">
                    <Button className="w-full" size="sm">
                      {cabinetLabel}
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    {t.nav.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex-1">
                    <Button className="w-full" size="sm">
                      {t.nav.login}
                    </Button>
                  </Link>
                  <Link to="/register" className="flex-1">
                    <Button className="w-full" size="sm" variant="outline">
                      {t.nav.register}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <BrandLogo />
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.footer.tagline}
            </p>
            <PWAInstallButton />
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-3">
              {t.footer.platform}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/videos" className="hover:text-orange-600 dark:hover:text-amber-400">{t.nav.videos}</Link></li>
              <li><Link to="/ebooks" className="hover:text-orange-600 dark:hover:text-amber-400">{t.nav.ebooks}</Link></li>
              <li><Link to="/presentations" className="hover:text-orange-600 dark:hover:text-amber-400">{t.nav.presentations}</Link></li>
              <li><Link to="/tests" className="hover:text-orange-600 dark:hover:text-amber-400">{t.nav.tests}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-3">
              {t.footer.tools}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/practical?tab=obd" className="hover:text-orange-600 dark:hover:text-amber-400">{t.practical.tabs.obd}</Link></li>
              <li><Link to="/practical?tab=simulator" className="hover:text-orange-600 dark:hover:text-amber-400">{t.practical.tabs.simulator}</Link></li>
              <li><Link to="/practical?tab=maintenance" className="hover:text-orange-600 dark:hover:text-amber-400">{t.practical.tabs.maintenance}</Link></li>
              <li><Link to="/verify-certificate" className="hover:text-orange-600 dark:hover:text-amber-400">{t.nav.verifyCert}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white mb-3">
              {t.footer.contact}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Tashkent, Amir Temur Ave 108</li>
              <li>info@avtoedu.uz</li>
              <li className="tabular-nums">+998 (71) 200-45-90</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 py-4 px-4 sm:px-6 text-center text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} AVTO EDU. {t.footer.rights}
        </div>
      </footer>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AvtoAiWidget />
      <OfflineIndicator />
    </div>
  );
};
