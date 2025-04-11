import React from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import backimage from "../../Images/Ogera_Logo.png";
import CEO from "../../Images/CEO.jpg"
import Quality from "../../Images/qualitylogo.jpg"
import company from "../../Images/company.webp"
import corporate from "../../Images/Corporate.webp"
import team from "../../Images/teamleads.webp"

// Hero Component
const HeroComponent = () => {
  return (
    <div className="w-full relative h-96">
    <div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ 
        backgroundImage: `url(${company})`,  // Changed from company to backimage
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
    <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">About Us</h1>
        <p className="text-xl text-white max-w-2xl mx-auto">Quality Ogera International LLP - Innovation for everyday living</p>
      </div>
    </div>
  </div>
  );
};

// Corporate Overview Section
const CorporateOverview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <img 
              src={corporate}
              alt="Corporate Office" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Corporate Overview</h2>
            <p className="text-gray-600 mb-4">
              Founded in September 2024, Quality Ogera International LLP is a subsidiary of Quality Group International, a leading conglomerate with decades of experience in manufacturing and technology sectors. Headquartered in Hyderabad with state-of-the-art manufacturing facilities across India, we take pride in delivering cutting-edge products that combine innovation, quality, and affordability.
            </p>
            <p className="text-gray-600 mb-4">
              Our flagship brand "Ogera" represents our commitment to excellence and our passion for enhancing the way people interact with technology in their daily lives. Backed by the expertise and resources of Quality Group International, we combine fresh perspectives with industry expertise to create products that anticipate and exceed customer expectations.
            </p>
            <p className="text-gray-600">
              With a team of dedicated professionals and a presence across the world, we are rapidly expanding our footprint while maintaining our core values of quality, innovation, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Parent Company Section
const ParentCompany = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Parent Company</h2>
            <p className="text-gray-600 mb-4">
              Quality Group International is a diversified conglomerate with a rich history of excellence across multiple industries. Founded with a vision to provide world-class products and services, the Group has expanded its presence across manufacturing, technology, infrastructure, and consumer goods sectors.
            </p>
            <p className="text-gray-600 mb-4">
              With a global footprint spanning multiple countries and a workforce of over 6,000 professionals, Quality Group International has established itself as a trusted name synonymous with reliability, innovation, and excellence.
            </p>
            <p className="text-gray-600">
              Our parent company's extensive experience and strong industry relationships provide Quality Ogera International LLP with a robust foundation for growth and expansion in the competitive electronics and household appliances market.
            </p>
            <div className="mt-6">
              <a href="https://www.qualitygroupintl.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300">
                Visit Parent Company Website
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <img 
              src={Quality}
              alt="Quality Group International Headquarters" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Mission & Vision Section
const MissionVision = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Mission & Vision</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To design and deliver innovative electronics and household appliances that simplify everyday tasks, enhance living experiences, and contribute to a sustainable future. We strive to make cutting-edge technology accessible to all segments of society while maintaining the highest standards of quality and reliability.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be recognized as India's most trusted and innovative brand in electronics and household appliances by 2030. We envision a world where our products empower people through technology that is intuitive, reliable, and environmentally responsible, building lifelong relationships with customers based on trust and value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Our Business Section
const OurBusiness = () => {
  const businesses = [
    {
      title: "Home Appliances",
      description: "Energy-efficient refrigerators, washing machines, air conditioners, and kitchen appliances designed for the modern Indian household.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Consumer Electronics",
      description: "Smart TVs, audio systems, and personal electronic devices featuring the latest technology and elegant design.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Smart Home Solutions",
      description: "Integrated home automation systems that connect and control multiple devices to enhance security, energy efficiency, and convenience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Commercial Solutions",
      description: "Specialized appliances and systems for businesses, hospitality, and commercial establishments with emphasis on durability and efficiency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Business</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            At Quality Ogera International LLP, our business spans multiple segments within the electronics and household appliances industry, catering to diverse consumer needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businesses.map((business, index) => (
            <div key={index} className="p-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">
                {business.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{business.title}</h3>
              <p className="text-gray-600">{business.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Our Growth Section
const OurGrowth = () => {
  const milestones = [
    {
      year: "Sep 2024",
      title: "Company Founded",
      description: "Quality Ogera International LLP established as a subsidiary of Quality Group International"
    },
    {
      year: "Oct 2024",
      title: "Product Development",
      description: "R&D team assembled and first product prototypes developed"
    },
    {
      year: "Nov 2024",
      title: "Manufacturing Setup",
      description: "Establishment of manufacturing facility with capacity of 50,000 units monthly"
    },
    {
      year: "Dec 2024",
      title: "Product Launch",
      description: "Launch of first product line featuring smart kitchen appliances under the Ogera brand"
    },
    {
      year: "Jan 2025",
      title: "Market Expansion",
      description: "Expanded to 5 major cities across India with dedicated retail partnerships"
    },
    {
      year: "Feb 2025",
      title: "Online Presence",
      description: "Launch of e-commerce website and partnerships with major online retailers"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Growth</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Since our inception in September 2024, we've achieved remarkable growth through innovation, strategic partnerships, and an unwavering commitment to quality.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200"></div>
            
            {/* Timeline items */}
            {milestones.map((milestone, index) => (
              <div key={index} className={`mb-12 relative ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                <div className="flex items-center justify-center mb-4 md:mb-0">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-purple-600 z-10"></div>
                </div>
                
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 p-4">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Our Brand Section
const OurBrand = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src={backimage} 
              alt="Ogera Brand Logo" 
              className="mx-auto h-64 object-contain"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Ogera Brand</h2>
            <p className="text-gray-600 mb-4">
              The Ogera brand represents our commitment to bringing innovation into everyday living. Our name derives from "Odyssey in a New Era" - symbolizing our journey to redefine household experiences through technology.
            </p>
            <p className="text-gray-600 mb-4">
              Our distinctive purple brand color represents creativity, wisdom, and quality, while our sleek design language emphasizes minimalism and functionality - the cornerstones of our product philosophy.
            </p>
            <p className="text-gray-600 mb-6">
              Every product bearing the Ogera name undergoes rigorous quality testing and is backed by our comprehensive customer service, ensuring that our customers experience nothing but excellence.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-purple-700 font-medium">Innovation</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-purple-700 font-medium">Quality</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-purple-700 font-medium">Reliability</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-purple-700 font-medium">Elegance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Chairman's Message Section
const ChairmanMessage = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Chairman's Message</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="relative">
              <img 
                src={CEO}
                alt="Chairman" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-red-600 bg-opacity-90 p-4 text-white text-center">

                <h3 className="text-xl font-bold">Shamsudheen Olakara.</h3>
                <p className="text-sm">Chairman & Founder, Quality Group International</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
              </svg>
              
              <p className="text-gray-600 italic mb-4">
                "At Quality Group International, we have always believed in creating products that transform lives. With the launch of Quality Ogera International LLP, we are proud to extend our legacy of excellence into the consumer electronics space."
              </p>
              
              <p className="text-gray-600 italic mb-4">
                "Our commitment to innovation, quality, and customer satisfaction has been the cornerstone of our success for decades. With Ogera, we aim to bring the same values to modern households, empowering families with technology that enhances their daily lives."
              </p>
              
              <p className="text-gray-600 italic mb-4">
                "As we venture into this exciting new chapter, we remain dedicated to our vision of creating products that not only meet but anticipate the evolving needs of our customers. The future is bright, and together with our customers, we look forward to creating a world where technology serves humanity in the most beneficial ways."
              </p>
              
              <div className="mt-6 flex justify-end">
                <div className="text-right">
                
                  <p className="text-gray-800 font-medium">Shamsudheen Olakara</p>
                  <p className="text-gray-600 text-sm">Chairman & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Team Section - Modified to use a single full-width image
const OurTeam = () => {
    return (
      <div className="team-section w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Leadership Team</h2>
        
        <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
          Our company is led by industry veterans with extensive experience in electronics, technology, and consumer markets.
        </p>
        
        {/* Full-width poster-style image with controlled height */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden">
          <img 
            src={team} 
            alt="Our Leadership Team" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <p className="text-center text-lg max-w-3xl mx-auto">
          Our leadership team brings together diverse expertise from technology, manufacturing, and consumer markets.
        </p>
      </div>
    );
  };
  

// Complete AboutUs Component
const AboutUs = () => {
  return (
    <>
      <Header/>
      <HeroComponent />
      <CorporateOverview />
      <ParentCompany />
      <MissionVision />
      <OurBusiness />
      <OurGrowth />
      <OurBrand />
      <ChairmanMessage />
      <OurTeam />
      <Footer/>
    </>
  );
};

export default AboutUs;