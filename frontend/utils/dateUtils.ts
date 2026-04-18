import { Routine, InventoryItem } from '../types.ts';
export const getTodayStr = (): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};
export const isToday = (dateStr: string | null): boolean => {
  if (!dateStr) return false;
  const d1 = new Date(dateStr);
  const d2 = new Date();
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};
export const getDaysDifference = (date1Str: string, date2Str: string): number => {
  const d1 = new Date(date1Str);
  const d2 = new Date(date2Str);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
export const getDaysRemaining = (item: InventoryItem): number => {
  const opened = new Date(item.openedDate);
  opened.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysPassed = Math.floor((today.getTime() - opened.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, item.lifespanDays - daysPassed);
};
export const isRoutineDueOnDate = (routine: Routine, date: Date): boolean => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  if (routine.type === 'weekly' && routine.daysOfWeek) {
    return routine.daysOfWeek.includes(d.getDay());
  }
  if (routine.type === 'interval' && routine.intervalDays) {
    const start = new Date(routine.startDate);
    start.setHours(0, 0, 0, 0);
    if (d.getTime() < start.getTime()) return false;
    const daysSinceStart = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceStart % routine.intervalDays === 0;
  }
  return false;
};
export const isRoutineDueToday = (routine: Routine): boolean => {
  if (isToday(routine.lastCompleted)) {
    return false;  }
  return isRoutineDueOnDate(routine, new Date());
};
export const calculateNewStreak = (routine: Routine): number => {
  if (!routine.lastCompleted) return 1;
  const last = new Date(routine.lastCompleted);
  last.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (last.getTime() === today.getTime()) return routine.streak || 1;
  let missed = false;
  const checkDate = new Date(last);
  checkDate.setDate(checkDate.getDate() + 1);
  while (checkDate.getTime() < today.getTime()) {
    if (isRoutineDueOnDate(routine, checkDate)) {
      missed = true;
      break;
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }
  if (missed) return 1;
  return (routine.streak || 0) + 1;
};
export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
