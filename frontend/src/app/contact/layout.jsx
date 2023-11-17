import NavBarReponsive from "../../components/NavBar";
import Footer from "../../components/Footer";
export default function ProductsLayout({ children }) {
  return (
    <main>
      <NavBarReponsive />
      {children}
      <Footer />
    </main>
  );
}
