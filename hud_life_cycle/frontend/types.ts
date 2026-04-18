export type RoutineType = 'weekly' | 'interval';
export type RoutineCategory = 'Work' | 'Daily Life' | 'Skincare' | 'Nutrition' | 'Fitness' | 'Medication/Healthcare' | 'Hospital/Doctor' | 'Plant Care' | 'Homework/Education' | 'Grooming' | 'Other';
export type InventoryCategory = 'Clothing/Fashion' | 'Contact Lenses' | 'Skincare' | 'Electronics' | 'Groceries' | 'Medical/Meds' | 'Subscriptions' | 'Household' | 'Other';
export interface Routine {
  id: string;
  name: string;
  category: RoutineCategory;
  type: RoutineType;
  daysOfWeek?: number[];
  intervalDays?: number;
  startDate: string;
  lastCompleted: string | null;
  streak?: number;
  dosage?: string;
  doctorNotes?: string;
  priority?: 'High' | 'Medium' | 'Low';
  deadline?: string;
  lastWatered?: string;
  wateringIntervalDays?: number;
}
export interface InventoryItem {
  id: string;
  name: string;
  category: InventoryCategory;
  openedDate: string;
  lifespanDays: number;
  brand?: string;
  price?: number;
  purchaseDate?: string;
  notes?: string;
}
export interface FocusSession {
  id: string;
  date: string;
  durationMinutes: number;
  type: 'pomodoro' | 'deepWork' | 'custom';
}
export type ViewState = 'dashboard' | 'routines' | 'inventory' | 'focus' | 'settings';
export type ColorPalette = 'cyan' | 'pink' | 'blue' | 'purple' | 'green' | 'red' | 'white' | 'black';
export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'tr';
export type FontFamily = 'inter' | 'jetbrains-mono' | 'space-grotesk' | 'orbitron' | 'system';
