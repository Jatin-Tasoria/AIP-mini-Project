import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const MenuButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/menu');
  };

  return (
    <div className="bg-[#f4f1e1] flex justify-center py-3">
      <button
        className="menu-btn"
        onClick={handleClick}
        aria-label="Explore Menu"
        type="button"
      >
        <span className="menu-text">Explore Menu</span>
      </button>

      <style jsx>{`
        .menu-btn {
          position: relative;
          display: inline-block;
          padding: 16px 32px;
          background-color: #6f4e37;
          color: white;
          font-size: 18px;
          font-weight: bold;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transform: translateY(0);
          animation: bounce 2s ease-out infinite;
          transition: transform 0.3s ease-in-out, background-color 0.3s;
        }

        .menu-btn:hover,
        .menu-btn:focus {
          background-color: #5a3c2a;
          transform: scale(1.1) translateY(-5px);
          outline: none;
        }

        .menu-text {
          display: inline-block;
          position: relative;
        }

        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-8px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MenuButton;
