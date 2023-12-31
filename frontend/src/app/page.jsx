"use client";
import NavBarReponsive from "../components/NavBar";
import Footer from "../components/Footer";
import AboutUs from "@/components/HomePageComponents/AboutUs";
import TransitionEffect from "@/components/TransitionEffect";
import ScrollButton from "@/components/HomePageComponents/ScrollButton";
import Banner from "@/components/HomePageComponents/Banner";
import CategoriesList from "@/components/HomePageComponents/Category";
import HotTrend from "@/components/HomePageComponents/HotTrend";
import Cart from "@/components/Cart/Cart";

export default function Home() {
  return (
    <>
      <NavBarReponsive />
      <TransitionEffect />
      <div className="container mx-auto pt-12">
        <Cart />
        <Banner />
        <CategoriesList />
        <HotTrend />
        <AboutUs />
       
      </div>
      <Footer />
      
      <ScrollButton />
    </>
  );
}
