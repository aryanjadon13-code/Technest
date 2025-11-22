import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { auth, db } from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    price: "",
    description: "",
  });

  // ✅ Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserProducts(currentUser.email);
      } else {
        setUser(null);
        setUserProducts([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch products listed by this user
  const fetchUserProducts = async (email) => {
    try {
      const q = query(
        collection(db, "products"),
        where("sellerEmail", "==", email)
      );
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserProducts(products);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  // ✅ Delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        setUserProducts(userProducts.filter((p) => p.id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // ✅ Start editing a product
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditedData({
      title: product.title,
      price: product.price,
      description: product.description,
    });
  };

  // ✅ Save edited product
  const handleSaveEdit = async (productId) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, editedData);
      setEditingProduct(null);
      fetchUserProducts(user.email);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-700 text-lg">
        Loading your profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          You are not logged in.
        </h2>
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">
            Welcome, {user.displayName || user.email.split("@")[0]} 👋
          </h1>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>User ID:</strong> {user.uid}
          </p>
        </div>

        {/* User’s Listed Products */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Your Listed Products
          </h2>

          {userProducts.length === 0 ? (
            <p className="text-gray-500">
              You haven’t listed any products yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-gray-50 p-4"
                >
                  {product.imageURL && (
                    <img
                      src={product.imageURL}
                      alt={product.title}
                      className="h-48 w-full object-cover rounded-md"
                    />
                  )}

                  {/* ✅ Editable fields */}
                  {editingProduct === product.id ? (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={editedData.title}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            title: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded mb-2"
                      />
                      <input
                        type="number"
                        value={editedData.price}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            price: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded mb-2"
                      />
                      <textarea
                        value={editedData.description}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded mb-2"
                        rows="3"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveEdit(product.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {product.description || "No description"}
                      </p>
                      <p className="text-blue-600 font-semibold mt-2">
                        ₹{product.price}
                      </p>

                      {/* ✅ Edit and Delete Buttons */}
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
