import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../services/orders.service';

const useOrder = () => {
    const orders = useSelector((state) => state.order.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [orders.length, dispatch]);

  return orders;
}

export default useOrder