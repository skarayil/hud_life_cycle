import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore.ts';
import { FileText } from 'lucide-react';
import { t } from '../locales.ts';
interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}
const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const store = useAppStore();
  const [text, setText] = useState(store.scratchpad);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    setIsSaving(true);
    const timeout = setTimeout(() => {
      store.setScratchpad(text);
      setIsSaving(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [text, store]);
  useEffect(() => {
    if (!isSaving && store.scratchpad !== text) {
      setText(store.scratchpad);
    }
  }, [store.scratchpad]);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-hud-panel border-l border-hud-border shadow-[-10px_0_30px_rgba(0,0,0,0.8)] transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-hud-border flex items-center justify-between bg-hud-border/20">
        <div className="flex items-center gap-2 text-hud-cyan">
          <FileText size={16} />
          <h2 className="font-semibold tracking-widest uppercase text-xs">{t('scratchpad', store.language)}</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase tracking-widest transition-opacity ${isSaving ? 'text-hud-cyan opacity-100' : 'text-hud-textMuted opacity-50'}`}>
            {isSaving ? t('saving', store.language) : t('saved', store.language)}
          </span>
          <button onClick={onClose} className="text-hud-textMuted hover:text-hud-alert transition-colors">
            &times;
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('scratchpadPlaceholder', store.language)}
          className="w-full h-full bg-transparent text-hud-text font-mono text-sm resize-none focus:outline-none custom-scrollbar"
          spellCheck="false"
        />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-hud-cyan/50 pointer-events-none"></div>
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-hud-cyan/50 pointer-events-none"></div>
      </div>
    </div>
  );
};
export default Scratchpad;
