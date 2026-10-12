# Maison De Style — Fully Interactive & Dynamic Chatbot 👗✨

Prototipe antarmuka obrolan (*high-fidelity, mobile-first*) interaktif berbasis web untuk layanan konsultasi fesyen **"Maison De Style"**.

Aplikasi ini dilengkapi dengan **Dynamic Response Engine berbasis keyword**, di mana pengguna dapat **mengetik pesan bebas** di kolom input teks, mengirimkannya (*Send / Enter*), dan menerima rekomendasi *lookbook* yang berbeda-beda secara otomatis.

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

## 🧠 Dynamic Response Engine (Keyword-based Logic)

Bot menganalisis pesan pengguna dan memberikan kurasi outfit beserta Lookbook Carousel yang sesuai:

1. **Kondisi A: Kampus / Kuliah**
   - **Keywords:** `kampus`, `kuliah`, `campus`, `kelas`, `skripsi`, `dosen`
   - **Respon Stylist:** *"Cocok banget! Untuk ke kampus, gaya Smart Casual ini bakal bikin kamu tampil rapi tapi tetap nyaman seharian. Coba cek lookbook ini:"*
   - **Lookbook Carousel:**
     - *Oversized Blazer* — Rp 150.000
     - *Basic White Tee* — Rp 50.000
     - *Classic Loafers* — Rp 120.000

2. **Kondisi B: Hangout / Cafe / Y2K**
   - **Keywords:** `hangout`, `main`, `cafe`, `jalan`, `ulang tahun`, `nongkrong`, `mall`
   - **Respon Stylist:** *"Wah, seru banget! Gaya Y2K / Casual Chic paling pas nih buat hangout. Kombinasi item ini bakal bikin kamu stand out:"*
   - **Lookbook Carousel:**
     - *Khaki Cargo Pants* — Rp 135.000
     - *Ribbed Crop Top* — Rp 45.000
     - *Baguette Shoulder Bag* — Rp 65.000

3. **Kondisi C: Kerja / Interview / Formal**
   - **Keywords:** `kerja`, `interview`, `kantor`, `formal`, `rapat`, `meeting`
   - **Respon Stylist:** *"Untuk acara profesional, kamu butuh look yang clean dan elegan. Ini rekomendasi outfit Professional Chic di bawah budget kamu:"*
   - **Lookbook Carousel:**
     - *High-waist Culottes* — Rp 110.000
     - *Silk Satin Blouse* — Rp 95.000
     - *Pointed Heels 5cm* — Rp 140.000

4. **Kondisi D: Fallback / Klarifikasi**
   - **Jika tidak ada keyword cocok:** *"Hmm, menarik! Biar aku bisa kasih rekomendasi lookbook yang paling pas, acaranya ini lebih ke formal (kayak interview/kerja) atau santai (kayak hangout/kuliah) nih?"*
   - Menampilkan pil saran respon cepat yang bisa langsung diklik.

---

## 🎨 Premium UI/UX Design
- **Theme:** Background `bg-rose-50`, Bot bubbles `bg-pink-100 text-pink-900`, User bubbles `bg-amber-100 text-amber-900`.
- **Framer Motion:** Animasi pop-up pesan, typing indicator 3 bouncing dots (1.5 detik), dan carousel smooth layout.
- **Input Bar Fungsional:** Input teks aktif (`value` & `onChange`), tombol send gradien, dukungan tombol `Enter`, dan tombol lampiran foto lemari.
- **Auto-scroll:** Otomatis scroll ke bawah secara halus setiap ada pesan baru.
