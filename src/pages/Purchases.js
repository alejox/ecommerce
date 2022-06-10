import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../store/slices/purchases.slice';


const Purchases = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchases());
    },[dispatch])

    return (
        <div>
            <h2>Purchases</h2>
        </div>
    );
};

export default Purchases;