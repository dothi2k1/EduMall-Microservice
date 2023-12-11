import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/context/Products/cartContext';
import AuthProvider from '@/context/User/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: "Team Atom",
//   description: "Team Atom",
// };
export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Edumall</title>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
