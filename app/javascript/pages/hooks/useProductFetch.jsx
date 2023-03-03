import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../services/product.service';
import { productSelector } from '../../reducers/product';


const useProductFetch = () => {
    const {isSuccess, isFetching} = useSelector(productSelector)
    const products = useSelector((state) => state.product.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [products.length])

  return {products, isFetching};
}

export default useProductFetch