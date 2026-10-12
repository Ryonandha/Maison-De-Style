# Maison De Style — Fully Interactive & Profile-Driven Chatbot 👗✨

Prototipe antarmuka obrolan (*high-fidelity, mobile-first*) interaktif berbasis web untuk layanan konsultasi fesyen **"Maison De Style"**.

Aplikasi ini sekarang memiliki **integrasi penuh antara profil preferensi pengguna (`userProfile.shape` & `userProfile.budget`) dan Dynamic Keyword Engine**. Pilihan chip di awal secara langsung mengubah teks respon stylist, harga item di lookbook, serta rekomendasi padu padan busana.

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

## 🧠 Integrasi Logika Profil & Lookbook Dinamis

### 1. Global User Profile State
- Pilihan chip di awal disimpan dalam state:
  ```javascript
  const [userProfile, setUserProfile] = useState({ shape: '', budget: '' });
  ```
- Profil aktif (`Pear / Hourglass / Rectangle` dan `< Rp 150k / Rp 150k - 250k / > Rp 250k`) ditampilkan di indikator status header.

### 2. Teks Bot Menyebutkan Body Shape Pengguna
Ketika pengguna mengetik keyword (seperti *"kampus"*, *"hangout"*, atau *"kerja"*), stylist secara eksplisit menyebutkan bentuk tubuh pengguna dan alasan styling:
- **Kampus:** *"Cocok banget! Untuk ke kampus, gaya Smart Casual ini bakal menyeimbangkan bentuk tubuh {userProfile.shape} kamu agar terlihat jenjang dan proporsional..."*
- **Hangout:** *"Wah, seru banget! Untuk hangout, gaya Y2K / Casual Chic ini bakal menyeimbangkan bentuk tubuh {userProfile.shape} kamu agar terlihat lebih ramping dan stand out..."*
- **Kerja:** *"Untuk acara profesional, gaya Professional Chic ini bakal menyeimbangkan bentuk tubuh {userProfile.shape} kamu agar terlihat clean, elegan, dan berwibawa..."*

### 3. Penetapan Harga & Item Lookbook Berdasarkan Budget (`userProfile.budget`)
Item dan harga dalam Lookbook Carousel dipetakan secara dinamis sesuai budget yang dipilih:
- **`< Rp 150k` (Koleksi Hemat):**
  - Item terjangkau: Rp 35.000, Rp 45.000, Rp 50.000, Rp 55.000 (Total look di bawah Rp 150k).
- **`Rp 150k - 250k` (Best Value):**
  - Item menengah: Rp 45.000, Rp 65.000, Rp 75.000, Rp 110.000, Rp 115.000 (Total look Rp 225k - 240k).
- **`> Rp 250k` (Koleksi Premium):**
  - Item premium/designer: Rp 120.000, Rp 160.000, Rp 190.000, Rp 210.000, Rp 240.000 (Total look grade-A).

---

## 🎨 Fitur UI/UX
- **Input Bar Aktif:** Kolom ketik bebas + submit tombol kirim / tombol `Enter`.
- **Framer Motion:** Animasi pop-up pesan, typing indicator 3 bouncing dots (1.5 detik), dan carousel smooth layout.
- **Auto-scroll:** Otomatis scroll ke pesan paling bawah setiap ada pesan baru.
- **Reset Flow:** Tombol reset di bagian atas untuk mengulang demonstrasi kapan saja.
