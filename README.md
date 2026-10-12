# Maison De Style — Interactive Chatbot Prototype 👗✨

Prototipe antarmuka obrolan (*mobile-first*) interaktif berbasis web untuk layanan konsultasi fesyen **"Maison De Style"**.

Aplikasi ini mensimulasikan alur percakapan otomatis di mana **AI Style Matcher** mengumpulkan data preferensi pengguna, lalu menghubungkan pengguna ke **Stylist Profesional (Stylist Darafika)** yang memberikan kurasi rekomendasi gaya & *lookbook*.

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

## 🎨 Design System & Styling
- **Tema Warna:**
  - *Soft Pink* (`bg-pink-50`, `bg-pink-100`, `text-pink-800`, dll) untuk pesan AI & Stylist
  - *Soft Brown / Warm Beige* (`bg-amber-100`, `text-amber-950`, border `border-amber-200`) untuk bubble chat pengguna
- **Layout:** *Mobile frame mockup* (iPhone-style) di tengah layar lengkap dengan status bar waktu/baterai, Dynamic Island, dan bayangan estetis.
- **Header:** Sticky header dengan logo Sparkles/UserCheck, brand "Maison De Style", dan indikator status *Online / VIP Consult*.

---

## 💬 Simulasi Alur Chat (Chat Flow)

1. **Langkah 1: AI Bot Introduction & Form Inline**
   - AI Bot menyapa pengguna dan menyajikan formulir interaktif di dalam bubble chat:
     - Rentang Usia: `< 18`, `18-30`, `30+`
     - Body Shape: `Pear`, `Hourglass`, `Rectangle`
     - Budget: `< Rp 150k`, `Rp 150k - Rp 250k`, `Rp 250k - Rp 500k`, `Flexible`
   - Tombol: **"Kirim Data Preferensi"**

2. **Langkah 2: Transisi Matching**
   - Preferensi pengguna terkirim sebagai chat bubble kanan (warna Soft Brown).
   - Bot membalas: *"Data diterima! Sebentar ya, AI kami sedang menganalisis kecocokan... Menghubungkan kamu ke Stylist Profesional kami. ⏳"*
   - Animasi delay 2 detik dengan indikator pengetikan/pencarian stylist.

3. **Langkah 3: Stylist Masuk**
   - Stylist Darafika menyapa dan menanyakan detail acara & pakaian *basic* yang dimiliki.
   - Tersedia tombol respon cepat: *"Balas: Buat hangout, ada kulot hitam & kemeja putih"*.

4. **Langkah 4: Lookbook & Rekomendasi Outfit**
   - Delay 1.5 detik dengan *typing indicator*.
   - Stylist memberikan saran padu padan kulot high-waist & kemeja putih oversized.
   - Menampilkan kartu visual Lookbook (Unsplash fashion aesthetic image) lengkap dengan tag gaya.
   - Rekomendasi pelengkap totebag lokal dengan total di bawah target budget pengguna.

5. **Fitur Presenter & Interaktivitas Tambahan**
   - Auto-scroll mulus ke bawah setiap pesan baru muncul.
   - Animasi fade-in halus pada setiap chat bubble.
   - Tombol **"Reset Flow"** di kanan atas dan bawah untuk mengulang demonstrasi kapan saja.
