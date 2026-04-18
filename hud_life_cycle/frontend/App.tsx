import React, { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore.ts';
import { ViewState } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import RoutineManager from './components/RoutineManager.tsx';
import InventoryManager from './components/InventoryManager.tsx';
import TimerPanel from './components/TimerPanel.tsx';
import FocusAnalytics from './components/FocusAnalytics.tsx';
import Settings from './components/Settings.tsx';
import Scratchpad from './components/Scratchpad.tsx';
import { BrandLogo } from './components/BrandLogo.tsx';
import { LayoutDashboard, Activity, Box, Terminal, FileText, Clock, Settings as SettingsIcon } from 'lucide-react';
import { t } from './locales.ts';
const App: React.FC = () => {
  const store = useAppStore();
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  useEffect(() => {
    if (!store.isLoaded) return;
    const root = document.documentElement;
    const body = document.body;
    if (store.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const themes = ['theme-cyan', 'theme-pink', 'theme-blue', 'theme-purple', 'theme-green', 'theme-red', 'theme-white', 'theme-black'];
    themes.forEach(theme => root.classList.remove(theme));
    root.classList.add(`theme-${store.colorPalette}`);
    root.style.setProperty('--font-scale', store.fontSizeScale.toString());
    const fontClasses = ['font-inter', 'font-jetbrains-mono', 'font-fira-code', 'font-space-grotesk', 'font-orbitron', 'font-system'];
    fontClasses.forEach(font => root.classList.remove(font));
    root.classList.add(`font-${store.fontFamily}`);
  }, [store.isLoaded, store.mode, store.colorPalette, store.fontSizeScale, store.fontFamily]);
  if (!store.isLoaded) {
    return (
      <div className="min-h-screen bg-hud-bg flex items-center justify-center text-hud-cyan font-mono">
        <Terminal className="animate-pulse mr-3" size={24} />
        <span className="tracking-widest">INITIALIZING SYSTEM...</span>
      </div>
    );
  }
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            routines={store.routines}
            inventory={store.inventory}
            onMarkRoutineDone={store.markRoutineDone}
            onRenewInventory={store.renewInventory}
          />
        );
      case 'routines':
        return (
          <RoutineManager
            routines={store.routines}
            onAdd={store.addRoutine}
            onDelete={store.deleteRoutine}
          />
        );
      case 'inventory':
        return (
          <InventoryManager
            inventory={store.inventory}
            onAdd={store.addInventory}
            onDelete={store.deleteInventory}
          />
        );
      case 'focus':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <TimerPanel />
            <FocusAnalytics />
          </div>
        );
      case 'settings':
        return <Settings />;
    }
  };
  const NavButton = ({ view, icon, label }: { view: ViewState, icon: React.ReactNode, label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setCurrentView(view)}
        className={`flex items-center justify-center md:justify-start gap-3 w-full px-5 py-3.5 text-sm font-bold uppercase tracking-widest transition-all md:border-l-4 border-t-4 md:border-t-0 ${
          isActive
            ? 'bg-hud-cyanDim text-hud-cyan border-hud-cyan shadow-[inset_0_4px_15px_rgba(var(--hud-primary-rgb),0.15)] md:shadow-[inset_4px_0_15px_rgba(var(--hud-primary-rgb),0.15)]'
            : 'text-hud-textMuted border-transparent hover:bg-hud-border/40 hover:text-hud-text'
        }`}
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </button>
    );
  };
  const fontMap: Record<string, string> = {
    'inter': 'font-inter',
    'jetbrains-mono': 'font-jetbrains-mono',
    'fira-code': 'font-fira-code',
    'space-grotesk': 'font-space-grotesk',
    'orbitron': 'font-orbitron',
    'system': 'font-system'
  };
  const fontClass = fontMap[store.fontFamily] || 'font-inter';
  return (
    <div className={`h-screen bg-hud-bg text-hud-text ${fontClass} flex flex-col md:flex-row overflow-hidden selection:bg-hud-cyan selection:text-hud-bg relative`}>
      {}
      <aside className="hidden md:flex w-72 bg-hud-panel/95 backdrop-blur-xl border-r border-hud-border/60 flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.15)]">
        <div className="p-6 border-b border-hud-border/50 flex items-center gap-4">
          <BrandLogo />
          <div>
            <h1 className="text-hud-cyan font-bold tracking-widest text-lg leading-tight">HUD</h1>
            <div className="text-[10px] text-hud-textMuted uppercase tracking-widest font-mono">Lifecycle OS</div>
          </div>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-1">
          <NavButton view="dashboard" icon={<LayoutDashboard size={18} />} label={t('dashboard', store.language)} />
          <NavButton view="focus" icon={<Clock size={18} />} label={t('focus', store.language)} />
          <NavButton view="routines" icon={<Activity size={18} />} label={t('routines', store.language)} />
          <NavButton view="inventory" icon={<Box size={18} />} label={t('inventory', store.language)} />
          <div className="my-4 border-t border-hud-border/40 mx-6"></div>
          <NavButton view="settings" icon={<SettingsIcon size={18} />} label={t('settings', store.language)} />
        </nav>
        <div className="p-5 border-t border-hud-border/50 text-[10px] text-hud-textMuted text-center uppercase tracking-widest font-mono">
          {t('systemOnline', store.language)}
        </div>
      </aside>
      {}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
             style={{ backgroundImage: 'linear-gradient(var(--hud-primary) 1px, transparent 1px), linear-gradient(90deg, var(--hud-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        {}
        <header className="w-full p-5 flex justify-between md:justify-end items-center z-10 relative">
          <div className="md:hidden flex items-center gap-3">
            <BrandLogo />
            <h1 className="text-hud-cyan font-bold tracking-widest text-lg leading-tight">HUD</h1>
          </div>
          <button
            onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border backdrop-blur-md ${
              isScratchpadOpen
                ? 'bg-hud-cyan text-hud-bg border-hud-cyan shadow-[0_0_20px_rgba(var(--hud-primary-rgb),0.5)]'
                : 'bg-hud-panel/60 text-hud-cyan border-hud-cyan/40 hover:bg-hud-cyanDim hover:border-hud-cyan'
            }`}
          >
            <FileText size={16} />
            <span className="hidden sm:inline">{t('scratchpad', store.language)}</span>
          </button>
        </header>
        {}
        <div className="flex-1 p-5 md:px-8 md:pb-8 overflow-y-auto relative z-0 custom-scrollbar pb-28 md:pb-8">
          <div className="h-full max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>
      </main>
      {}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-hud-panel/95 backdrop-blur-xl border-t border-hud-border/60 flex justify-around items-center z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
        <NavButton view="dashboard" icon={<LayoutDashboard size={20} />} label="" />
        <NavButton view="focus" icon={<Clock size={20} />} label="" />
        <NavButton view="routines" icon={<Activity size={20} />} label="" />
        <NavButton view="inventory" icon={<Box size={20} />} label="" />
        <NavButton view="settings" icon={<SettingsIcon size={20} />} label="" />
      </nav>
      {}
      <Scratchpad isOpen={isScratchpadOpen} onClose={() => setIsScratchpadOpen(false)} />
      {}
      {isScratchpadOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsScratchpadOpen(false)}
        />
      )}
    </div>
  );
};
export default App;
