import cafe from '/Img/cafe.jpeg';
import download from '/Img/download.jpeg'
import iced from '/Img/iced.jpeg';
import mocha from '/Img/mocha.jpeg';
import capp from '/Img/capp.jpg';
import chpa from '/Img/chpa.jpg';
import cara from '/Img/cara.jpg';
import API from '../api';
import sand from '/Img/sand.jpg';

const menuItems = [
  {
    name: 'Caffe Americcano',
    image: cafe,
    description: 'Rich espresso with steamed milk and buttery caramel.',
    price: 'Rs. 199',
  },
  {
    name: 'Iced Coffee',
    image: iced,
    description: 'Bold cold brew poured over ice. Crisp and energizing.',
    price: 'Rs. 399',
  },
  {
    name: 'Classic Cappuccino',
    image: capp,
    description: 'Bold espresso topped with thick milk foam.',
    price: 'Rs. 249',
  },
  {
    name: 'Chilli Cheese Toast',
    image: chpa,
    description: 'Chilled espresso, milk, and sweet vanilla flavor.',
    price: 'Rs. 280',
  },
  {
    name: 'Caramel Macchiato',
    image: cara,
    description: 'Rich espresso with steamed milk and buttery caramel.',
    price: 'Rs. 189',
  },
  {
    name: 'Mocha',
    image: mocha,
    description: 'Chocolatey espresso delight with creamy steamed milk.',
    price: 'Rs. 359',
  },
  {
    name: 'Paneer Tikka Sandwich',
    image: sand,
    description: 'Bold espresso topped with thick milk foam.',
    price: 'Rs. 199',
  },
  {
    name: 'Iced Vanilla Latte',
    image: download,
    description: 'Chilled espresso, milk, and sweet vanilla flavor.',
    price: 'Rs. 369',
  },
];

const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemExists = cart.find((cartItem) => cartItem.name === item.name);

  if (itemExists) {
    itemExists.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
};

const MenuPage = () => {
  const handleCheckout = async () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const totalAmount = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return acc + price * item.quantity;
  }, 0);

  try {
    const { data: order } = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalAmount }),
    }).then((res) => res.json());

    const razorpayOptions = {
      key: "your_key_id", // Replace with your Razorpay key ID
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Coffee Shop",
      description: "Order Payment",
      handler: async function (response) {
        const verify = await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...response,
            userId: 1, // Replace with actual user ID from auth context/state
            amount: totalAmount,
          }),
        });

        if (verify.ok) {
          alert("Payment Successful!");
          localStorage.removeItem("cart");
        } else {
          alert("Payment verification failed.");
        }
      },
      theme: {
        color: "#6f4e37",
      },
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Payment failed.");
  }
};

  return (
    <div className="bg-[#f9f5f0] py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#6f4e37] animate-fade-in">Our Delicious Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
          >
            <img
              src={item.image}
              alt={item.name}
              className="rounded-md w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-[#4b3621] mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <p className="font-bold text-[#6f4e37] text-lg">{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-4 bg-[#6f4e37] text-white p-2 rounded-lg hover:bg-[#4b3621]"
            >
              Add to Cart
            </button>
          <div className="mt-4">
            <button
              onClick={() => handleCheckout()}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
               Checkout
            </button>
          </div>
          </div>
          
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default MenuPage;
