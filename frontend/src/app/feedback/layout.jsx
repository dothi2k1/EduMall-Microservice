import NavBarReponsive from "../../components/NavBar";
import Footer from "../../components/Footer";
import Cart from "../../components/Cart/Cart";
export default function ProductsLayout({ children }) {
  return (
    <main>
      <NavBarReponsive />
      {children}
      <Footer />
    </main>
  );
}
