import NavBarReponsive from "../../components/NavBar";
import Footer from "../../components/Footer";
import Cart from "@/components/Cart/Cart";

export default function Error({ children }) {
  return (
    <main>
      <NavBarReponsive />
      <Cart />
      {children}
      <Footer />
    </main>
  );
}