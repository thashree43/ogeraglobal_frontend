import React from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import HeroComponent from "../../Reusable/Herosection";
import CategoryCarousel from "../../Reusable/Autolistingcategory";
import ListingProduct from "./ListingProduct";
import FAQSection from "../../Reusable/FaqSection";
import backimage from '../../Images/IM 6.jpg'

const ProductPage = () => {
  return (
    <div className="page-container">
      {/* HEADER SECTION */}
      <Header />

      {/* HERO SECTION */}
      <HeroComponent backimage={backimage} />

      <CategoryCarousel />
      {/* PRODUCT SECTION (Placeholder for content) */}
      <div id="product-section" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
        <div className="w-20 h-1 bg-red-600 mx-auto"></div>
      </div>
        <p className="text-lg text-gray-700 text-center mb-12">
          Explore our wide range of high-quality home appliances.
        </p>
        {/* Add product listings or other content here */}
        <ListingProduct/>
      </div>
      <section className="mt-12 mb-12 bg-gray-100 py-10">
        <FAQSection />
      </section>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ProductPage;
