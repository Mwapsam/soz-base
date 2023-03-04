import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartFunc, removeFromCartFunc, incrementFunc, decrementFunc, addToCartFunc  } from '../../services/cart.service';

const useCart = () => {
    const [open, setOpen] = useState(false);
    const [showStatus, setShowStatus] = useState(false)
    const cart = useSelector((state) => state.cart);
    const {status} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(!open);
    const count = cart && cart.cartItems.find((item) => item.carts[0])

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

    const handleCart = (product) => {
      const cartData = {
        id: product.id,
        quantity: 1
      }
      dispatch(addToCartFunc(cartData))
      .then(res => {
        if(res.meta.requestStatus === "fulfilled"){
          setShowStatus(res.meta.requestStatus === "fulfilled");
        }
      })
      setTimeout(() => {
        setShowStatus(false);
      }, 2000);
    }
    
  return {cart, count, open, handleOpen, handleRemoveFromCart, handleDecreaseCart, handleIncreaseCart, handleCart, status, showStatus}
}

export default useCart;