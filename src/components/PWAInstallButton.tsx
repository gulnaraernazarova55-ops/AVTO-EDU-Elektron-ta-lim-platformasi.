import React, { useState } from 'react';
import { Download, WifiOff } from 'lucide-react';
import { useT } from '../context/I18nContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Button, Modal } from './ui';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useT();
  const [showIosGuide, setShowIosGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <Button variant="outline" size="sm" onClick={install}>
        <Download className="w-3.5 h-3.5" />
        <span>{t.common.installApp}</span>
      </Button>
    );
  }

  if (isIOS) {
    return (
      <>
        <Button variant="outline" size="sm" onClick={() => setShowIosGuide(true)}>
          <Download className="w-3.5 h-3.5" />
          <span>{t.common.installIos}</span>
        </Button>
        <Modal open={showIosGuide} onClose={() => setShowIosGuide(false)} title={t.common.installIos} size="sm">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Safari: Share → Add to Home Screen.
          </p>
        </Modal>
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { t } = useT();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-medium text-white shadow-lg">
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>{t.common.offlineBanner}</span>
    </div>
  );
};
