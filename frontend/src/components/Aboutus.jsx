import React from "react";
import Header from "./Header";

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-gray-100">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          About <span className="text-yellow-300">TechNest</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90">
          Building a community of innovators, creators, and learners through
          technology, collaboration, and shared vision.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              🌍 Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To create a platform where people can learn, innovate, and grow
              together. We aim to make technology accessible, inclusive, and
              impactful for everyone.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              🚀 Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To be a global hub of innovation that bridges the gap between
              people and technology — inspiring the next generation of creators
              and changemakers.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Meet Our <span className="text-blue-600">Team</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/200"
              alt="Team Member"
              className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100"
            />
            <h3 className="text-xl font-semibold text-gray-800">Aryan Jadon</h3>
            <p className="text-gray-600">Founder & Developer</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/200"
              alt="Team Member"
              className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Team Member 2
            </h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/200"
              alt="Team Member"
              className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Team Member 3
            </h3>
            <p className="text-gray-600">Marketing Lead</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} TechNest. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default AboutUs;
