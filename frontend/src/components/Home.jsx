import React from "react";
import Header from "./Header";
import { Laptop, Smartphone, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover. Buy. Sell. Upgrade.
        </h1>
        <p className="max-w-2xl text-lg mb-6">
          Welcome to <span className="font-semibold">TechNest</span> – your
          trusted marketplace for second-hand gadgets and accessories.
        </p>
        <div className="flex space-x-4">
          <Link to="/productpage">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
              Start Shopping
            </button>
          </Link>
          <Link to="/sell">
          <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-blue-600">
            Sell Your Tech
          </button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 md:px-16 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <Laptop size={48} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Laptops</h3>
            <p className="text-gray-600 text-sm">
              Browse second-hand laptops at affordable prices.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <Smartphone size={48} className="text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smartphones</h3>
            <p className="text-gray-600 text-sm">
              Find top deals on used smartphones.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <Headphones size={48} className="text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Accessories</h3>
            <p className="text-gray-600 text-sm">
              Shop headphones, chargers, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="px-6 md:px-16 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition"
            >
              <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Product {item}</h3>
              <p className="text-gray-600 mb-3">$ {item * 100 + 199}</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Join Community Section */}
      <section className="px-6 md:px-16 py-20 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Join the TechNest Community</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Sign up today to sell your old gadgets, find amazing deals, and
          connect with tech lovers like you.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#2a3031] text-white py-6 text-center mt-auto">
        <p>© 2025 TechNest. Built with ❤️ for tech lovers.</p>
      </footer>
    </div>
  );
}

export default HomePage;
