import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
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
            <ListGroup variant="flush">
            <ul>
                {
                    purchases.map(purchased => (
                        <ul key={purchased.id}>
                            {purchased.cart.products.map(product => (
                                <ListGroup.Item
                                    key={product.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    {product.title}
                                </ListGroup.Item>
                            ))}</ul>
                    ))
                }
            </ul>
            </ListGroup>

        </div>
    );
};

export default Purchases;