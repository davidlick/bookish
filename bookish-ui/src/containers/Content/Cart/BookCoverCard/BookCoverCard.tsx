import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import styled from 'styled-components';

const BookCoverCardContainer = styled.div`
    background-color: #fff;
    display: flex;
    border: 0.1px solid #f0f0f0;
    box-shadow: 10px 5px 15px rgba(175,175,175,50);
    height: 135px;
    max-width: 200px;
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
    height: 100px;
    object-fit: contain;
    margin: auto 15px;
`

const BookCoverCard: React.FC = () => {
    const cartItems = useSelector((state: RootStateOrAny) => state.books.cart)
    const images = useSelector((state: RootStateOrAny) => state.books.images)

    console.log(cartItems)

    return (
        <BookCoverCardContainer>
            {cartItems.length === 0 && (<EmptyCart>Nothing here yet!</EmptyCart>)}
            {cartItems && cartItems.map(cartItem => (
                <CoverImage
                    src={images[cartItem] || 'https://college.indiana.edu/images/publications/book-cover-placeholder.jpg'} />
            ))}
        </BookCoverCardContainer>
    )
}

export default BookCoverCard;