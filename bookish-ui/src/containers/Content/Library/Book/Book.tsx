import React, { useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import styled from 'styled-components';

import { fetchBookCover } from '../../../../actions/books';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { actionTypes } from '../../../../constants/books/action_types';

const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;
    background-color: #fff;
    border: 0.1px solid #8C8C8C;
    box-shadow: 10px 5px 15px rgba(0,0,0,50);
    width: 175px;
    height: 275px;
`

const IconContainer = styled.div`
    display: block;
    position: absolute;
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: #D97925;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(195px, -15px);
    font-size: 38px;
    cursor: pointer;
`

const CoverImage = styled.img`
    max-height: 75%;
    width: auto;
    height: auto;
    object-fit: contain;
    margin: 0 auto;
`

const Title = styled.div`
    text-align: center;
    font-family: 'Helvetica';
    font-size: 1.25rem;
    margin-bottom: 5px;
`

const Author = styled.div`
    text-align: center;
    font-family: 'Helvetica';
    font-size: 0.85rem;
`

type Props = {
    title: string;
    author: string;
    isbn: string;
}

const Book: React.FC<Props> = ({ title, author, isbn }) => {
    const imageLink = useSelector((state: RootStateOrAny) => state.books.images[title]);
    const cart = useSelector((state: RootStateOrAny) => state.books.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (imageLink === undefined) {
            dispatch(fetchBookCover(title, isbn))
        }
    }, []);

    const handleAddToCart = () => {
        if (cart.length > 1) {
            alert("You can only check out 2 books at a time!");
            return;
        }

        dispatch({ type: actionTypes.ADD_TO_CART, data: title });
    }

    return (
        <BookContainer>
            <IconContainer>
                <StyledIcon
                    icon={faCartPlus}
                    onClick={handleAddToCart}
                    />
            </IconContainer>
            <CoverImage
                src={imageLink || 'https://college.indiana.edu/images/publications/book-cover-placeholder.jpg'}
                />
            <Title>{title}</Title>
            <Author>{author}</Author>
        </BookContainer>
    )
}

export default Book;