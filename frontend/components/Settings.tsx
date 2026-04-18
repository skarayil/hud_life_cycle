import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore.ts';
import { Panel, Select, Label, Button } from './ui/HUDComponents.tsx';
import { Settings as SettingsIcon, AlertTriangle } from 'lucide-react';
import { t } from '../locales.ts';
import { FontFamily } from '../types.ts';
import { BrandLogo } from './BrandLogo.tsx';
const Settings: React.FC = () => {
  const {
    language, colorPalette, mode, fontFamily, fontSizeScale,
    setLanguage, setColorPalette, setMode, setFontFamily, setFontSizeScale, factoryReset
  } = useAppStore();
  const [resetConfirm, setResetConfirm] = useState(false);
  const handleFactoryReset = () => {
    factoryReset();
    window.location.reload();  };
  return (
    <div className="w-full h-full flex flex-col">
      <Panel title={t('settingsTitle', language)} icon={<SettingsIcon size={16} />} className="h-full flex flex-col">
        <div className="space-y-4 p-4 overflow-y-auto flex-1">
          <div className="flex items-center gap-6 p-6 bg-black/10 rounded-xl border border-hud-border/40">
            <BrandLogo />
            <div>
              <h3 className="text-lg font-bold text-hud-cyan tracking-widest uppercase">HUD Identity</h3>
              <p className="text-sm text-hud-textMuted">Lifecycle OS - Enterprise Edition</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t('mode', language)}</Label>
              <Select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
              >
                <option value="dark">{t('modeDark', language)}</option>
                <option value="light">{t('modeLight', language)}</option>
              </Select>
            </div>
            <div>
              <Label>{t('theme', language)}</Label>
              <Select
                value={colorPalette}
                onChange={(e) => setColorPalette(e.target.value as any)}
              >
                <option value="cyan">{t('themeCyan', language)}</option>
                <option value="pink">{t('themePink', language)}</option>
                <option value="blue">{t('themeBlue', language)}</option>
                <option value="purple">{t('themePurple', language)}</option>
                <option value="green">{t('themeGreen', language)}</option>
                <option value="red">{t('themeRed', language)}</option>
                <option value="white">{t('themeWhite', language)}</option>
                <option value="black">{t('themeBlack', language)}</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t('fontFamily', language)}</Label>
              <Select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as FontFamily)}
              >
                <option value="inter">{t('fontInter', language)}</option>
                <option value="jetbrains-mono">{t('fontJetBrains', language)}</option>
                <option value="fira-code">{t('fontFiraCode', language)}</option>
                <option value="space-grotesk">{t('fontSpaceGrotesk', language)}</option>
                <option value="orbitron">{t('fontOrbitron', language)}</option>
                <option value="system">{t('fontSystem', language)}</option>
              </Select>
            </div>
            <div>
              <Label>{t('fontSize', language)}: {fontSizeScale.toFixed(1)}x</Label>
              <div className="flex items-center h-[42px] bg-black/10 rounded-lg px-4 border border-hud-border/30">
                <input
                  type="range"
                  min="0.8" max="1.5" step="0.1"
                  value={fontSizeScale}
                  onChange={e => setFontSizeScale(parseFloat(e.target.value))}
                  className="w-full accent-hud-cyan cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div>
            <Label>{t('language', language)}</Label>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </Select>
          </div>
          <div className="pt-8 border-t border-hud-border/40">
            <Label className="text-hud-alert flex items-center gap-2">
              <AlertTriangle size={16} /> {t('factoryReset', language)}
            </Label>
            <p className="text-sm text-hud-textMuted mb-5">
              {t('factoryResetDesc', language)}
            </p>
            {resetConfirm ? (
              <div className="flex gap-4">
                <Button variant="danger" onClick={handleFactoryReset} className="flex-1 py-3">
                  {t('confirmReset', language)}
                </Button>
                <Button variant="ghost" onClick={() => setResetConfirm(false)} className="flex-1 py-3 border-hud-border">
                  {t('cancel', language)}
                </Button>
              </div>
            ) : (
              <Button variant="danger" onClick={() => setResetConfirm(true)} className="py-3 px-8">
                {t('factoryReset', language)}
              </Button>
            )}
          </div>
          <div className="pt-8 border-t border-hud-border/40 text-center text-xs text-hud-textMuted">
            <p>© 2025 Sude Naz Karayıldırım. All rights reserved.</p>
            <p className="mt-2">HUD - Lifecycle OS</p>
          </div>
        </div>
      </Panel>
    </div>
  );
};
export default Settings;
