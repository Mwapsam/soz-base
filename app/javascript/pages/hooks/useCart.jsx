import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartFunc, removeFromCartFunc, incrementFunc, decrementFunc } from '../../services/cart.service';

const useCart = () => {
    const [open, setOpen] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        dispatch(getCartFunc());
      }, [dispatch]);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCartFunc(product));
    };

    const handleDecreaseCart = (product) => {
      dispatch(decrementFunc(product))
    }
  
    const handleIncreaseCart = (product) => {
      dispatch(incrementFunc(product))
    }
    
  return {cart, open, handleOpen, handleRemoveFromCart, handleDecreaseCart, handleIncreaseCart}
}

export default useCart;