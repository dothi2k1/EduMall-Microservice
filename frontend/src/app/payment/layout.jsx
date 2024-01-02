import NavBarReponsive from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function PaymentLayout({ children }) {
  return (
    <main>
      <NavBarReponsive />
      <div className="my-56 flex justify-center items-center">{children}</div>
      <Footer />
    </main>
  );
}
