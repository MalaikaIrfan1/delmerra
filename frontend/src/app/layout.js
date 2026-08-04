import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { AdminProvider } from '@/context/AdminContext';

export const metadata = {
  title: 'Delmerra — Home Decor',
  description: 'Considered home decor, delivered cash-on-delivery.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <AdminProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}