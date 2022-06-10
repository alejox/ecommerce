import React, { useEffect, useState } from 'react';
import { filterCategory, filterTitle, getProducts } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts());

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories)
            )
    }, [dispatch])

    const filterProducts = () => {
        dispatch(filterTitle(search));
    }

    const selectCategory = (id) => {
        dispatch(filterCategory(id))
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>Categories</h2>

            <Row>
                <Col lg={3}>
                    <ListGroup>
                        {
                            categories.map(category => (
                                <ListGroup.Item key={category.id} onClick={() => selectCategory(category.id)} style={{ cursor:'pointer'}}>
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search product"
                            aria-label="Search product"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={filterProducts}>
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className='g-4'>
                        {
                            products?.map(product => (
                                <Col key={product.id}>
                                    <Card style={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${product.id}`)}>
                                        <Card.Img variant="top" src={product.productImgs[0]} className='img-fluid' />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>{product.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-muted"><b>Price: </b> ${product.price}</Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;