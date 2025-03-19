import React from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import FAQSection from '../../Reusable/FaqSection';

const Support = () => {
  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Support Info Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Support Center</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are here to help you with any queries or issues. Feel free to reach out to our support team.
            </p>
          </section>

          {/* Contact Info Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Customer Support */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Customer Support</h2>
              <p className="text-gray-600">For inquiries related to gas booking and delivery.</p>
              <p className="text-lg font-bold text-red-600 mt-2">+91 98765 43210</p>
              <p className="text-blue-600">support@ogera.com</p>
            </div>

            {/* Technical Support */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Service Support</h2>
              <p className="text-gray-600">For Product-related issues .</p>
              <p className="text-lg font-bold text-red-600 mt-2">+91 98765 43211</p>
              <p className="text-blue-600">service@ogera.com</p>
            </div>

            {/* Corporate Office */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Corporate Office</h2>
              <p className="text-gray-600">Quality Ogera International LLP</p>
              <p className="text-gray-500">123, Kumminiparamb,kondotty, kerala</p>
              <p className="text-blue-600">info@ogera.com</p>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQSection />

          {/* Emergency Support */}
          <section className="bg-red-100 py-8 rounded-lg shadow-md mt-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-red-600 mb-4">Emergency Support</h2>
              <p className="text-lg text-gray-700">
                For emergencies such as gas leaks or urgent assistance, contact us immediately.
              </p>
              <p className="text-2xl font-bold text-red-600 mt-2">24/7 Helpline: +91 1800-425-5326</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Support;
