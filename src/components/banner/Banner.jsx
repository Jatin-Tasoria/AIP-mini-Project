import React from 'react';

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white px-6 py-24 md:py-32 text-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1950&q=80')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Floating Images */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3043/3043316.png"
        className="w-12 md:w-16 absolute top-10 left-10 animate-float-slow opacity-80 z-10"
        alt="Floating Bean"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/1037/1037762.png"
        className="w-14 md:w-20 absolute bottom-12 right-8 animate-float-medium opacity-80 z-10"
        alt="Coffee Cup"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/590/590836.png"
        className="w-10 md:w-14 absolute top-24 right-24 animate-float-fast opacity-60 z-10"
        alt="Coffee Bean"
      />

      {/* Banner Content */}
      <div className="relative z-20 max-w-4xl mx-auto animate-fade-up">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[Pacifico]">
          Gives You Push To Keep Working For Your Dream
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Freshly roasted beans. Handcrafted flavors. A place to sip, relax, and stay a while.
        </p>
        
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes floatSlow {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes floatMedium {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes floatFast {
          0% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-10px) rotate(0deg);
          }
          100% {
            transform: translateY(0px) rotate(-3deg);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: floatMedium 4s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: floatFast 3s ease-in-out infinite;
        }

        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Banner;
