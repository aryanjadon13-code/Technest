import React, { useState, useRef } from "react"; // Import useRef
import Header from "./Header";
import { db, storage } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../Firebase";
import { serverTimestamp } from "firebase/firestore";

function Sell() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create a ref for the file input to clear its value
  const fileInputRef = useRef(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Simple validation
    if (!title || !price || !description) {
        setError("Please fill out all required fields.");
        setLoading(false);
        return;
    }

    try {
      let imageUrl = "";

      if (image) {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Save product details to Firestore
      await addDoc(collection(db, "products"), {
        title,
        category,
        price: parseFloat(price), // Ensure price is stored as a number
        description,
        imageUrl,
        sellerEmail: auth.currentUser.email,
        createdAt: serverTimestamp(),
      });

      setSuccess("✅ Product listed successfully!");
      setTitle("");
      setCategory("Laptop");
      setPrice("");
      setDescription("");
      setImage(null);
      if (fileInputRef.current) { // Clear the file input visually
        fileInputRef.current.value = "";
      }
    } catch (firebaseError) {
      console.error("Error adding product:", firebaseError);
      setError("Failed to list product. Ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) { // Clear the file input visually
      fileInputRef.current.value = "";
    }
  };

  const inputClass = `appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm`;
  const labelClass = `block text-sm font-medium text-gray-700 mb-1`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header />

      <div className="flex flex-1 items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 md:p-12 w-full max-w-md my-12"
        >
          
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 mb-4 bg-indigo-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                <path d="M7.7 20c.34-.44.75-.82 1.2-1.12C9.4 18.5 10.5 18 12 18s2.6.5 3.1 1.08c.45.3.86.68 1.2 1.12"/><path d="m19 12-4 4h-5l-4-4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7Z"/><path d="M12 18v6"/>
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 select-none tracking-tight">
              List Your Product
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Set the price and description for your item.
            </p>
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <p>{success}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <p>{error}</p>
            </div>
          )}

          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title-input" className={labelClass}>Product Title</label>
            <input
              id="title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label htmlFor="category-select" className={labelClass}>Category</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-5">
            <label htmlFor="price-input" className={labelClass}>Price (₹)</label>
            <input
              id="price-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label htmlFor="description-textarea" className={labelClass}>Description</label>
            <textarea
              id="description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className={inputClass}
            ></textarea>
          </div>

          {/* Image Upload and Removal */}
          <div className="mb-6">
            <label className={labelClass}>Upload Image</label>
            <input
              type="file"
              ref={fileInputRef} // Assign the ref here
              onChange={handleImageChange} // Use the new handler
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {image && ( // Conditionally render image name and remove button
              <div className="flex items-center mt-2 text-sm text-gray-700">
                <span className="truncate max-w-[calc(100%-30px)]">{image.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveImage} // Use the new handler
                  className="ml-2 p-1 rounded-full text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "List Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sell;
