import React from 'react';
import API from '../api';

const AboutPage = () => {
  return (
    <div className="bg-[#f4f1e1] text-[#4b3621] min-h-screen py-16 px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">About Us</h1>
        <p className="max-w-xl mx-auto text-lg animate-fadeIn delay-200">
          Brewing joy since 2020. Discover our journey and passion behind every cup.
        </p>
      </div>
      

      {/* About Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="animate-slideInLeft">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
            alt="Our Café"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Text */}
        <div className="animate-slideInRight">
          <h2 className="text-3xl font-semibold mb-4">A Passion for Coffee</h2>
          <p className="mb-4 leading-relaxed">
            At Brew & Bliss, we believe coffee is more than a drink—it's an experience. Our journey began with a small café in the heart of town and a dream to serve happiness in a cup.
          </p>
          <p className="mb-4 leading-relaxed">
            Every bean is carefully sourced, and every brew is crafted with care by our passionate baristas. Whether it's your morning fuel or your evening comfort, we’re here to make it special.
          </p>
          <p className="italic text-sm text-[#6f4e37]">
            “Great coffee, great conversations, great community.”
          </p>
        </div>
      </div>

      {/* Team or Fun Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold mb-4 animate-fadeIn">Meet Our Team</h3>
        <p className="max-w-2xl mx-auto mb-8 animate-fadeIn delay-200">
          A group of caffeine-fueled dreamers, creators, and baristas.
        </p>

        <div className="flex justify-center gap-8 flex-wrap animate-fadeIn delay-300">
          <div className="w-40">
            <img
              src="/Img/found.jpg"
              className="rounded-full mb-2 w-40 h-40 object-cover shadow-md"
              alt="Founder"
            />
            <p className="font-semibold">Jatin</p>
            <p className="text-sm">Founder</p>
          </div>
          <div className="w-40">
            <img
              src="/Img/bar.png"
              className="rounded-full mb-2 w-40 h-40 object-cover shadow-md"
              alt="Barista"
            />
            <p className="font-semibold">Ajay</p>
            <p className="text-sm">Head Barista</p>
          </div>
          <div className="w-40">
            <img
              src="/Img/mana.jpg"
              className="rounded-full mb-2 w-40 h-40 object-cover shadow-md"
              alt="Manager"
            />
            <p className="font-semibold">Daniel</p>
            <p className="text-sm">Café Manager</p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
