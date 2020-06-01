import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchBooks } from '../../../actions/books';

import Book from './Book/Book';
import { BookType } from '../../../types/book';

const LibraryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Library: React.FC = () => {
    const books = useSelector((state: RootStateOrAny) => state.books);
    const filter = useSelector((state: RootStateOrAny) => state.books.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    const displayBooks = books.books.filter((book: BookType) => book.title.toLowerCase().indexOf(filter) !== -1);

    return (
        <LibraryContainer>
            {displayBooks && displayBooks.map((book: BookType) => (
                <Book
                    key={book.title}
                    title={book.title || ''}
                    author={book.author || ''}
                    isbn={book.isbn || ''}
                    />
            ))}
        </LibraryContainer>
    )
}

export default Library;