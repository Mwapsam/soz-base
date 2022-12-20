import React from 'react';
import _ from 'lodash';
import usePostProduct from '../hooks/usePostProduct';
import Form from './Form';
import { postProduct } from '../../services/product.service';

const props = {
  name: '',
  description: '',
  price: '',
  currency: '',
}

const Products = () => {
  const {dispatch, product, setProduct, photos, setPhotos, selectedOption, setSelectedOption} = usePostProduct(props);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('currency', selectedOption);
      _.forEach(photos, photo => {
        formData.append(`photos[]`, photo)
    })
    dispatch(postProduct(formData));
    setProduct(props)
    setPhotos('')
    selectedOption('')
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Form 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
        setPhotos={setPhotos} 
        selectedOption={selectedOption} 
        setSelectedOption={setSelectedOption} 
        product={product}
      />
    </>
  )
}

export default Products