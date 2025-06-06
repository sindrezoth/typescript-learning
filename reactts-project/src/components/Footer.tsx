import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean  
}

const Footer = ({viewCart}: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();
  const content = (
    <footer className="footer">
      {viewCart 
        ? <p>Shopping Cart &copy; {year}</p>
        : (
          <>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Shopping Cart: {totalItems} &copy; {year}</p>
          </>
        )}
    </footer>
  )
  return content;
};

export default Footer;
