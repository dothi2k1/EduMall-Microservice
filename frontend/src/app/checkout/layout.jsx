
import NavBar from '@/components/NavBar';
import Footer from '../../components/Footer';
import Cart from '@/components/Cart/Cart';
export default function CheckoutLayout ({ children }) {
  return (
    <main>
      <NavBar />
      <Cart />
      <div className='lg:py-[80px] py-[50px]'>
        {children}
      </div>
      <Footer />
    </main>
  );
}
