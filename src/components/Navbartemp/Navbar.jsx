import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';
import { ShoppingCart, X, Menu as MenuIcon } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload(); // Reload or redirect to home/login
  };

  return (
    <nav className="bg-[#4b3621] shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="relative flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
            alt="Coffee Logo"
            className="h-10 w-10 z-10"
          />
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-6 bg-black opacity-70 rounded-full animate-steam"></div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-[#f8f1e4] hover:text-[#e0c9a6] font-medium">
            Home
          </Link>
          <Link to="/menu" className="text-[#f8f1e4] hover:text-[#e0c9a6] font-medium">
            Menu
          </Link>
          <Link to="/about" className="text-[#f8f1e4] hover:text-[#e0c9a6] font-medium">
            About
          </Link>

          <Link to="/cart" className="relative group">
            <ShoppingCart className="text-[#f8f1e4] group-hover:text-[#e0c9a6]" size={24} />
          </Link>

          {user ? (
            <div className="ml-4 text-[#f8f1e4] font-medium flex items-center space-x-3">
              <span>Hello, {user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-[#f8f1e4] text-[#4b3621] px-3 py-1 rounded-full hover:bg-[#e0c9a6] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-4 bg-[#f8f1e4] hover:bg-[#e0c9a6] text-[#4b3621] font-semibold px-4 py-1.5 rounded-full transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="text-[#f8f1e4] w-6 h-6" />
            ) : (
              <MenuIcon className="text-[#f8f1e4] w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-[#4b3621] text-[#f8f1e4] overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0c9a6] font-medium">
            Home
          </Link>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0c9a6] font-medium">
            Menu
          </Link>
          <Link to="/table" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0c9a6] font-medium">
            Book Table
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0c9a6] font-medium">
            About
          </Link>
          <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#e0c9a6] font-medium">
            Cart
          </Link>

          {user ? (
            <>
              <span className="font-medium">Hello, {user.name || user.email}</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="bg-[#f8f1e4] text-[#4b3621] font-semibold px-6 py-2 rounded-full hover:bg-[#e0c9a6] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-[#f8f1e4] hover:bg-[#e0c9a6] text-[#4b3621] font-semibold px-6 py-2 rounded-full transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Steam Animation Styles */}
      <style jsx>{`
        @keyframes steamRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0;
          }
        }
        .animate-steam {
          animation: steamRise 2s infinite ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
