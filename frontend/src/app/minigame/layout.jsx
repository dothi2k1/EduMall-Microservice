import NavBarReponsive from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function ProductsLayout({ children }) {
  return (
    <main className=" bg-cover  bg-[url('https://i.pinimg.com/originals/81/a6/7f/81a67f68a0c2b54afd22f2279b921c7a.png')] ">
      <NavBarReponsive />
      {children}
      <Footer />
    </main>
  );
}
