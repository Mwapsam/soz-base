import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Tooltip, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faList, faSliders, faMagnifyingGlass, faBarcode, faBraille } from '@fortawesome/free-solid-svg-icons';
import useProductFetch from '../hooks/useProductFetch';

const List = () => {
  const [toggle, setToggle] = useState(false);
  const products = useProductFetch();
  const [searchTerm, setSearchTerm] = useState('');

  const productFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleToggle = (e) => {
    setToggle((prev) => !prev)
  }
  return (
    <div className='flex flex-col'>
      <div className='flex justify-end gap-3 mr-6'>
        <span className='my-3 font-bold'>Filter</span>
        <FontAwesomeIcon icon={faSliders} className='my-4' />
        <div className="w-50 mx-5">
          <Select variant="standard" className='hover:border-none' label="Sort by Price" style={{borderRadius: 0, border: 'none'}}>
            <Option>Less than 1000</Option>
            <Option>1000 to 2000</Option>
            <Option>2000 to 3000</Option>
            <Option>3000 to 4000</Option>
            <Option>Above 5000</Option>
          </Select>
        </div>
        {toggle ? (<div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <div class="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <input type="search"
                onMouseLeave={handleToggle} 
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
        <FontAwesomeIcon icon={faList} className='my-4' />
        
        <FontAwesomeIcon icon={faBarcode} className='my-4' />
        <FontAwesomeIcon icon={faBraille} className='my-4' />
      </div>
      
      <div className='grid xs:grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 m-4'>
        {products && products
        .filter((product) => {
          if (searchTerm === '') {
            return product;
          }
          return product.name.toLowerCase().includes(searchTerm);
        })
        .map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card className="w-86 bg-gray-50" style={{borderRadius: 0}}>
                  <CardHeader floated={false} shadow={false} style={{borderRadius: 0, width: '90%', height: '80%' }} className="h-80 w-100">
                    <img src={product.photos_urls && product.photos_urls[0]} alt="profile-picture" />
                  </CardHeader>
                  <div className='flex justify-between p-4'>
                    <div>
                      <h5>{product.name}</h5>
                      <p>{product.price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: product.currency,
                        })}</p>
                    </div>
                    <div className='flex gap-2'>
                    <Tooltip content="Add to Cart">
                      <p><FontAwesomeIcon icon={faCartShopping} /></p>
                    </Tooltip>
                    <Tooltip content="Add to Wishlist">
                      <p><FontAwesomeIcon icon={faHeart} /></p>
                    </Tooltip>
                    </div>
                  </div>
              </Card>
            </Link>
            
        ))}
      </div>
    </div>
    
  )
}

export default List