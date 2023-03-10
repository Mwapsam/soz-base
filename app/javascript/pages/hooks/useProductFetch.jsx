import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../services/product.service';


const useProductFetch = () => {
    const {isSuccess, isFetching} = useSelector((state) => state.product)
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [products?.length])

  return {products, isFetching};
}

export default useProductFetch