import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterCategory } from '../store/slices/products.slice';

const ProductDetail = () => {

    const [product, setProduct] = useState({});

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            <Row>
                <Col >
                    <img src={product.productImgs} alt="" className='fluid-img w-100' />
                    <p>{product.category?.name}</p>
                </Col>
                <Col>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p><b>Price: </b> ${product.price}</p>
                </Col>
            </Row>
            <Row>
                <h2>Related products</h2>
                <ListGroup variant="flush">
                        {
                            products?.map(productItem => (
                            <ListGroup.Item key={productItem.id} onClick={() => navigate(`/products/${productItem.id}`)} style={{ cursor: 'pointer' }}>
                                {productItem.title}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>

            </Row>

        </div>
    );
};

export default ProductDetail;