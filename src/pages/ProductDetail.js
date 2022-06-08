import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductDetail = () => {

    const [product, setProduct] = useState({});


    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/1')
            .then(res => setProduct(res.data))
    },[])

    return (
        <div>
            <h2>Product Detail</h2>
        </div>
    );
};

export default ProductDetail;