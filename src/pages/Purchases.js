import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';


const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, [dispatch])

    return (
        <div>
            <h2>Purchases</h2>

            <ul>
                {
                    purchases.map(purchased => (
                        <ul key={purchased.id}>
                            {purchased.cart.products.map(product => (
                                <li
                                    key={product.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    {product.title}
                                </li>
                            ))}</ul>
                    ))
                }
            </ul>

        </div>
    );
};

export default Purchases;