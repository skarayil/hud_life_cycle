import React, { useState, useEffect } from 'react';
import { Panel, Button, Input } from './ui/HUDComponents.tsx';
import { Play, Pause, RotateCcw, Clock, Zap } from 'lucide-react';
import { useAppStore } from '../store/useAppStore.ts';
import { t } from '../locales.ts';
const TimerPanel: React.FC = () => {
  const { language, logFocusSession } = useAppStore();
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [customMinutesStr, setCustomMinutesStr] = useState<string>('');
  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      logFocusSession({
        durationMinutes: totalTime / 60,
        type: totalTime === 25 * 60 ? 'pomodoro' : totalTime === 50 * 60 ? 'deepWork' : 'custom'
      });
    }
    return () => window.clearInterval(interval);
  }, [isActive, timeLeft, totalTime, logFocusSession]);
  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
  };
  const setMode = (minutes: number) => {
    setIsActive(false);
    setTotalTime(minutes * 60);
    setTimeLeft(minutes * 60);
  };
  const handleSetCustom = () => {
    const mins = parseInt(customMinutesStr, 10);
    if (!isNaN(mins) && mins > 0) {
      setMode(mins);
      setCustomMinutesStr('');
    }
  };
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;
  const isCustomValid = customMinutesStr.trim() !== '' && !isNaN(parseInt(customMinutesStr, 10)) && parseInt(customMinutesStr, 10) > 0;
  return (
    <Panel title={t('timerTitle', language)} icon={<Clock size={16} />} className="h-full flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative flex items-center justify-center mb-10">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-hud-border/40"
            />
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-hud-cyan transition-all duration-1000 ease-linear"
              style={{ filter: 'drop-shadow(0 0 8px var(--hud-primary))' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-hud-text tracking-widest" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="flex gap-4 mb-8 w-full justify-center">
          <Button variant={isActive ? 'danger' : 'primary'} onClick={toggleTimer} className="w-32 py-3 text-sm">
            {isActive ? <><Pause size={16} /> {t('pause', language)}</> : <><Play size={16} /> {t('start', language)}</>}
          </Button>
          <Button variant="ghost" onClick={resetTimer} className="w-32 py-3 text-sm border-hud-border/50">
            <RotateCcw size={16} /> {t('reset', language)}
          </Button>
        </div>
        <div className="flex gap-3 w-full max-w-md">
          <Button variant="ghost" onClick={() => setMode(25)} className={`flex-1 py-3 text-xs ${totalTime === 25 * 60 ? 'bg-hud-cyanDim text-hud-cyan border-hud-cyan/50' : 'border-hud-border/30'}`}>
            {t('pomodoro', language)}
          </Button>
          <Button variant="ghost" onClick={() => setMode(50)} className={`flex-1 py-3 text-xs ${totalTime === 50 * 60 ? 'bg-hud-cyanDim text-hud-cyan border-hud-cyan/50' : 'border-hud-border/30'}`}>
            <Zap size={14} className="mr-2" /> {t('deepWork', language)}
          </Button>
        </div>
        <div className="flex gap-2 w-full max-w-md mt-4">
          <Input
            type="number"
            min="1"
            value={customMinutesStr}
            onChange={e => setCustomMinutesStr(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && isCustomValid) handleSetCustom(); }}
            placeholder={t('customDuration', language)}
            className="flex-1 py-2.5 text-sm"
          />
          <Button
            variant="ghost"
            onClick={handleSetCustom}
            disabled={!isCustomValid}
            className="border-hud-border/40 px-6"
          >
            {t('set', language)}
          </Button>
        </div>
      </div>
    </Panel>
  );
};
export default TimerPanel;
