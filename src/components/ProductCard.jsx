import { useCart } from "../context/CartContext";

const ProductCard = ({product}) => {

  const {addToCart} = useCart();

    return ( 

        <div
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >

            {/* IMAGE */}
            <img
              src={`http://localhost:8000/${product.image}`}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-4"
            />

            {/* NAME */}
            <h2 className="text-lg font-bold">
              {product.name}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm mt-2">
              {product.description}
            </p>

            {/* PRICE */}
            <p className="text-green-600 font-semibold mt-3">
              ₱{product.price}
            </p>

            <button onClick={() => addToCart(product) } className="bg-blue-600 text-white mt-3 px-4 py-2 rounded transition hover:bg-blue-700">

              Add To Cart

            </button>


          </div>
     );
}
 
export default ProductCard;