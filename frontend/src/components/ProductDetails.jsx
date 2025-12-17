// src/components/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Header from "./Header";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setError("Product not found.");
        } else {
          setProduct({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center p-12 text-gray-600">
          Loading product...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="p-12 text-center text-red-600">{error}</div>
      </div>
    );

  if (!product) return null;

  const imageSrc =
    product.imageUrl || product.imageURL || "https://via.placeholder.com/600";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="col-span-1">
            <img
              src={imageSrc}
              alt={product.title}
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

            <p className="text-gray-700 mb-4">
              {product.description || "No description provided."}
            </p>

            <div className="text-2xl font-semibold text-green-600 mb-4">
              ₹{product.price}
            </div>

            <div className="mb-6 space-y-2">
              <p className="bg-gray-100 inline-block px-3 py-1 rounded-full text-sm text-gray-700 mr-2">
                {product.category}
              </p>

              <p className="text-gray-700 text-sm">
                Seller:{" "}
                <span className="font-semibold">{product.sellerEmail}</span>
              </p>
            </div>

            {/* ⭐ Buttons (Add to Cart + Chat) */}
            <div className="flex space-x-3">
              {/* Add to Cart */}
              <button
                className="w-1/2 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                onClick={() => {
                  addToCart(product);
                  alert("Item added to cart!");
                }}
              >
                Add to Cart
              </button>

              {/* Chat Button */}
              <Link to={`/chat/${product.id}`} className="w-1/2">
                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                  Chat
                </button>
              </Link>
            </div>

            {/* Additional Metadata */}
            <div className="mt-6 text-sm text-gray-500">
              <p>Product ID: {product.id}</p>
              <p>
                Listed on:{" "}
                {product.createdAt?.seconds
                  ? new Date(product.createdAt.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
