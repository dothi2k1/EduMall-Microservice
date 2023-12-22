"use client";
import NavBarReponsive from "../components/NavBar";
import Footer from "../components/Footer";
import AboutUs from "@/components/HomePageComponents/AboutUs";
import TransitionEffect from "@/components/TransitionEffect";
import ScrollButton from "@/components/HomePageComponents/ScrollButton";
import Cart from "@/context/Products/Cart";
import Banner from "@/components/HomePageComponents/Banner";
import CategoriesList from "@/components/HomePageComponents/Category";

export default function Home() {
  return (
    <>
      <NavBarReponsive />
      <TransitionEffect />
      <div className="container mx-auto pt-12">
        {/* <HeroTitle /> */}
        <Banner />
        <CategoriesList />
        <AboutUs />
       
      </div>
      <Footer />
      <Cart />
      <ScrollButton />
    </>
  );
}
