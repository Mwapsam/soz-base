import {useState} from 'react';
import { useDispatch } from 'react-redux';

const usePostProduct = (props) => {
    const [product, setProduct] = useState(props)
    const [photos, setPhotos] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch();

    console.log(product);

  return {dispatch, product, setProduct, photos, setPhotos, selectedOption, setSelectedOption}
}

export default usePostProduct