import React from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buy } from '../store/slices/cart.slice';

const ProductsSidebar = ({ show, handleClose }) => {

    const products = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const selectProducts = (cartProduct) =>{
        handleClose();
        navigate(`/products/${cartProduct.id}`)
    }

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                    {
                        products?.map(cartProduct =>(
                            <ListGroup.Item 
                            key={cartProduct.id} 
                            style={{ cursor: 'pointer' }}
                            onClick={() => selectProducts(cartProduct)}>{cartProduct?.title}
                            
                            </ListGroup.Item>
                        ))
                    }
                    </ListGroup>
                    <Button variant="warning" onClick={() => dispatch(buy())}>Checkout</Button>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
};

export default ProductsSidebar;