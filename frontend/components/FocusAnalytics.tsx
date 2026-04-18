import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore.ts';
import { Panel } from './ui/HUDComponents.tsx';
import { BarChart2, Clock, Calendar } from 'lucide-react';
import { t } from '../locales.ts';
import { formatDate } from '../utils/dateUtils.ts';
const FocusAnalytics: React.FC = () => {
  const { language, focusHistory } = useAppStore();
  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = now.toDateString();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let todayMinutes = 0;
    let monthMinutes = 0;
    focusHistory.forEach(session => {
      const d = new Date(session.date);
      if (d.toDateString() === todayStr) {
        todayMinutes += session.durationMinutes;
      }
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        monthMinutes += session.durationMinutes;
      }
    });
    return { todayMinutes, monthMinutes };
  }, [focusHistory]);
  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}${t('hours', language)} ${m}${t('minutes', language)}`;
    return `${m} ${t('minutes', language)}`;
  };
  return (
    <Panel title={t('focusAnalytics', language)} icon={<BarChart2 size={16} />} className="h-full">
      <div className="flex flex-col gap-6 h-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-hud-panel border border-hud-border rounded p-4 flex flex-col items-center justify-center text-center">
            <Clock size={20} className="text-hud-cyan mb-2" />
            <div className="text-xs text-hud-textMuted uppercase tracking-widest mb-1">{t('todayFocus', language)}</div>
            <div className="text-xl font-bold text-hud-text">{formatDuration(stats.todayMinutes)}</div>
          </div>
          <div className="bg-hud-panel border border-hud-border rounded p-4 flex flex-col items-center justify-center text-center">
            <Calendar size={20} className="text-hud-cyan mb-2" />
            <div className="text-xs text-hud-textMuted uppercase tracking-widest mb-1">{t('monthFocus', language)}</div>
            <div className="text-xl font-bold text-hud-text">{formatDuration(stats.monthMinutes)}</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-xs text-hud-textMuted uppercase tracking-widest mb-3 border-b border-hud-border/50 pb-2">
            {t('recentSessions', language)}
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {focusHistory.length === 0 ? (
              <div className="text-sm text-hud-textMuted italic text-center py-8">
                {t('noSessions', language)}
              </div>
            ) : (
              <ul className="space-y-2">
                {focusHistory.slice(0, 10).map(session => (
                  <li key={session.id} className="flex items-center justify-between bg-black/20 p-3 rounded border border-hud-border/30">
                    <div>
                      <div className="text-sm font-medium text-hud-text capitalize">
                        {session.type === 'pomodoro' ? t('pomodoro', language) : session.type === 'deepWork' ? t('deepWork', language) : 'Custom'}
                      </div>
                      <div className="text-xs text-hud-textMuted mt-0.5">
                        {formatDate(session.date)}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-hud-cyan">
                      {session.durationMinutes} {t('minutes', language)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
};
export default FocusAnalytics;
