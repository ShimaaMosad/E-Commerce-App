"use client";
import React, { useContext, useEffect, useState } from "react";
import getLoggedUserCart from "@/src/CartActions/etLoggedUserCart";
import RemoveItemFromCart from "@/src/CartActions/removeCartItem";
import { toast } from "sonner";
import updateCartQuantity from "@/src/CartActions/updateCartQuantity";
import { Button } from "@/components/ui/button";
import ClearCart from "@/src/CartActions/clearCartTable";
import { CartContext } from "@/src/context/CartContext";
import Link from "next/link";
import { CartProductType } from "@/src/types/Cart.type";
import Image from "next/image";

export default function Cart() {
  const [products, setproducts] = useState<CartProductType[]>([]);
  const [isloading, setisloading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false);
  const [updateDisable, setupdateDisable] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);
  const [currentId, setcurrenId] = useState("");
  const [total, settotal] = useState(0);
  const { numberOfCartItem, setnumberOfCartItem } = useContext(CartContext)!;
  const [cartId, setcartId] = useState("");

  async function clear() {
    const res = await ClearCart();
    if (res.message === "success") {
      setproducts([]);
    }
  }

  async function updateproduct(id: string, count: string, sign: string) {
    setcurrenId(id);
    setupdateDisable(true);
    setupdateLoading(true);
    setremoveDisable(true);

    const res = await updateCartQuantity(id, count);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Quantity updated successfully", {
        position: "top-center",
        duration: 3000,
      });
      if (sign === "+") {
        setnumberOfCartItem(numberOfCartItem + 1);
      } else if (sign === "-") {
        setnumberOfCartItem(numberOfCartItem - 1);
      }
      getuserCart();
    } else {
      toast.error("can't update quantity now!", {
        position: "top-center",
        duration: 3000,
      });
    }

    setupdateLoading(false);
    setupdateDisable(false);
    setremoveDisable(false);
  }

  async function getuserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        settotal(res.data.totalCartPrice);
        setcartId(res.data._id);
        setproducts(res.data.products);
        setisloading(false);
      }
    } catch {
      setisloading(true);
    }
  }

  async function deleteproduct(id: string) {
    setremoveDisable(true);
    setupdateDisable(true);
    const res = await RemoveItemFromCart(id);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("product deleted successfully", {
        position: "top-center",
        duration: 3000,
      });
      let sum = 0;
      res.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      getuserCart();
      setnumberOfCartItem(sum);
    } else {
      toast.error("can't delete product now!", {
        position: "top-center",
        duration: 3000,
      });
    }
    setremoveDisable(false);
    setupdateDisable(false);
  }

  useEffect(() => {
    getuserCart();
  }, []);

  if (isloading) {
    return (
      <h1 className="text-center text-3xl font-bold my-12 text-slate-900">
        loading.....
      </h1>
    );
  }

  return (
    <>
      {products?.length > 0 ? (
        <div className="w-2/3 mx-auto my-12">
          <div className="flex justify-end">
            <Button
              onClick={() => clear()}
              className="cursor-pointer bg-red-700 hover:bg-red-600 my-4"
            >
              Clear ALL
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-center text-3xl font-bold text-blue-700 my-4 ">
              total Cart Price: {total}
            </h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    IMAGE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        src={product.product.imageCover}
                        alt={product.product.title}
                        width={128}
                        height={128}
                        className="w-16 md:w-32 max-w-full max-h-full"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={updateDisable}
                          onClick={() =>
                            updateproduct(
                              product.product.id,
                              `${product.count - 1}`,
                              "-"
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
                  disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                          type="button"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <div>
                          {product.product.id === currentId ? (
                            updateLoading ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span>{product.count}</span>
                            )
                          ) : (
                            <span>{product.count}</span>
                          )}
                        </div>

                        <button
                          disabled={updateDisable}
                          onClick={() =>
                            updateproduct(
                              product.product.id,
                              `${product.count + 1}`,
                              "+"
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
                  disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                          type="button"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>

                    <td className="px-6 py-4">
                      <button
                        disabled={removeDisable}
                        onClick={() => deleteproduct(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href={`/checkout/${cartId}`}>
            <Button className="bg-blue-700 text-white w-full cursor-pointer my-4 p-6 hover:bg-blue-600 ">
              Checkout Now
            </Button>
          </Link>
        </div>
      ) : (
        <h1 className="text-center text-3xl font-bold my-12 text-red-600 ">
          no products added yet!
        </h1>
      )}
    </>
  );
}
