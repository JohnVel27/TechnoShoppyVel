import { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();

  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const total = cart
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center relative">

      {/* LOGO */}
      <h1 className="text-lg sm:text-2xl font-bold text-blue-600">
        TechnoShoppyVel
      </h1>

      {/* CART */}
      <div className="relative">

        <button
          className="relative p-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaShoppingCart className="text-2xl text-gray-700" />

          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>

        {/* BACKDROP (mobile UX improvement) */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}

        {/* DROPDOWN */}
        {showDropdown && (
          <div
            className="
              absolute right-0 mt-3
              w-[92vw] sm:w-96
              max-w-md
              bg-white border rounded-xl shadow-2xl
              z-50 overflow-hidden
            "
          >

            {/* HEADER */}
            <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
              <span>Shopping Cart</span>

              <button
                onClick={() => setShowDropdown(false)}
                className="text-white text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-4">

              {/* EMPTY STATE */}
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">
                  Your cart is empty 🛒
                </p>
              ) : (
                <>
                  {/* ITEMS */}
                  <ul className="max-h-72 overflow-y-auto space-y-3 pr-1">

                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 border-b pb-3"
                      >

                        {/* IMAGE */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border flex-shrink-0"
                        />

                        {/* INFO */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {item.qty} × ₱{item.price}
                          </p>
                        </div>

                        {/* PRICE */}
                        <p className="font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap">
                          ₱{(item.price * item.qty).toFixed(2)}
                        </p>

                        {/* DELETE */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FaTrash size={16} />
                        </button>

                      </li>
                    ))}

                  </ul>

                  {/* TOTAL */}
                  <div className="mt-4 flex justify-between items-center border-t pt-3 font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      ₱{total}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <button
                    onClick={clearCart}
                    className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-800 transition"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
