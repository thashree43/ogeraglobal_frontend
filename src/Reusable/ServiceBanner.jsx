import React from 'react';
import Lottie from 'lottie-react';
import deliveryAnimation from '../animation/deliverytruck.json';
import warrantyAnimation from '../animation/Warranty.json';
import supportAnimation from '../animation/Support.json';
import trustAnimation from '../animation/trust.json';

const ServicesBanner = () => {
  const services = [
    {
      id: 1,
      icon: <Lottie animationData={deliveryAnimation} className="w-20 h-20" />,
      title: "Fast & Reliable Delivery",
      description: "Delivering OGERA products to retailers across the region with care."
    },
    {
      id: 2,
      icon: <Lottie animationData={warrantyAnimation} className="w-20 h-20" />,
      title: "Warranty Registration",
      description: "Register your OGERA product warranty manually through our trusted retailers."
    },
    {
      id: 3,
      icon: <Lottie animationData={supportAnimation} className="w-20 h-20" />,
      title: "Dedicated Support",
      description: "Get professional assistance for all OGERA appliances."
    },
    {
      id: 4,
      icon: <Lottie animationData={trustAnimation} className="w-20 h-20" />,
      title: "Trusted by Families",
      description: "OGERA – A name you can rely on for quality home appliances."
    }
  ];

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Why Choose <span className="text-red-600">OGERA?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center text-center">
              <div className="mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;
