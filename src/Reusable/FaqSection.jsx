import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestion, FaHeadset } from "react-icons/fa";

const faqData = [
  {
    question: "What products does OGERA offer?",
    answer: "OGERA provides a wide range of electronics and home appliances, including TVs, washing machines, fans, kitchen appliances, and more.",
    icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"></path></svg>
  },
  {
    question: "How can I place an order?",
    answer: "You can place an order on our website by browsing the products and adding them to your cart. Secure payment options are available at checkout.",
    icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>
  },
  {
    question: "Do you offer warranties on your products?",
    answer: "Yes, all OGERA products come with manufacturer warranties. The warranty period varies depending on the product category.",
    icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"></path></svg>
  },
  {
    question: "What is the return policy?",
    answer: "We offer a 7-day return policy for damaged or defective products. Please ensure the item is in its original packaging with proof of purchase.",
    icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via email at support@ogera.com or call us at 1800-425-5326.",
    icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M487.8 24.1L387 .8c-14.7-3.4-29.8 4.2-35.8 18.1l-46.5 108.5c-5.5 12.7-1.8 27.7 8.9 36.5l53.9 44.1c-34 69.2-90.3 125.6-159.6 159.6l-44.1-53.9c-8.8-10.7-23.8-14.4-36.5-8.9L18.9 351.3C5 357.3-2.6 372.3.8 387L24 487.7C27.3 502 39.9 512 54.5 512 306.7 512 512 307.8 512 54.5c0-14.6-10-27.2-24.2-30.4zM55.1 480l-23-99.6 107.4-46 59.5 72.8c103.6-48.6 159.7-104.9 208.1-208.1l-72.8-59.5 46-107.4 99.6 23C479.7 289.7 289.6 479.7 55.1 480z"></path></svg>
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <FaQuestion className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Get answers to the most common questions about OGERA products and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 
                ${openIndex === index ? "ring-2 ring-red-400" : "hover:shadow-lg"}`}
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full text-red-500">
                    {faq.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                </div>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out 
                    ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
                
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`mt-4 flex items-center text-sm font-medium 
                    ${openIndex === index ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                >
                  {openIndex === index ? "Show less" : "Read more"}
                  {openIndex === index ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-red-50 px-6 py-3 rounded-full">
            <FaHeadset className="text-red-500 mr-2" />
            <span className="text-gray-700">
              Still have questions? <a href="/Support" className="font-medium text-red-500 hover:text-red-600">Contact our support team</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;