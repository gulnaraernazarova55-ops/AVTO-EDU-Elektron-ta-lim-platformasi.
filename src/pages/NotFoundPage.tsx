import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { usePageMeta, useT } from '../context/I18nContext';

export const NotFoundPage: React.FC = () => {
  const { t } = useT();
  usePageMeta(t.notFound.title);

  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      <Card className="text-center space-y-4">
        <p className="font-mono text-4xl font-bold text-orange-600 dark:text-amber-400">404</p>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {t.notFound.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">{t.notFound.desc}</p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary">{t.notFound.goHome}</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
