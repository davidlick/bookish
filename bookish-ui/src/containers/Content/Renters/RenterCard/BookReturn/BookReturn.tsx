import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BookType } from '../../../../../types/book';

import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { fetchBookCover, returnBook } from '../../../../../actions/books';

const BookReturnContainer = styled.div`
    display: inline-flex;
    height: 135px;
    float: right;
`

const CoverImage = styled.img`
    height: 100px;
    object-fit: contain;
    margin: auto 15px;
    cursor: pointer;
`

type Props = {
    renterId: string;
    book: BookType;
}

const BookReturn: React.FC<Props> = ({ renterId, book }) => {
    let title = '';
    let isbn = '';
    if (book !== undefined) {
        title = book.title;
        if (book.isbn) {
            isbn = book.isbn;
        }
    }

    const dispatch = useDispatch();
    const images = useSelector((state: RootStateOrAny) => state.books.images);

    useEffect(() => {
        if (images[title] === undefined) {
            dispatch(fetchBookCover(title, isbn));
        }
    }, []);

    return (
        <BookReturnContainer>
            <CoverImage
                src={images[title] || 'https://college.indiana.edu/images/publications/book-cover-placeholder.jpg'}
                onClick={() => {
                    dispatch(returnBook(title, renterId));
                }}
                />
        </BookReturnContainer>
    );
}

export default BookReturn;