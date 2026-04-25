<div align="center">

# 🛸 HUD — Lifecycle OS

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=20&pause=1000&color=00F0FF&center=true&vCenter=true&width=700&lines=Kişisel+Yaşam+Yönetim+Sistemi;Rutin+%7C+Envanter+%7C+Odak+%7C+Analitik;Siber+Punk+Tasarım+%2B+Yerel+Veri+Saklama" alt="Typing SVG" />

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CDN-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-ff003c?style=for-the-badge)](https://github.com/skarayil)

<br/>

> **Günlük rutinlerini, envanterini ve odak oturumlarını yönetmek için tasarlanmış,  
> siber punk estetikli kişisel yaşam yönetim panosu.**  
> Tüm veriler tarayıcında, sadece senin kontrolünde.

<br/>

### 🌐 [Canlı Demo → skarayil.github.io/hud_life_cycle](https://skarayil.github.io/hud_life_cycle/)

<br/>

[✨ Özellikler](#-özellikler) • [🚀 Kurulum](#-yerel-kurulum) • [🎨 Temalar](#-tema--özelleştirme) • [👩‍💻 Geliştirici](#-👩‍💻--Created--by--Sude--Naz--Karayıldırım)

</div>

---

## ✨ Özellikler

| Modül | Açıklama |
|-------|----------|
| 🗓️ **Rutin Yönetimi** | Haftalık veya aralıklı rutin oluştur, tamamla ve seri takip et |
| 📦 **Envanter Takibi** | Ürünlerin kullanım ömrünü takip et, süresi dolacakları önceden gör |
| ⏱️ **Odak Zamanlayıcı** | Pomodoro (25dk), Derin Çalışma (50dk) veya özel süre ile odaklan |
| 📊 **Analitik Özet** | Günlük & aylık odak süresi, ilaç serisi, bitki bakım durumu |
| 📝 **Karalama Defteri** | Otomatik kayıt özellikli anlık not alma paneli |
| 🎨 **8 Renk Teması** | Cyberpunk Cyan, Neon Pink, Hacker Green ve daha fazlası |
| 🌙 **Karanlık / Aydınlık Mod** | Tam tema desteği, CSS değişkenleriyle anlık geçiş |
| 🔤 **6 Yazı Tipi** | Orbitron, JetBrains Mono, Space Grotesk ve diğerleri |
| 🌍 **Türkçe / İngilizce** | Uygulama içi tam dil desteği |
| 💾 **Yerel Veri Saklama** | Tüm veriler `localStorage`'da saklanır, internet bağlantısı gerekmez |
| 🔄 **Fabrika Sıfırlama** | Tüm verileri silerek varsayılan duruma dön |

---

## 🖥️ Modüller

### 📌 Kontrol Paneli (Dashboard)
Ana ekran; bugün yapılması gereken rutinler, yakında süresi dolacak envanter öğeleri ve kişisel analitik özetini tek bir bakışta sunar.

- Tamamlanmamış günlük rutinler listelenir
- 7 gün içinde süresi dolacak ürünler uyarı ile gösterilir
- Bugünkü odak süresi, toplam envanter değeri, ilaç serisi ve bitki bakım durumu anlık gösterilir

---

### 🗓️ Rutin Yönetimi
Günlük, haftalık veya belirli aralıklarla tekrarlayan görevler oluştur.

**Desteklenen Kategoriler:**
`İş` · `Günlük Yaşam` · `Cilt Bakımı` · `Beslenme` · `Fitness` · `İlaç/Sağlık` · `Hastane/Doktor` · `Bitki Bakımı` · `Ödev/Eğitim` · `Kişisel Bakım` · `Diğer`

**Özel Alanlar:**
- 💊 *İlaç/Sağlık* kategorisi için: Dozaj ve doktor notu
- 🌿 *Bitki Bakımı* için: Sulama aralığı (gün)
- 📚 *Ödev/İş* için: Öncelik seviyesi (Yüksek / Orta / Düşük) ve son tarih
- 🔥 Tamamlama serisi (streak) takibi — kaç gün art arda yaptığını gösterir

---

### 📦 Envanter Yönetimi
Sahip olduğun ürünlerin kullanım ömrünü takip et.

**Desteklenen Kategoriler:**
`Giyim` · `Kontakt Lens` · `Cilt Bakımı` · `Elektronik` · `Market` · `Medikal` · `Abonelikler` · `Ev Eşyası` · `Diğer`

**Her Ürün İçin:**
- Marka, fiyat, satın alma tarihi
- Ömür süresi (gün cinsinden) — ne zaman yenilemen gerektiğini hesaplar
- Notlar alanı
- Toplam envanter değeri otomatik hesaplanır (`$` cinsinden)
- Süresi 7 gün veya daha az kalan ürünler kontrol panelinde uyarı olarak gösterilir

---

### ⏱️ Odak Zamanlayıcı
Verimli çalışma seansları için yerleçik zamanlayıcı.

| Mod | Süre | Açıklama |
|-----|------|----------|
| 🍅 Pomodoro | 25 dakika | Klasik odak tekniği |
| ⚡ Derin Çalışma | 50 dakika | Uzun süreli derin odaklanma |
| ⚙️ Özel | İstediğin dakika | Kendi sürenizi belirle |

Zamanlayıcı tamamlandığında oturum otomatik kaydedilir ve analitik modülüne işlenir.

---

### 📊 Odak Analitiği
Çalışma alışkanlıklarını görselleştir.

- **Bugünkü Odak:** O güne ait toplam çalışma süresi
- **Bu Ayki Odak:** Aylık toplam odak süresi
- **Son Oturumlar:** Tür, tarih ve süre bilgisiyle son 10 oturum

---

### 📝 Karalama Defteri
Ekranın sağından açılan hızlı not paneli.

- Yazdıkça 800ms gecikmeyle otomatik kaydeder
- Kaydetme durumu anlık gösterilir (Kaydediliyor… / Kaydedildi)
- Tüm oturumlar arasında notlar korunur

---

## 🎨 Tema & Özelleştirme

HUD, gerçek zamanlı özelleştirme seçenekleri sunar:

**Renk Temaları (Karanlık Mod):**

| Tema | Renk |
|------|------|
| Cyberpunk Cyan | `#00F0FF` |
| Neon Pink | `#FF00FF` |
| Electric Blue | `#3B82F6` |
| Deep Purple | `#C084FC` |
| Hacker Green | `#4ADE80` |
| Crimson Red | `#FB7185` |
| Pure White | `#F8FAFC` |
| Stealth Black | `#94A3B8` |

**Yazı Tipi Seçenekleri:**
`Inter` · `JetBrains Mono` · `Fira Code` · `Space Grotesk` · `Orbitron` · `Sistem Varsayılanı`

**Yazı Boyutu:** 0.8x – 1.5x arası kaydırıcıyla ayarlanabilir

---

## 🚀 Yerel Kurulum

Projeyi kendi bilgisayarında çalıştırmak için:

### Gereksinimler
- Node.js `>=20.19.0` veya `>=22.12.0`
- npm

### Adımlar

```bash
# 1. Repoyu klonla
git clone https://github.com/skarayil/hud_life_cycle.git
cd hud_life_cycle

# 2. Bağımlılıkları yükle
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcında `http://localhost:5173` adresini aç.

### Derleme (Production Build)

```bash
npm run build
```

`frontend/dist/` klasöründe çıktı oluşur. Bu klasör doğrudan GitHub Pages veya herhangi bir statik sunucu üzerinde yayınlanabilir.

---

## 💾 Veri Saklama

HUD tamamen **çevrimdışı** çalışır. Tüm veriler tarayıcının `localStorage` alanında saklanır:

- Rutin geçmişi ve seriler
- Envanter öğeleri ve açılış tarihleri
- Odak oturumu kayıtları
- Karalama defteri içeriği
- Tema, dil ve yazı tipi tercihleri

**Veri silme:** Ayarlar ekranındaki "Fabrika Sıfırlama" butonu tüm verileri siler ve örnek verilerle sıfırlar.

> ⚠️ Tarayıcı önbelleği temizlenirse veriler silinebilir. Önemli notlarınızı yedeklemeniz önerilir.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| React | 19 | Kullanıcı arayüzü |
| TypeScript | 5 | Tip güvenliği |
| Vite | 8 | Geliştirme & derleme |
| Tailwind CSS | CDN | Stil sistemi |
| Lucide React | latest | İkonlar |
| Node.js + Express | — | Vertex AI proxy (opsiyonel) |

---

## 📝 Lisans

Bu yazılım **[Sude Naz Karayıldırım](https://github.com/skarayil)** tarafından geliştirilmiştir.  
Tüm fikri ve hukuki haklar saklıdır. © 2025

---

<div align="center">

## 👩‍💻 Created by Sude Naz Karayıldırım

[![GitHub](https://img.shields.io/badge/GitHub-skarayil-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/skarayil)
[![42 Profile](https://img.shields.io/badge/42%20Profile-skarayil-black?style=flat-square&logo=42&logoColor=white)](https://profile.intra.42.fr/users/skarayil)

**⭐ Beğendiysen repo'ya star vermeyi unutma!**

<sub>© 2025 Sude Naz Karayıldırım • HUD Lifecycle OS • github.com/skarayil</sub>

</div>
