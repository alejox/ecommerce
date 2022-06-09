import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { filterCategory } from '../store/slices/products.slice';

const ProductDetail = () => {

    const [product, setProduct] = useState({});

    const { id } = useParams();
    const dispatch = useDispatch();

    const products = useSelector(state => state.products)

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
            .then(res => {
                const productSearched = res.data.data.products.find(productItem => productItem.id === Number(id));
                setProduct(productSearched);
                dispatch(filterCategory(productSearched.category.id));
            });
            
    }, [id, dispatch]);
    console.log(product);
    return (
        <div className='container'>
            <h2>{product.title}</h2>
            <p>{product.category?.name}</p>
            <img src={product.productImgs} alt="" className='fluid-img w-100' />
            <p>{product.description}</p>
            <p><b>Price: </b> ${product.price}</p>

            {
                products?.map(productItem => (
                    <li>{productItem.title}</li>
                ))
            }
        </div>
    );
};

export default ProductDetail;