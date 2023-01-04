import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../services/products.service';

const useAdminProducts = () => {
    const adminProducts = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [adminProducts.length])

  return adminProducts;
}

export default useAdminProducts;