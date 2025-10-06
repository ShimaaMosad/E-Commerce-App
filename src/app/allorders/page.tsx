"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
};

type CartItem = {
  _id: string;
  product: Product;
  count: number;
};


type Order = {
  _id: string;
  paymentMethodType: "card" | "cash";
  totalOrderPrice: number;
  createdAt: string;
  cartItems: CartItem[];
  user?: {
    name?: string;
  };
  shippingAddress?: {
    phone?: string;
    city?: string;
  };
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); 
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/allorders");

        if (res.status === 401) {
          setNotLoggedIn(true);
          setOrders([]);
          return;
        }

        const data: Order[] = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );

  if (notLoggedIn)
    return (
      <p className="p-8 text-center text-red-600 font-semibold">
        You are not logged in. Please{" "}
        <a href="/login" className="text-blue-500 underline">
          login
        </a>{" "}
        to view your orders.
      </p>
    );

  if (orders.length === 0)
    return <p className="p-8 text-center text-gray-600">No orders found.</p>;

  function getStatusBadge(paymentType: string) {
    return paymentType === "card" ? (
      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
        Paid
      </span>
    ) : (
      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
        Cash on Delivery
      </span>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row items-center md:items-stretch border rounded-xl shadow-md bg-white overflow-hidden relative"
          >
            <div className="absolute top-3 right-3">
              {getStatusBadge(order.paymentMethodType)}
            </div>
            <div className="w-full md:w-1/4 bg-gray-100 flex items-center justify-center p-4">
        
              <Image
                src={order.cartItems?.[0]?.product?.imageCover || "/placeholder.png"}
                alt={order.cartItems?.[0]?.product?.title || "Product"}
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
            </div>
            <div className="flex-1 p-6">
              <h2 className="text-lg font-semibold mb-2">
                Order ID:{" "}
                <span className="text-gray-700 font-normal">{order._id}</span>
              </h2>
              <p>
                <strong>Total Price:</strong> {order.totalOrderPrice} EGP
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Customer:</strong> {selectedOrder.user?.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}
            </p>
            <p>
              <strong>City:</strong> {selectedOrder.shippingAddress?.city}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {getStatusBadge(selectedOrder.paymentMethodType)}
            </p>

            <h3 className="mt-4 font-semibold">Products:</h3>
            <ul className="space-y-2 mt-2">
              {selectedOrder.cartItems?.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center gap-3 border p-2 rounded-lg"
                >
                  <Image
                    src={item.product?.imageCover || "/placeholder.png"}
                    alt={item.product?.title || "Product"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.product?.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.count} pcs × {item.product?.price} EGP
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
