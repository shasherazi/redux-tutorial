import { ChevronDown, ChevronUp } from '../icons';
import { removeItem, increment, decrement } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button
          className='remove-btn'
          type='button'
          onClick={() => dispatch(removeItem(id))}
        >
          remove
        </button>
      </div>

      <div>
        <button
          className='amount-btn'
          type='button'
          onClick={() => dispatch(increment({ id }))}
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button
          className='amount-btn'
          type='button'
          onClick={() => {
            if (amount === 1) {
              return dispatch(removeItem(id));
            }
            dispatch(decrement({ id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
