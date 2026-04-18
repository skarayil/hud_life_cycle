import React, { useState, useMemo } from 'react';
import { Routine, RoutineType, RoutineCategory } from '../types.ts';
import { Panel, Button, Input, Select, Label } from './ui/HUDComponents.tsx';
import { Plus, Trash2, Save, X, Flame } from 'lucide-react';
import { getTodayStr } from '../utils/dateUtils.ts';
import { useAppStore } from '../store/useAppStore.ts';
import { t } from '../locales.ts';
interface RoutineManagerProps {
  routines: Routine[];
  onAdd: (routine: Omit<Routine, 'id'>) => void;
  onDelete: (id: string) => void;
}
const CATEGORIES: RoutineCategory[] = ['Work', 'Daily Life', 'Skincare', 'Nutrition', 'Fitness', 'Medication/Healthcare', 'Hospital/Doctor', 'Plant Care', 'Homework/Education', 'Grooming', 'Other'];
const RoutineManager: React.FC<RoutineManagerProps> = ({ routines, onAdd, onDelete }) => {
  const { language } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<RoutineCategory>('Daily Life');
  const [type, setType] = useState<RoutineType>('weekly');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [intervalDays, setIntervalDays] = useState<number>(3);
  const [filterCategory, setFilterCategory] = useState<RoutineCategory | 'All'>('All');
  const [dosage, setDosage] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [deadline, setDeadline] = useState('');
  const [wateringIntervalDays, setWateringIntervalDays] = useState<number>(7);
  const daysOfWeekKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
  const handleToggleDay = (dayIdx: number) => {
    setSelectedDays(prev =>
      prev.includes(dayIdx) ? prev.filter(d => d !== dayIdx) : [...prev, dayIdx]
    );
  };
  const handleSave = () => {
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      category,
      type,
      daysOfWeek: type === 'weekly' ? selectedDays : undefined,
      intervalDays: type === 'interval' ? intervalDays : undefined,
      startDate: getTodayStr(),
      lastCompleted: null,
      streak: 0,
      dosage: category === 'Medication/Healthcare' ? dosage.trim() : undefined,
      doctorNotes: category === 'Medication/Healthcare' || category === 'Hospital/Doctor' ? doctorNotes.trim() : undefined,
      priority: category === 'Homework/Education' || category === 'Work' ? priority : undefined,
      deadline: (category === 'Homework/Education' || category === 'Work') && deadline ? new Date(deadline).toISOString() : undefined,
      wateringIntervalDays: category === 'Plant Care' ? wateringIntervalDays : undefined,
      lastWatered: category === 'Plant Care' ? getTodayStr() : undefined
    });
    setName('');
    setCategory('Daily Life');
    setType('weekly');
    setSelectedDays([]);
    setIntervalDays(3);
    setDosage('');
    setDoctorNotes('');
    setPriority('Medium');
    setDeadline('');
    setWateringIntervalDays(7);
    setIsAdding(false);
  };
  const filteredRoutines = useMemo(() => {
    if (filterCategory === 'All') return routines;
    return routines.filter(r => r.category === filterCategory);
  }, [routines, filterCategory]);
  const getCategoryTranslation = (cat: string) => {
    const map: Record<string, any> = {
      'Work': 'catWork', 'Daily Life': 'catDailyLife', 'Skincare': 'catSkincare',
      'Nutrition': 'catNutrition', 'Fitness': 'catFitness', 'Medication/Healthcare': 'catMedication',
      'Hospital/Doctor': 'catHospital', 'Plant Care': 'catPlantCare', 'Homework/Education': 'catHomework',
      'Grooming': 'catGrooming', 'Other': 'catOther', 'All': 'all'
    };
    return t(map[cat], language);
  };
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-hud-cyan font-bold tracking-widest uppercase">{t('routineConfig', language)}</h2>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus size={16} /> {t('newRoutine', language)}
          </Button>
        )}
      </div>
      {isAdding && (
        <Panel className="border-hud-cyan/50 shadow-[0_0_15px_rgba(var(--hud-primary-rgb),0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>{t('routineName', language)}</Label>
              <Input value={name} onChange={e => setName(e.target.value)} autoFocus />
            </div>
            <div>
              <Label>{t('category', language)}</Label>
              <Select value={category} onChange={e => setCategory(e.target.value as RoutineCategory)}>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{getCategoryTranslation(cat)}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label>{t('scheduleType', language)}</Label>
              <Select value={type} onChange={e => setType(e.target.value as RoutineType)}>
                <option value="weekly">{t('specificDays', language)}</option>
                <option value="interval">{t('everyXDays', language)}</option>
              </Select>
            </div>
            {}
            {category === 'Medication/Healthcare' && (
              <>
                <div>
                  <Label>{t('dosage', language)}</Label>
                  <Input value={dosage} onChange={e => setDosage(e.target.value)} placeholder="e.g., 1 Tablet" />
                </div>
                <div className="md:col-span-2">
                  <Label>{t('doctorNotes', language)}</Label>
                  <Input value={doctorNotes} onChange={e => setDoctorNotes(e.target.value)} placeholder="e.g., Take with food" />
                </div>
              </>
            )}
            {(category === 'Homework/Education' || category === 'Work') && (
              <>
                <div>
                  <Label>{t('priority', language)}</Label>
                  <Select value={priority} onChange={e => setPriority(e.target.value as any)}>
                    <option value="High">{t('high', language)}</option>
                    <option value="Medium">{t('medium', language)}</option>
                    <option value="Low">{t('low', language)}</option>
                  </Select>
                </div>
                <div>
                  <Label>{t('deadline', language)}</Label>
                  <Input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
                </div>
              </>
            )}
            {category === 'Plant Care' && (
              <div>
                <Label>{t('wateringInterval', language)}</Label>
                <Input type="number" min="1" value={wateringIntervalDays} onChange={e => setWateringIntervalDays(parseInt(e.target.value) || 1)} />
              </div>
            )}
          </div>
          {type === 'weekly' ? (
            <div className="mb-4">
              <Label>{t('selectDays', language)}</Label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeekKeys.map((dayKey, idx) => (
                  <button
                    key={dayKey}
                    onClick={() => handleToggleDay(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors border ${
                      selectedDays.includes(idx)
                        ? 'bg-hud-cyan text-hud-bg border-hud-cyan shadow-[0_0_10px_rgba(var(--hud-primary-rgb),0.5)]'
                        : 'bg-black/10 text-hud-textMuted border-hud-border hover:border-hud-cyan/50'
                    }`}
                  >
                    {t(dayKey, language)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <Label>{t('intervalDays', language)}</Label>
              <Input
                type="number"
                min="1"
                value={intervalDays}
                onChange={e => setIntervalDays(parseInt(e.target.value) || 1)}
              />
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-hud-border/50">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              <X size={16} /> {t('cancel', language)}
            </Button>
            <Button onClick={handleSave} disabled={!name.trim() || (type === 'weekly' && selectedDays.length === 0)}>
              <Save size={16} /> {t('saveRoutine', language)}
            </Button>
          </div>
        </Panel>
      )}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-colors border ${
              filterCategory === cat
                ? 'bg-hud-cyanDim text-hud-cyan border-hud-cyan'
                : 'bg-transparent text-hud-textMuted border-hud-border hover:border-hud-cyan/50'
            }`}
          >
            {getCategoryTranslation(cat)}
          </button>
        ))}
      </div>
      <Panel className="flex-1">
        {filteredRoutines.length === 0 ? (
          <div className="text-center text-hud-textMuted py-10 italic">{t('noRoutines', language)}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRoutines.map(routine => (
              <div key={routine.id} className="bg-hud-panel border border-hud-border rounded-xl p-5 flex flex-col justify-between group hover:border-hud-cyan/40 transition-colors relative overflow-hidden shadow-sm">
                {routine.streak !== undefined && routine.streak > 0 && (
                  <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
                    <Flame size={100} className="text-orange-500" />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-hud-text font-bold text-base">{routine.name}</h3>
                    {routine.streak !== undefined && routine.streak > 0 && (
                      <div className="flex items-center gap-1 text-orange-400 text-xs font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                        <Flame size={12} /> {routine.streak}
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-hud-cyan uppercase tracking-widest mb-3">
                    {getCategoryTranslation(routine.category)}
                  </div>
                  {}
                  {routine.dosage && <div className="text-xs text-hud-textMuted mb-1"><span className="font-bold">{t('dosage', language)}:</span> {routine.dosage}</div>}
                  {routine.priority && <div className="text-xs text-hud-textMuted mb-1"><span className="font-bold">{t('priority', language)}:</span> {t(routine.priority.toLowerCase() as any, language)}</div>}
                  <div className="text-xs text-hud-textMuted mb-4 mt-2">
                    {routine.type === 'weekly'
                      ? `${t('weekly', language)}: ${routine.daysOfWeek?.map(d => t(daysOfWeekKeys[d], language)).join(', ')}`
                      : `${t('interval', language)}: ${t('every', language)} ${routine.intervalDays} ${t('days', language)}`
                    }
                  </div>
                </div>
                <div className="flex justify-end relative z-10">
                  <Button variant="danger" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onDelete(routine.id)}>
                    <Trash2 size={14} /> {t('delete', language)}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
};
export default RoutineManager;
