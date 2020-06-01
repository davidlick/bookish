import React from 'react';
import styled from 'styled-components';

import { useSelector, RootStateOrAny } from 'react-redux';

const CartDetailContainer = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border: 0.1px solid #f0f0f0;
    box-shadow: 10px 5px 15px rgba(175,175,175,50);
    height: 225px;
    min-width: 300px;
    width: 100%;
    margin: 10px 0 0 20px;
    font-family: 'Helvetica';
    font-size: 1.5rem;
    font-weight: 100;
    color: #13334A;
    justify-content: center;
    align-items: center;
`

const BreakdownContainer = styled.div`
    background-color: #fff;
    width: 100%;
    height: 200px;
    font-size: 1.25rem;
    padding: 0;
    margin: 0;
`

const BreakdownP = styled.p`
    margin: 0;
    margin-left: 20px;
    padding: 0;
    line-height: 1;
`

const CartDetail: React.FC = () => {
    const cart = useSelector((state: RootStateOrAny) => state.books.cart);
    // 12096e5 is a magic number for 14 days.
    const dueDate = new Date(Date.now() + 12096e5);

    return (
        <CartDetailContainer>
            Cart
            <BreakdownContainer>
                <p/>
                <BreakdownP>Books in cart:</BreakdownP>
                <ul>
                    {cart.length !== 0 && cart.map(cartItem => (
                        <li>{cartItem}</li>
                    ))}
                </ul>
                <BreakdownP>Due date:</BreakdownP>
                <BreakdownP>{dueDate.toDateString()}</BreakdownP>
            </BreakdownContainer>
        </CartDetailContainer>
    );
};

export default CartDetail;