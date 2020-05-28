import React from 'react';
import styled from 'styled-components';

import Book from './Book/Book';

const LibraryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const books = [
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"}
]

const Library: React.FC = () => (
    <LibraryContainer>
        {books.map(book => (
                <Book
                    title={book.title}
                    author={book.author}
                    imageLink={book.imageLink}
                    />
         ))}
    </LibraryContainer>
)

export default Library;