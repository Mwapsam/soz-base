import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Tooltip } from "@material-tailwind/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useProductFetch from '../hooks/useProductFetch';
import Hero from '../../components/header/Hero';
import { addToCartFunc } from '../../services/cart.service';
import useCart from '../hooks/useCart';

const List = () => {
  const [toggle, setToggle] = useState(false);
  const products = useProductFetch();
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const productFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  console.log(cart);

  const handleToggle = (e) => {
    setToggle((prev) => !prev)
  }

  const handleCart = (product) => {
    const cartData = {
      id: product.id,
      quantity: 1
    }
    dispatch(addToCartFunc(cartData))
  }

  return (
    <div className='flex flex-col'>
      <Hero />
      <div className='flex justify-end gap-3 mr-6 mt-4'>
        {toggle ? (<div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <input type="search"
                onMouseLeave={handleToggle} 
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search" aria-label="Search" 
                aria-describedby="button-addon2" 
                value={searchTerm}
                onChange={productFilter}
              />
            </div>
          </div>
        </div>) :
        <span onClick={handleToggle} className='cursor-pointer'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='my-4 mr-5' />
        </span>
        }
      </div>
      
      <div className='grid justify-center xs:grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 m-4'>
        {products && products
        .filter((product) => {
          if (searchTerm === '') {
            return product;
          }
          return product.name.toLowerCase().includes(searchTerm);
        })
        .map((product) => (
          <div key={product.id}>
            <Card className="w-72 bg-gray-50" style={{borderRadius: 0}}>
              <Link to={`/products/${product.id}`}>
                <CardHeader floated={false} shadow={false} style={{borderRadius: 0, width: '90%', height: '80%' }} className="h-100 w-80 relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
                  <LazyLoadImage
                    src={product.photos_urls && product.photos_urls[0]} 
                    alt="profile-picture"  
                    placeholderSrc={placeholder}
                  />
                  <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-30 transition duration-300 ease-in-out bg-red-700"></div>
                </CardHeader>
              </Link>
                
                <div className='flex justify-between p-4'>
                  <div>
                    <h5>{product.name}</h5>
                    <p>{product.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: product.currency,
                      })}</p>
                  </div>
                  <div className='flex gap-2'>
                  
                    {cart && cart.cartItems.find((item) => item.id === product.id) ? (<Tooltip className='bg-red-700' content="Added to Cart"><span><FontAwesomeIcon icon={faCartShopping} className='text-gray-400' /></span></Tooltip>):
                      (<Tooltip content="Add to Cart"><span><FontAwesomeIcon icon={faCartShopping}  className='cursor-pointer' onClick={() => handleCart(product)}/></span></Tooltip>)
                    }
                  <Tooltip content="Add to Wishlist">
                    <p><FontAwesomeIcon icon={faHeart} /></p>
                  </Tooltip>
                  </div>
                </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default List