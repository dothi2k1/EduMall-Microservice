import NavBarReponsive from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function GalleryLayout({ children }) {
  return (
    <main>
      <NavBarReponsive />
      {children}
      <Footer />
    </main>
  );
}
