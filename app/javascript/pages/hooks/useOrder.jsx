import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../services/orders.service';

const useOrder = () => {
    const {order, isFetching} = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [order?.length, dispatch]);

  return {order, isFetching};
}

export default useOrder