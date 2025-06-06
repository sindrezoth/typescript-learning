import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import type { ReactElement } from "react";
import Product from "./Product";
// import { type UseProductsContextType } from "../context/ProductsProvider";
// import ProductsContext, {ProductsProvider} from "../context/ProductsProvider";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if(products?.length) {
    pageContent = 
      products.map(prod => {
        const inCart: boolean = cart.some(item => item.sku === prod.sku);
        return <Product
          key={prod.sku}
          product={prod}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      })
  }

  return <main className="main main--products">
    {pageContent}
  </main>
  ;
};

export default ProductList;
