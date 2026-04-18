import { useState, useEffect, useCallback } from 'react';
import { Routine, InventoryItem, ColorPalette, ThemeMode, Language, FocusSession, FontFamily } from '../types.ts';
import { getTodayStr, calculateNewStreak } from '../utils/dateUtils.ts';

const STORAGE_KEY = 'nexus_hud_data_v8';

interface AppData {
  routines: Routine[];
  inventory: InventoryItem[];
  focusHistory: FocusSession[];
  scratchpad: string;
  colorPalette: ColorPalette;
  mode: ThemeMode;
  language: Language;
  fontFamily: FontFamily;
  fontSizeScale: number;
}

const SEED_DATA: AppData = {
  routines: [
    {
      id: 'r1',
      name: 'Morning Vitamins',
      category: 'Medication/Healthcare',
      type: 'weekly',
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      startDate: getTodayStr(),
      lastCompleted: null,
      streak: 0,
      dosage: '1 Tablet',
      doctorNotes: 'Take with food'
    },
    {
      id: 'r2',
      name: 'Water Monstera',
      category: 'Plant Care',
      type: 'interval',
      intervalDays: 7,
      startDate: getTodayStr(),
      lastCompleted: null,
      streak: 0,
      lastWatered: getTodayStr(),
      wateringIntervalDays: 7
    }
  ],
  inventory: [
    {
      id: 'i1',
      name: 'Claro Vesta Lenses',
      category: 'Contact Lenses',
      brand: 'Claro',
      price: 45.00,
      purchaseDate: getTodayStr(),
      notes: 'Left eye: -2.00, Right eye: -2.25',
      openedDate: getTodayStr(),
      lifespanDays: 90
    },
    {
      id: 'i2',
      name: 'MacBook Pro M3',
      category: 'Electronics',
      brand: 'Apple',
      price: 1999.99,
      purchaseDate: getTodayStr(),
      notes: 'Space Black, 36GB RAM',
      openedDate: getTodayStr(),
      lifespanDays: 1460
    }
  ],
  focusHistory: [],
  scratchpad: '> SYSTEM READY.\n> Awaiting input...',
  colorPalette: 'black',
  mode: 'dark',
  language: 'en',
  fontFamily: 'system',
  fontSizeScale: 1.0
};

// Global state mechanism
let globalData: AppData = SEED_DATA;
let isLoadedGlobal = false;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach(l => l());
};

const setGlobalData = (updater: (prev: AppData) => AppData | AppData) => {
  globalData = typeof updater === 'function' ? updater(globalData) : updater;
  if (isLoadedGlobal) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalData));
  }
  notifyListeners();
};

const initStore = () => {
  if (isLoadedGlobal) return;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.scratchpad === undefined) parsed.scratchpad = SEED_DATA.scratchpad;
      if (parsed.colorPalette === undefined) parsed.colorPalette = SEED_DATA.colorPalette;
      if (parsed.mode === undefined) parsed.mode = SEED_DATA.mode;
      if (parsed.language === undefined) parsed.language = SEED_DATA.language;
      if (parsed.focusHistory === undefined) parsed.focusHistory = SEED_DATA.focusHistory;
      if (parsed.fontFamily === undefined) parsed.fontFamily = SEED_DATA.fontFamily;
      if (parsed.fontSizeScale === undefined) parsed.fontSizeScale = SEED_DATA.fontSizeScale;
      parsed.routines = parsed.routines.map((r: any) => ({ ...r, category: r.category || 'Other' }));
      parsed.inventory = parsed.inventory.map((i: any) => ({ ...i, category: i.category || 'Other' }));
      globalData = parsed;
    } catch (e) {
      console.error("Failed to parse stored data, using seed.", e);
      globalData = SEED_DATA;
    }
  } else {
    globalData = SEED_DATA;
  }
  isLoadedGlobal = true;
};

// Initialize right away
initStore();

export const useAppStore = () => {
  const [data, setData] = useState<AppData>(globalData);

  useEffect(() => {
    const listener = () => setData(globalData);
    listeners.add(listener);
    // Initial sync just in case
    setData(globalData);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const addRoutine = useCallback((routine: Omit<Routine, 'id'>) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      routines: [...prev.routines, { ...routine, id: crypto.randomUUID(), streak: 0 }]
    }));
  }, []);

  const updateRoutine = useCallback((id: string, updates: Partial<Routine>) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      routines: prev.routines.map(r => r.id === id ? { ...r, ...updates } : r)
    }));
  }, []);

  const deleteRoutine = useCallback((id: string) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      routines: prev.routines.filter(r => r.id !== id)
    }));
  }, []);

  const markRoutineDone = useCallback((id: string) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      routines: prev.routines.map(r => {
        if (r.id === id) {
          const newStreak = calculateNewStreak(r);
          return { ...r, lastCompleted: new Date().toISOString(), streak: newStreak };
        }
        return r;
      })
    }));
  }, []);

  const addInventory = useCallback((item: Omit<InventoryItem, 'id'>) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      inventory: [...prev.inventory, { ...item, id: crypto.randomUUID() }]
    }));
  }, []);

  const updateInventory = useCallback((id: string, updates: Partial<InventoryItem>) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      inventory: prev.inventory.map(i => i.id === id ? { ...i, ...updates } : i)
    }));
  }, []);

  const deleteInventory = useCallback((id: string) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      inventory: prev.inventory.filter(i => i.id !== id)
    }));
  }, []);

  const renewInventory = useCallback((id: string) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      inventory: prev.inventory.map(i =>
        i.id === id ? { ...i, openedDate: new Date().toISOString() } : i
      )
    }));
  }, []);

  const logFocusSession = useCallback((session: Omit<FocusSession, 'id' | 'date'>) => {
    setGlobalData((prev: AppData) => ({
      ...prev,
      focusHistory: [
        { ...session, id: crypto.randomUUID(), date: new Date().toISOString() },
        ...prev.focusHistory
      ]
    }));
  }, []);

  const setScratchpad = useCallback((text: string) => {
    setGlobalData((prev: AppData) => ({ ...prev, scratchpad: text }));
  }, []);

  const setColorPalette = useCallback((colorPalette: ColorPalette) => {
    setGlobalData((prev: AppData) => ({ ...prev, colorPalette }));
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    setGlobalData((prev: AppData) => ({ ...prev, mode }));
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setGlobalData((prev: AppData) => ({ ...prev, language }));
  }, []);

  const setFontFamily = useCallback((fontFamily: FontFamily) => {
    setGlobalData((prev: AppData) => ({ ...prev, fontFamily }));
  }, []);

  const setFontSizeScale = useCallback((fontSizeScale: number) => {
    setGlobalData((prev: AppData) => ({ ...prev, fontSizeScale }));
  }, []);

  const factoryReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setGlobalData(SEED_DATA);
  }, []);

  return {
    ...data,
    isLoaded: isLoadedGlobal,
    addRoutine,
    updateRoutine,
    deleteRoutine,
    markRoutineDone,
    addInventory,
    updateInventory,
    deleteInventory,
    renewInventory,
    logFocusSession,
    setScratchpad,
    setColorPalette,
    setMode,
    setLanguage,
    setFontFamily,
    setFontSizeScale,
    factoryReset
  };
};
