import React from 'react';
export const Panel: React.FC<{ children: React.ReactNode; className?: string; title?: string; icon?: React.ReactNode }> = ({ children, className = '', title, icon }) => (
  <div className={`bg-hud-panel/80 backdrop-blur-md border border-hud-border/60 rounded-xl overflow-hidden flex flex-col shadow-lg transition-all duration-300 ${className}`}>
    {title && (
      <div className="bg-hud-border/20 px-5 py-3 border-b border-hud-border/50 flex items-center gap-3">
        {icon && <span className="text-hud-cyan">{icon}</span>}
        <h2 className="text-hud-cyan font-semibold tracking-widest uppercase text-xs">{title}</h2>
      </div>
    )}
    <div className="p-5 flex-1 overflow-auto">
      {children}
    </div>
  </div>
);
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'danger' | 'ghost' }> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-hud-bg";
  const variants = {
    primary: "bg-hud-cyanDim text-hud-cyan border border-hud-cyan/40 hover:bg-hud-cyan/20 hover:border-hud-cyan hover:shadow-[0_0_12px_rgba(var(--hud-primary-rgb),0.4)] focus:ring-hud-cyan",
    danger: "bg-hud-alertDim text-hud-alert border border-hud-alert/40 hover:bg-hud-alert/20 hover:border-hud-alert hover:shadow-[0_0_12px_rgba(255,0,60,0.4)] focus:ring-hud-alert",
    ghost: "bg-transparent text-hud-textMuted hover:text-hud-cyan hover:bg-hud-cyanDim border border-transparent focus:ring-hud-cyan/50"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`bg-black/10 backdrop-blur-sm border border-hud-border/60 rounded-lg px-3 py-2.5 text-hud-text placeholder-hud-textMuted/50 focus:outline-none focus:ring-2 focus:ring-hud-cyan/40 focus:border-hud-cyan transition-all duration-300 w-full ${className}`}
    {...props}
  />
);
export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <select
    className={`bg-black/10 backdrop-blur-sm border border-hud-border/60 rounded-lg px-3 py-2.5 text-hud-text focus:outline-none focus:ring-2 focus:ring-hud-cyan/40 focus:border-hud-cyan transition-all duration-300 w-full appearance-none cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </select>
);
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className = '', children, ...props }) => (
  <label className={`block text-xs font-medium text-hud-textMuted uppercase tracking-wider mb-1.5 ${className}`} {...props}>
    {children}
  </label>
);
export const ProgressBar: React.FC<{ progress: number; colorClass?: string; label?: string; valueText?: string }> = ({ progress, colorClass = 'bg-hud-cyan', label, valueText }) => {
  const clamped = Math.max(0, Math.min(100, progress));
  return (
    <div className="w-full">
      {(label || valueText) && (
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-hud-text font-medium">{label}</span>
          <span className="text-hud-textMuted">{valueText}</span>
        </div>
      )}
      <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-hud-border/40">
        <div
          className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${clamped}%`, boxShadow: `0 0 10px ${colorClass.replace('bg-', '')}` }}
        />
      </div>
    </div>
  );
};
