import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const Header = () => {
    const [showDropdown, setShowDropDown] = useState(false);
    const { cart, removeFromCart, clearCart } = useCart();

    const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const total = cart
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
            
            {/* Logo */}
            <h1 className="text-2xl font-bold text-blue-600">
                TechnoShoppyVel
            </h1>

            {/* Cart */}
            <div className="relative">
                <button
                    className="cursor-pointer relative"
                    onClick={() => setShowDropDown(!showDropdown)}
                >
                    <FaShoppingCart className="text-2xl text-gray-700" />

                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </button>

                {/* Dropdown */}
                {showDropdown && (
                    <div className="absolute right-0 mt-3 w-96 bg-white border rounded-xl shadow-2xl z-50 overflow-hidden">

                        {/* Header */}
                        <div className="bg-blue-600 text-white p-3 font-semibold">
                            Shopping Cart
                        </div>

                        <div className="p-4">
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-sm text-center py-6">
                                    Your cart is empty 🛒
                                </p>
                            ) : (
                                <>
                                    {/* Items */}
                                    <ul className="max-h-64 overflow-y-auto space-y-3">
                                        {cart.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex items-center gap-3 border-b pb-3"
                                            >
                                                {/* Product Image */}
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-14 h-14 object-cover rounded-lg border"
                                                />

                                                {/* Info */}
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.qty} × ₱{item.price}
                                                    </p>
                                                </div>

                                                {/* Subtotal */}
                                                <p className="font-semibold text-gray-700">
                                                    ₱{(item.price * item.qty).toFixed(2)}
                                                </p>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-400 hover:text-red-700 p-2 rounded transition"
                                                >
                                                    <FaTrash size={20} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Total */}
                                    <div className="mt-4 flex justify-between items-center border-t pt-3 font-bold text-lg">
                                        <span>Total:</span>
                                        <span className="text-blue-600">
                                            ₱{total}
                                        </span>
                                    </div>

                                    <button onClick={clearCart} className="mt-3 w-full bg-red-600 text-white py-1 rounded transition hover:bg-red-800">Clear Cart</button>
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