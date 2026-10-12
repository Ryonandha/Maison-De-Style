# Maison De Style — Premium iOS Chatbot Prototype 👗✨

Prototipe antarmuka obrolan (*high-fidelity, mobile-first*) interaktif berbasis web untuk layanan konsultasi fesyen **"Maison De Style"**.

Dibangun dengan standar aplikasi iOS/Android modern premium, menggunakan **Framer Motion** untuk animasi transisi bubble pop-up yang mulus dan interaksi dinamis.

---

## 🚀 Cara Menjalankan Project

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
2. **Buka di Browser**:
   Buka [http://localhost:3000](http://localhost:3000)

3. **Build untuk Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🎨 Premium Design System
- **Tema Warna:**
  - Latar Belakang: *Soft Off-White/Pink* (`bg-rose-50`)
  - AI/Bot Bubbles: *Soft Pink* (`bg-pink-100`, `text-pink-900`)
  - User Bubbles: *Soft Brown/Mocha* (`bg-amber-100`, `text-amber-900`)
  - Aksen: *Muted Rose Gold* untuk tombol, border, dan highlights
- **Layout:** *iPhone Frame Container* di tengah layar desktop dengan Dynamic Island, status bar iOS (09:41, WiFi, Signal, Battery), rounded bezel 44px, dan bayangan lembut (*soft drop shadow*).
- **Header:** Efek *Glassmorphism* (`backdrop-blur-xl bg-white/85`) dengan chevron kembali, nama Maison De Style, badge VIP, dan titik indikator status hijau (*Online*).
- **Input Area:** Sticky bottom chat bar dengan text placeholder dinamis, ikon lampiran (paperclip) dengan animasi pulsasi, dan tombol kirim.

---

## 💬 Alur Chat Interaktif (Dynamic Chat Flow)

### Phase 1: AI Kuesioner Kilat (Interactive UI)
- Bot menyapa dan menyajikan pil opsi interaktif (clickable chips):
  - *Row 1 (Body Shape):* `[Pear]` `[Hourglass]` `[Rectangle]`
  - *Row 2 (Budget):* `[< Rp 150k]` `[Rp 150k - 250k]` `[> Rp 250k]`
- Saat pengguna memilih opsi, chips bertransformasi menjadi chat bubble pengguna yang merangkum preferensi gaya.

### Phase 2: Transisi & Stylist Personal
- Bot mengonfirmasi penyimpanan data: *"Data disimpan! 📝 Menghubungkan ke Stylist profesional kami..."*
- Delay 2 detik dengan indikator pengetikan (*Typing Indicator* 3 bouncing dots).
- **Stylist Darafika** (dengan foto profil kurasi) menyapa dan meminta foto baju/celana di lemari untuk di-mix & match.
- Tombol **Attachment (Paperclip)** di bar bawah berkedip/berdenyut (*pulsing animation*).
- Saat diklik, pengguna mengirim foto baju & celana kulot khaki dari lemari.

### Phase 3: Premium Lookbook Gallery
- Delay 2.5 detik dengan indikator pengetikan Stylist Darafika.
- Stylist merekomendasikan gaya *Y2K / Casual Chic* dan menyajikan **Lookbook Carousel** (geser horizontal) berisi 3 produk kurasi:
  1. **Casual Chic Vibes** (Inspirasi padu padan lemari)
  2. **Local Canvas Bag** (Totebag lokal - Rp 65.000)
  3. **White Platform Sneakers** (Sepatu sneakers platform - Rp 120.000)
- Stylist menanyakan keputusan checkout: *"Semua item tambahannya masih masuk budget kamu! Mau checkout sekarang atau ada yang mau diganti?"*
- Tersedia tombol cepat: **"Checkout Paket Lengkap"** & **"Ulangi Simulasi"**.
