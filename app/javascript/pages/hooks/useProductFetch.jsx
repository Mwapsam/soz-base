import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getLatest } from '../../services/product.service';


const useProductFetch = () => {
    const {isSuccess, isFetching} = useSelector((state) => state.product)
    const products = useSelector((state) => state.product.products);
    const { latest, isFetchingLatest } = useSelector((state) => state.latest);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [products?.length])

    useEffect(() => {
      dispatch(getLatest())
  }, [latest?.length])

  return {products, isFetching, latest, isFetchingLatest};
}

export default useProductFetch