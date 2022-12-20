import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import useProductFetch from '../hooks/useProductFetch';

const Show = () => {
    const products = useProductFetch();
    const { product } = useParams();
    const prod = products.find((item) => item.id == product);
    console.log(prod);
  return (
    <Card>
        <CardHeader>
            <img src={prod?.photos_urls && prod?.photos_urls[0]} alt="profile-picture" />
        </CardHeader>
    </Card>
  )
}

export default Show;