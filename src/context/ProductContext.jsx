import { createContext,useState, useEffect,useContext } from "react";

export const ProductContext = createContext();


export function ProductProvider({children}){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        // Directly import the data from db.json
        const { products } = await import("../data/db.json");
        setProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
        { children }
    </ProductContext.Provider>
  )
}

export function useProducts() {
    return useContext(ProductContext)
}
}

export function useProducts() {
    return useContext(ProductContext)
}
