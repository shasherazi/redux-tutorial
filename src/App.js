import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotal, fetchCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (isLoading) {
    return(
        <div className="loading">
            <h1>Loading...</h1>
        </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
