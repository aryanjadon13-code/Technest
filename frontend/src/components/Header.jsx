import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import Button from "./Button";
import { Menu, X, UserCircle, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useCart } from "../context/CartContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="left-0 right-0 z-50 w-full bg-black select-none">
      <div className="flex justify-between items-center h-16 bg-[#f6f6f7] px-6">
        {/* Logo */}
        <Link to="/">
          <div className="cursor-pointer">
            <img className="h-auto w-40" src={Logo} alt="TechNest logo" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="space-x-7 hidden md:flex cursor-pointer">
          <Link to="/home">
            <li className="hover:text-gray-600 transition">Home</li>
          </Link>
          <Link to="/sell">
            <li className="hover:text-gray-600 transition">Sell</li>
          </Link>
          <Link to="/buy">
            <li className="hover:text-gray-600 transition">Buy</li>
          </Link>
          <Link to="/aboutus">
            <li className="hover:text-gray-600 transition">About Us</li>
          </Link>
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-200 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-200 transition">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="relative">
                <li className="hover:text-gray-600 transition flex items-center">
                  <ShoppingCart size={20} className="mr-1" />
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </li>
              </Link>

              <div className="relative">

                {/* User Icon */}

                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  <UserCircle size={28} className="text-blue-700" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2a3031] px-6 pb-4 space-y-4 text-white">
          <ul className="space-y-3 cursor-pointer">
            <Link to="/home">
              <li className="hover:text-gray-300">Home</li>
            </Link>
            <Link to="/buy">
              <li className="hover:text-gray-300">Buy</li>
            </Link>
            <Link to="/sell">
              <li className="hover:text-gray-300">Sell</li>
            </Link>
            <Link to="/aboutus">
              <li className="hover:text-gray-300">About Us</li>
            </Link>
            <Link to="/cart">
              <li className="hover:text-gray-300 flex items-center">
                <ShoppingCart size={20} className="mr-2" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </li>
            </Link>
          </ul>

          <div className="flex space-x-3 w-full ">
            {!user ? (
              <>
                <Link className="flex-1" to="/login">
                  <Button className="w-full" text="Login" />
                </Link>
                <Link className="flex-1" to="/signup">
                  <Button className="w-full" text="Signup" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <Button className="justify-" text="Profile" />
                </Link>
                <Button
                  className="flex-1"
                  text="Logout"
                  onClick={handleLogout}
                />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
