import React, { useState } from "react";
// Removed import Button from "./Button"; as it is no longer used in the hero section
import { Shield, Heart, Users } from "lucide-react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import Header from "./Header";
import heroTechImage from "../assets/heroTechImage.png";

function Landingpage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen ">
      <Header />

      {/* START: Hero Section with Background Image (Button Removed) */}
      <div
        className="relative bg-cover bg-center h-[90vh] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${heroTechImage})` }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative mx-auto max-w-3xl text-center p-4">
          <h1 className="my-10 font-bold text-4xl md:text-6xl mb-6 mt-15">
            Buy & Sell Tech Items{" "}
            <span className="text-blue-300">Sustainably</span>
          </h1>
          <p className="text-xl mx-auto max-w-2xl">
            TechNest is the marketplace for buying and selling second-hand tech
            products. Extend the life of your gadgets and find great deals!
          </p>
          {/* The Call to Action button div has been removed */}
        </div>
      </div>
      {/* END: Hero Section with Background Image */}

      <section id="features" className="py-16 bg-white select-none">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-17 mt-">
            Why Choose TechNest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 shadow-xl hover:shadow-2xl ">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600 " />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-600">
                Our secure payment system protects both buyers and sellers
                throughout the transaction process.
              </p>
            </div>
            <div className="text-center p-6  hover:shadow-2xl shadow-xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
              <p className="text-gray-600">
                All sellers are verified to ensure authentic products and
                reliable transactions.
              </p>
            </div>
            <div className="text-center p-6  hover:shadow-2xl shadow-xl">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Tech</h3>
              <p className="text-gray-600">
                Extend the life of your gadgets and reduce electronic waste by
                buying and selling pre-loved tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features_2" className="py-16 bg-gray-100  mb-6 select-none">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            How TechNest Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 ">
              <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <h1 className="text-xl font-bold text-white">1</h1>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up for free and set up your seller profile in minutes.
              </p>
            </div>
            <div className="text-center p-6 ">
              <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <h1 className="text-xl font-bold text-white">2</h1>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Items</h3>
              <p className="text-gray-600">
                Add photos, description, and price for your tech items.
              </p>
            </div>
            <div className="text-center p-6 ">
              <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <h1 className="text-xl font-bold text-white">3</h1>
              </div>
              <h3 className="text-xl font-semibold mb-2"> Sell & Buy</h3>
              <p className="text-gray-600">
                Connect with buyers, ship your items, and get paid securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="text-center md:text-left md:ml-8 ml-0">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Where Old Tech Finds{" "}
              <span className="text-blue-600">New Home</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              At TechNest, we make it easy for your gadgets to live longer. Sell
              or buy quality pre-loved devices, save money, and help reduce
              e-waste while getting the best deals on technology.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center md:ml-10 ml-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4727/4727259.png"
              alt="Tech illustration"
              className="w-80 h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landingpage;
