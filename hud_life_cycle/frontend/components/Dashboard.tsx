import React, { useMemo } from 'react';
import { Routine, InventoryItem } from '../types.ts';
import { isRoutineDueToday, getDaysRemaining } from '../utils/dateUtils.ts';
import { Panel, Button } from './ui/HUDComponents.tsx';
import { CheckCircle, RefreshCw, AlertTriangle, Activity, Flame, BarChart2, HeartPulse, Leaf, Clock, DollarSign } from 'lucide-react';
import { useAppStore } from '../store/useAppStore.ts';
import { t } from '../locales.ts';
import { BrandLogo } from './BrandLogo.tsx';
interface DashboardProps {
  routines: Routine[];
  inventory: InventoryItem[];
  onMarkRoutineDone: (id: string) => void;
  onRenewInventory: (id: string) => void;
}
const Dashboard: React.FC<DashboardProps> = ({ routines, inventory, onMarkRoutineDone, onRenewInventory }) => {
  const { language, focusHistory } = useAppStore();
  const dueRoutines = useMemo(() => routines.filter(isRoutineDueToday), [routines]);
  const expiringInventory = useMemo(() => {
    return inventory.map(item => ({
      ...item,
      daysRemaining: getDaysRemaining(item)
    }))
    .filter(i => i.daysRemaining <= 7)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, [inventory]);
  const analytics = useMemo(() => {
    const todayStr = new Date().toDateString();
    const todayFocusMinutes = focusHistory
      .filter(s => new Date(s.date).toDateString() === todayStr)
      .reduce((acc, curr) => acc + curr.durationMinutes, 0);
    const medRoutines = routines.filter(r => r.category === 'Medication/Healthcare');
    const avgMedStreak = medRoutines.length > 0
      ? Math.round(medRoutines.reduce((acc, r) => acc + (r.streak || 0), 0) / medRoutines.length)
      : 0;
    const plantRoutines = routines.filter(r => r.category === 'Plant Care');
    const plantsNeedingCare = plantRoutines.filter(isRoutineDueToday).length;
    const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.price || 0), 0);
    return {
      todayFocusMinutes,
      avgMedStreak,
      plantsNeedingCare,
      hasMeds: medRoutines.length > 0,
      hasPlants: plantRoutines.length > 0,
      totalInventoryValue
    };
  }, [focusHistory, routines, inventory]);
  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col gap-6">
      {}
      <div className="flex justify-between items-center bg-hud-panel/50 backdrop-blur-md border border-hud-border/50 p-4 rounded-xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-hud-cyan tracking-widest uppercase">{t('dashboard', language)}</h2>
          <p className="text-xs text-hud-textMuted mt-1">{new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="hidden md:block">
          <BrandLogo />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Panel title={t('actionRequired', language)} icon={<AlertTriangle size={16} />} className="flex-1 border-hud-alert/30 shadow-[0_0_15px_rgba(255,0,60,0.05)]">
            <div className="mb-8">
              <h3 className="text-xs text-hud-textMuted uppercase tracking-widest mb-4 border-b border-hud-border/50 pb-2">
                {t('scheduledRoutines', language)}
              </h3>
              {dueRoutines.length === 0 ? (
                <div className="text-sm text-hud-textMuted italic flex items-center gap-2 bg-black/10 p-4 rounded-lg border border-hud-border/30">
                  <CheckCircle size={16} className="text-green-500" /> {t('allDone', language)}
                </div>
              ) : (
                <ul className="space-y-3">
                  {dueRoutines.map(routine => (
                    <li key={routine.id} className="flex items-center justify-between bg-black/20 p-4 rounded-lg border border-hud-border/50 hover:border-hud-cyan/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <Activity size={18} className="text-hud-cyan" />
                        <div>
                          <div className="text-base font-medium text-hud-text">{routine.name}</div>
                          {routine.streak !== undefined && routine.streak > 0 && (
                            <div className="text-[10px] text-orange-400 flex items-center gap-1 mt-1 font-bold tracking-wider">
                              <Flame size={12} /> {t('streak', language)}: {routine.streak}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="primary" onClick={() => onMarkRoutineDone(routine.id)}>
                        <CheckCircle size={16} /> {t('done', language)}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="text-xs text-hud-textMuted uppercase tracking-widest mb-4 border-b border-hud-border/50 pb-2">
                {t('expiringSoon', language)}
              </h3>
              {expiringInventory.length === 0 ? (
                <div className="text-sm text-hud-textMuted italic bg-black/10 p-4 rounded-lg border border-hud-border/30">
                  {t('noExpiring', language)}
                </div>
              ) : (
                <ul className="space-y-3">
                  {expiringInventory.map(item => (
                    <li key={item.id} className="flex items-center justify-between bg-hud-alertDim/20 p-4 rounded-lg border border-hud-alert/30">
                      <div>
                        <div className="text-base font-medium text-hud-alert flex items-center gap-2">
                          <AlertTriangle size={16} /> {item.name}
                        </div>
                        <div className="text-sm text-hud-textMuted mt-1">
                          {item.daysRemaining} {t('daysRemaining', language)}
                        </div>
                      </div>
                      <Button variant="danger" onClick={() => onRenewInventory(item.id)}>
                        <RefreshCw size={16} /> {t('renew', language)}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>
        </div>
        {}
        <div className="flex flex-col gap-6">
          <Panel title={t('analyticsSummary', language)} icon={<BarChart2 size={16} />} className="flex-1">
            <div className="space-y-6">
              {}
              <div className="bg-black/10 p-4 rounded-lg border border-hud-border/40 flex items-center gap-4">
                <div className="p-3 bg-hud-cyanDim rounded-full text-hud-cyan">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-xs text-hud-textMuted uppercase tracking-widest">{t('todayFocus', language)}</div>
                  <div className="text-xl font-bold text-hud-text font-mono">{analytics.todayFocusMinutes} {t('minutes', language)}</div>
                </div>
              </div>
              {}
              <div className="bg-black/10 p-4 rounded-lg border border-hud-border/40 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                  <DollarSign size={20} />
                </div>
                <div>
                  <div className="text-xs text-hud-textMuted uppercase tracking-widest">{t('totalValue', language)}</div>
                  <div className="text-xl font-bold text-hud-text font-mono">${analytics.totalInventoryValue.toFixed(2)}</div>
                </div>
              </div>
              {}
              {analytics.hasMeds && (
                <div className="bg-black/10 p-4 rounded-lg border border-hud-border/40 flex items-center gap-4">
                  <div className="p-3 bg-pink-500/10 rounded-full text-pink-500">
                    <HeartPulse size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-hud-textMuted uppercase tracking-widest">{t('medCompliance', language)}</div>
                    <div className="text-lg font-bold text-hud-text flex items-center gap-2">
                      {analytics.avgMedStreak} {t('days', language)} <span className="text-[10px] font-normal text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">{t('activeStreak', language)}</span>
                    </div>
                  </div>
                </div>
              )}
              {}
              {analytics.hasPlants && (
                <div className="bg-black/10 p-4 rounded-lg border border-hud-border/40 flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-hud-textMuted uppercase tracking-widest">{t('plantCareHistory', language)}</div>
                    <div className={`text-sm font-bold mt-1 ${analytics.plantsNeedingCare > 0 ? 'text-hud-alert' : 'text-green-500'}`}>
                      {analytics.plantsNeedingCare > 0 ? `${analytics.plantsNeedingCare} ${t('needsAttention', language)}` : t('upToDate', language)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
