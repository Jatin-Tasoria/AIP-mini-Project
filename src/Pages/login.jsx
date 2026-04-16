import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [animating, setAnimating] = useState(false);

  const toggleForm = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({ email: '', password: '' });
      setError('');
      setAnimating(false);
    }, 300); // match animation duration
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password } = formData;
    if (!email || !password) return "Please fill in all fields.";
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const errMsg = validate();
  if (errMsg) return setError(errMsg);

  try {
    const res = await fetch(`http://localhost:5000/api/auth/${isLogin ? "login" : "signup"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
    } else {
      setError("");
      alert(`${isLogin ? "Logged in" : "Signed up"} as ${data.email}`);
      localStorage.setItem("user", JSON.stringify(data));
      navigate('/'); 
    }
  } catch (error) {
    setError("Network error");
  }
};


  return (
    <div className=" min-h-150 flex items-center justify-center bg-[#f8f1e4]">
      <div className="relative w-full max-w-md p-30">
        <div
          className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
            animating ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'
          }`}
          key={isLogin ? 'login' : 'signup'}
        >
          <div className="bg-white p-8 rounded-lg shadow-xl w-full animate-fade-slide">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#4b3621]">
              {isLogin ? "Login to CoffeeHub" : "Create an Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#6f4e37] text-white py-2 rounded-md hover:bg-[#4b3621] transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleForm}
                  className="ml-1 text-[#6f4e37] font-medium hover:underline transition"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-slide {
          animation: fadeSlideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
