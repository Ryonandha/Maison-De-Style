import './globals.css';

export const metadata = {
  title: 'Maison De Style | Personal Fashion Styling Consultation',
  description: 'Solusi kilat bebas cemas outfit kamu bersama Stylist Profesional.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-stone-100 text-stone-800 antialiased selection:bg-pink-200 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
