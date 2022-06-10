import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { getCart } from '../store/slices/cart.slices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductsSidebar from './ProductsSidebar';

const NavBar = () => {

    const logout = () => localStorage.setItem('token', '');


    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {

        const token = localStorage.getItem('token')

        if(token){
            setShow(true);
        }else{
            navigate('/login')
        }
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);



    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#/">E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#/login">Login</Nav.Link>
                            <Nav.Link href="#/Purchases">Purchases</Nav.Link>
                            <Nav.Link role="button" onClick={handleShow}>Cart (Sidebar)</Nav.Link>
                            <Nav.Link role="button" onClick={logout}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ProductsSidebar show={show} handleClose={handleClose}/>
        </div>
    );
};

export default NavBar;