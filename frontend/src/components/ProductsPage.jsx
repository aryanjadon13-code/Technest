import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import Header from "./Header";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">
          Available Products
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <img
                  src={
                    item.imageUrl ||
                    item.imageURL ||
                    "https://via.placeholder.com/300"
                  }
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <p className="text-green-600 font-bold text-lg mb-4">
                    ₹{item.price}
                  </p>

                  {/* ⭐ Buttons Section: View Details + Chat (Horizontal) */}
                  <div className="flex space-x-3">
                    {/* View Details */}
                    <Link to={`/product/${item.id}`} className="w-1/2">
                  
                      <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                        Details
                      </button>
                    </Link>

                    {/* Chat */}
                    <Link to={`/chat/${item.id}`} className="w-1/2">
                      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Chat
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
