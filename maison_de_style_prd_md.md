# Project Requirement Document: Maison De Style - Chatbot Prototype

## Objective
Build a mobile-first, interactive web-based chat interface prototype for a fashion consultation service named "Maison De Style". The app should simulate an automated chat flow where an AI collects user data, then transfers the user to a human stylist who provides outfit recommendations.

## Tech Stack
- React (Next.js preferred)
- Tailwind CSS
- Lucide React (for icons)

## Design System & Styling
- **Theme Colors:** Soft Pink (e.g., `bg-pink-50`, `bg-pink-100`, `text-pink-800`) and Soft Brown (e.g., `bg-amber-100`, `text-amber-900`).
- **Typography:** Modern Sans-serif (clean and elegant).
- **Layout:** Mobile screen wrapper centered on the page (like a mobile mockup).
- **Header:** Sticky top header with a dummy logo (can use a Sparkles or Shirt icon from Lucide), the title "Maison De Style", and a status indicator (Online).

## Chat Flow Simulation (State Management)
The chat should automatically progress or progress based on simple user clicks to simulate a real conversation for presentation purposes.

### Step 1: AI Bot Introduction
- **Sender:** AI Bot (Avatar: Robot icon).
- **Message:** "Halo! Selamat datang di Maison De Style, solusi kilat bebas cemas outfit kamu! ✨ Yuk isi data singkat ini biar aku bisa cari stylist yang pas buat kamu:"
- **Action:** Display a small inline form or clickable chips inside the chat for the user to select:
  - Age: 18-30
  - Body Shape: Pear, Hourglass, Rectangle
  - Budget: Rp 150k - Rp 250k
- **User Action:** A "Submit Data" button.

### Step 2: Transition
- When the user clicks "Submit Data", the user's choices appear as a chat bubble sent by the user.
- **Bot Message:** "Data diterima! Sebentar ya, AI kami sedang menganalisis kecocokan... Menghubungkan kamu ke Stylist Profesional kami. ⏳"
- *Delay 2 seconds.*

### Step 3: Human Stylist Enters
- **Sender:** Stylist Darafika (Avatar: User/Woman icon).
- **Message:** "Halo! Kenalin aku Darafika, personal stylist kamu hari ini. Aku lihat kamu butuh outfit dengan budget hemat untuk body shape Pear. Ada acara apa nih? Dan di lemari lagi ada baju basic apa aja?"
- **User Action:** Provide a button that says "Balas: Buat hangout, ada kulot hitam & kemeja putih".
- When clicked, this appears as the user's message.

### Step 4: The Lookbook & Recommendation
- *Delay 1.5 seconds.*
- **Sender:** Stylist Darafika.
- **Message:** "Sip! Kemeja putih oversized bisa jadi outer, dalemnya kaos dan kulot hitam high-waist. Bikin kaki kelihatan jenjang! Ini visual lookbook-nya:"
- **Attachment:** Show a placeholder image (use Unsplash placeholder `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80` or similar fashion aesthetic image).
- **Message 2:** "Untuk aksesoris tambahan, aku rekomendasiin totebag kanvas lokal (Rp 65.000). Total masih aman di bawah budget kamu! Gimana menurutmu?"

## Interactivity & UX Requirements
- Smooth scrolling to the bottom of the chat as new messages appear.
- Subtle fade-in animations for chat bubbles.
- Bot chat bubbles should have a soft pink background. User chat bubbles should have a soft brown/beige background and be aligned to the right.

Please generate the complete, working React component code for this prototype in a single file.