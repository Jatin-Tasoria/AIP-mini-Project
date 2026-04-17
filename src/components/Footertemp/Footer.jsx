import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import API from '../../api';

const Footer = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/contact', {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert(result.error || 'Failed to send message');
    }
  } catch (error) {
    alert('Error sending message');
    console.error(error);
  }

  setLoading(false);
};

  return (
    <footer className="bg-[#4b3621] text-white pt-16 pb-10 px-6 md:px-20 animate-fade-in">
      <div className="grid md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Bean Bliss Café</h2>
          <p className="text-sm text-gray-300">
            Sip, Relax, and Enjoy! We serve freshly brewed coffee with love and warmth in every cup. Come visit us today!
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="https://www.facebook.com/"><Facebook className="hover:text-yellow-300" /></a>
            <a href="https://www.instagram.com/"><Instagram className="hover:text-yellow-300" /></a>
            <a href="https://x.com/?lang=en-in"><Twitter className="hover:text-yellow-300" /></a>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded bg-white text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <textarea
              placeholder="Message"
              className="w-full px-3 py-2 rounded bg-white text-black"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#d1bfa7] hover:bg-[#c8a97e] text-[#4b3621] font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Visit Us</h2>
          <p className="text-sm text-gray-300 mb-2 flex items-center">
            <Mail className="w-4 h-4 mr-2" /> contact@brewNbliss.com
          </p>
          <p className="text-sm text-gray-300 mb-2 flex items-center">
            <Phone className="w-4 h-4 mr-2" /> +91 95011-XXXXX
          </p>
          <p className="text-sm text-gray-300">
            123 Brew Lane, Caffeine City, CA 90210
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-600 pt-6">
        © {new Date().getFullYear()} Brew 'N' BLISS Café. All rights reserved.
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
