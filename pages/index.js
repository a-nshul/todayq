import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { message } from 'antd';

export default function Home() {
  const [contentOfferings, setContentOfferings] = useState([]);

  useEffect(() => {
    fetchContentOfferings();
  }, []);

  const fetchContentOfferings = async () => {
    try {
      const response = await axios.get('/api/content-offerings');
      setContentOfferings(response.data);
    } catch (error) {
      console.error('Error fetching content offerings', error);
    }
  };

  const handleAddToCart = async (offeringId) => {
    try {
      await axios.post('/api/cart', { contentOfferingId: offeringId, quantity: 1 });
      message.success('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart', error);
      message.error('Failed to add item to cart');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content Offerings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contentOfferings.map((offering) => (
          <div key={offering._id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{offering.title}</h2>
            <p>{offering.description}</p>
            <p className="text-lg font-bold">${offering.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded"
              onClick={() => handleAddToCart(offering._id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/add-offering" legacyBehavior>
          <a className="bg-green-500 text-white p-2 rounded">Add New Offering</a>
        </Link>
        <Link href="/cart" legacyBehavior>
          <a className="ml-4 bg-yellow-500 text-white p-2 rounded">View Cart</a>
        </Link>
      </div>
    </div>
  );
}
