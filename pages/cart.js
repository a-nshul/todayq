import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useRouter } from 'next/router';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post('/api/transactions');
      message.success('Checkout successful!');
      fetchCart();
    } catch (error) {
      console.error('Error during checkout', error);
      message.error('Checkout failed');
    }
  };

  if (!cart) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center text-bold text-xl mb-4">
          Loading cart...
        </div>
        <button onClick={() => router.push('/')} className="bg-gray-800 text-white p-2 rounded">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="mb-4">
        {cart.items.map((item) => (
          <div key={item._id} className="border p-4 rounded mb-2">
            <h2 className="text-xl font-bold">{item.contentOffering.title}</h2>
            <p>{item.contentOffering.description}</p>
            <p className="text-lg font-bold">
              ${item.contentOffering.price} x {item.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className="text-lg font-bold mb-4">
        Total: ${cart.items.reduce((total, item) => total + item.contentOffering.price * item.quantity, 0)}
      </div>
      <button onClick={handleCheckout} className="bg-green-500 text-white p-2 rounded">Checkout</button>
    </div>
  );
}
