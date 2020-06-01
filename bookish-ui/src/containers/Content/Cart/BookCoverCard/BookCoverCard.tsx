import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionTypes } from '../../../../constants/books/action_types';

const BookCoverCardContainer = styled.div`
    background-color: #fff;
    display: flex;
    border: 0.1px solid #f0f0f0;
    box-shadow: 10px 5px 15px rgba(175,175,175,50);
    height: 225px;
    min-width: 325px;
    margin: 10px 0;
`

const EmptyCart = styled.div`
    display: inline-block;
    margin: auto auto;
    font-family: 'Helvetica';
    font-size: 1.5rem;
    color: #13334A;
`

const CoverImage = styled.img`
    height: 200px;
    object-fit: contain;
    margin: auto 15px;
    cursor: pointer;
`

const BookCoverCard: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootStateOrAny) => state.books.cart);
    const images = useSelector((state: RootStateOrAny) => state.books.images);

    return (
        <BookCoverCardContainer>
            {cartItems.length === 0 && (<EmptyCart>Nothing here yet. Pick out a book!</EmptyCart>)}
            {cartItems && cartItems.map(cartItem => (
                <CoverImage
                    src={images[cartItem] || 'https://college.indiana.edu/images/publications/book-cover-placeholder.jpg'}
                    onClick={() => {
                        dispatch({ type: actionTypes.REMOVE_FROM_CART, data: cartItem })
                    }}
                    />
            ))}
        </BookCoverCardContainer>
    )
}

export default BookCoverCard;