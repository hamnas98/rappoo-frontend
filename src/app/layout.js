import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Rappoo - Your AI Health Coach',
  description: 'Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.',
  keywords: 'AI health coach, wellness app, personalized health, fitness tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  );
}