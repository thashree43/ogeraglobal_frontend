import React from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Carosole from '../../Reusable/Carosole';
import "../../style/Homepage.css";
import SimpleCategoryProductList from '../../Reusable/Slidingcategoriy';
import NewArrivals from '../../Reusable/NewArrivals';
import SlidingCarosole from '../../Reusable/SlidingCarosole';
import ServicesBanner from '../../Reusable/ServiceBanner';
import FAQSection from '../../Reusable/FaqSection';

const Homepage = () => {
  return (
    <div className="page-container">
      {/* HEADER SECTION */}
      <Header />

      {/* CATEGORY & HERO SECTION */}
      <section className="no-gap-section">
        <SimpleCategoryProductList />
        <Carosole />
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mt-6">
        <h2 className="text-center mb-4 font-semibold text-2xl">Our Featured Products</h2>
        <NewArrivals />
      </section>

      {/* EXPLORE PRODUCTS */}
      <section className="container mt-6 min-h-[50vh]">
        <h2 className="text-center mb-4 font-semibold text-2xl">Explore Products</h2>
        <SlidingCarosole />
      </section>

      {/* SERVICES BANNER */}
      <section className="mt-8 mb-8">
        <ServicesBanner />
      </section>

      {/* FAQ SECTION */}
      <section className="mt-12 mb-12 bg-gray-100 py-10">
        <FAQSection />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Homepage;
