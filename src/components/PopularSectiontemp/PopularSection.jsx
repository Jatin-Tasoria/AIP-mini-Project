import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { div } from 'three/tsl';
import download from '/Img/download.jpeg';
import iced from '/Img/iced.jpeg';
import mocha from '/Img/mocha.jpeg';
import API from '../../api';

const PopularSection = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemExists = cart.find((cartItem) => cartItem.title === item.title);

    if (itemExists) {
      itemExists.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.title} added to cart!`);
    
  };

  return (
    <div className="bg-[#f4f1e1] py-16 px-6 text-center relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-[#4b3621]">Today's Popular Picks</h2>

      <div className="flex justify-center items-center relative">
        <button
          onClick={scrollLeft}
          className="absolute left-8 md:left-16 bg-[#4b3621] text-white p-2 rounded-full shadow-md hover:bg-[#6f4e37] z-10"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-hidden transition-transform duration-500 px-2 mx-auto"
          style={{ maxWidth: '1000px' }}
        >
          {coffeeData.map((coffee, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-[300px] transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-rotate-1 animate-card-fade"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={coffee.image}
                  alt={coffee.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-[#4b3621]">{coffee.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{coffee.description}</p>
                <p className="font-semibold text-[#6f4e37]">{coffee.price}</p>
                <button
                  onClick={() => addToCart(coffee)}
                  className="mt-4 bg-[#6f4e37] text-white p-2 rounded-lg hover:bg-[#4b3621]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-8 md:right-16 bg-[#4b3621] text-white p-2 rounded-full shadow-md hover:bg-[#6f4e37] z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style jsx>{`
        @keyframes cardFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-card-fade {
          animation: cardFade 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const coffeeData = [
  {
    title: 'Vanilla Latte',
    image: download,
    description: 'Espresso with steamed milk and vanilla sweetness.',
    price: 'Rs. 369',
  },
  {
    title: 'Iced Coffee',
    image: iced,
    description: 'Bold cold brew poured over ice. Crisp and energizing.',
    price: 'Rs. 399',
  },
  {
    title: 'Mocha',
    image: mocha,
    description: 'Chocolatey espresso delight with creamy steamed milk.',
    price: 'Rs. 359',
  },
];

export default PopularSection;
