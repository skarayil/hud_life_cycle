import React, { useState, useMemo } from 'react';
import { InventoryItem, InventoryCategory } from '../types.ts';
import { Panel, Button, Input, Label, Select } from './ui/HUDComponents.tsx';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { getTodayStr, formatDate } from '../utils/dateUtils.ts';
import { useAppStore } from '../store/useAppStore.ts';
import { t } from '../locales.ts';
interface InventoryManagerProps {
  inventory: InventoryItem[];
  onAdd: (item: Omit<InventoryItem, 'id'>) => void;
  onDelete: (id: string) => void;
}
const CATEGORIES: InventoryCategory[] = ['Clothing/Fashion', 'Contact Lenses', 'Skincare', 'Electronics', 'Groceries', 'Medical/Meds', 'Subscriptions', 'Household', 'Other'];
const InventoryManager: React.FC<InventoryManagerProps> = ({ inventory, onAdd, onDelete }) => {
  const { language } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<InventoryCategory>('Other');
  const [brand, setBrand] = useState('');
  const [priceStr, setPriceStr] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState(getTodayStr().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [lifespanDays, setLifespanDays] = useState<number>(90);
  const [filterCategory, setFilterCategory] = useState<InventoryCategory | 'All'>('All');
  const handleSave = () => {
    if (!name.trim() || lifespanDays <= 0) return;
    const parsedPrice = parseFloat(priceStr);
    onAdd({
      name: name.trim(),
      category,
      brand: brand.trim() || undefined,
      price: isNaN(parsedPrice) ? undefined : parsedPrice,
      purchaseDate: purchaseDate ? new Date(purchaseDate).toISOString() : undefined,
      notes: notes.trim() || undefined,
      lifespanDays,
      openedDate: getTodayStr()
    });
    setName('');
    setCategory('Other');
    setBrand('');
    setPriceStr('');
    setPurchaseDate(getTodayStr().split('T')[0]);
    setNotes('');
    setLifespanDays(90);
    setIsAdding(false);
  };
  const filteredInventory = useMemo(() => {
    if (filterCategory === 'All') return inventory;
    return inventory.filter(i => i.category === filterCategory);
  }, [inventory, filterCategory]);
  const totalValue = useMemo(() => {
    return filteredInventory.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [filteredInventory]);
  const getCategoryTranslation = (cat: string) => {
    const map: Record<string, any> = {
      'Clothing/Fashion': 'catClothing', 'Contact Lenses': 'catContactLenses', 'Electronics': 'catElectronics',
      'Skincare': 'catSkincare', 'Groceries': 'catGroceries', 'Medical/Meds': 'catMedical',
      'Subscriptions': 'catSubscriptions', 'Household': 'catHousehold', 'Other': 'catOther', 'All': 'all'
    };
    return t(map[cat], language);
  };
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-lg text-hud-cyan font-bold tracking-widest uppercase">{t('inventoryDb', language)}</h2>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="text-sm text-hud-textMuted font-mono bg-black/10 px-3 py-1.5 rounded-lg border border-hud-border/40">
            {t('totalValue', language)}: <span className="text-hud-cyan font-bold">${totalValue.toFixed(2)}</span>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus size={16} /> {t('addItem', language)}
            </Button>
          )}
        </div>
      </div>
      {isAdding && (
        <Panel className="border-hud-cyan/50 shadow-[0_0_15px_rgba(var(--hud-primary-rgb),0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>{t('itemName', language)}</Label>
              <Input value={name} onChange={e => setName(e.target.value)} autoFocus />
            </div>
            <div>
              <Label>{t('category', language)}</Label>
              <Select value={category} onChange={e => setCategory(e.target.value as InventoryCategory)}>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{getCategoryTranslation(cat)}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label>{t('lifespanDays', language)}</Label>
              <Input
                type="number"
                min="1"
                value={lifespanDays}
                onChange={e => setLifespanDays(parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <Label>{t('brand', language)}</Label>
              <Input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., Apple" />
            </div>
            <div>
              <Label>{t('price', language)}</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={priceStr}
                onChange={e => setPriceStr(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>{t('purchaseDate', language)}</Label>
              <Input
                type="date"
                value={purchaseDate}
                onChange={e => setPurchaseDate(e.target.value)}
              />
            </div>
            <div className="md:col-span-3">
              <Label>{t('notes', language)}</Label>
              <Input
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Additional details..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-hud-border/50">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              <X size={16} /> {t('cancel', language)}
            </Button>
            <Button onClick={handleSave} disabled={!name.trim() || lifespanDays <= 0}>
              <Save size={16} /> {t('saveItem', language)}
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
        {filteredInventory.length === 0 ? (
          <div className="text-center text-hud-textMuted py-10 italic">{t('noInventory', language)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-hud-border text-xs uppercase tracking-wider text-hud-textMuted">
                  <th className="p-4 font-medium">{t('itemName', language)}</th>
                  <th className="p-4 font-medium">{t('brand', language)}</th>
                  <th className="p-4 font-medium">{t('category', language)}</th>
                  <th className="p-4 font-medium">{t('price', language)}</th>
                  <th className="p-4 font-medium">{t('purchaseDate', language)}</th>
                  <th className="p-4 font-medium">{t('lifespanDays', language)}</th>
                  <th className="p-4 font-medium text-right">{t('actions', language)}</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id} className="border-b border-hud-border/30 hover:bg-hud-border/10 transition-colors group">
                    <td className="p-4">
                      <div className="text-hud-text font-medium">{item.name}</div>
                      {item.notes && <div className="text-xs text-hud-textMuted mt-1">{item.notes}</div>}
                    </td>
                    <td className="p-4 text-hud-textMuted text-sm">{item.brand || '-'}</td>
                    <td className="p-4 text-hud-textMuted text-sm">{getCategoryTranslation(item.category)}</td>
                    <td className="p-4 text-hud-textMuted text-sm font-mono">{item.price !== undefined ? `$${item.price.toFixed(2)}` : '-'}</td>
                    <td className="p-4 text-hud-textMuted text-sm">{item.purchaseDate ? formatDate(item.purchaseDate) : '-'}</td>
                    <td className="p-4 text-hud-textMuted text-sm">{item.lifespanDays} {t('days', language)}</td>
                    <td className="p-4 text-right">
                      <Button variant="danger" className="inline-flex opacity-0 group-hover:opacity-100 transition-opacity !py-1.5 !px-2.5" onClick={() => onDelete(item.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
};
export default InventoryManager;
