import React from 'react';
import styled from 'styled-components';

import BookReturn from './BookReturn/BookReturn';

const RenterCardContainer = styled.div`
    background-color: #fff;
    display: flex;
    border: 0.1px solid #f0f0f0;
    box-shadow: 10px 5px 15px rgba(175,175,175,50);
    height: 135px;
    margin: 10px 0;
`

const RenterImageContainer = styled.div`
    width: 135px;
    height: 135px;
    border: 0.1px solid #f0f0f0;
`

const RenterImagePlaceholder = styled.img`
    display: block;
    object-fit: contain;
    width: 135px;
    margin: auto auto;
`

const RenterInfoContainer = styled.div`
    min-width: 300px;
    font-family: 'Helvetica';
    color: #13334A;
    font-weight: 100;
`

const RenterName = styled.div`
    height: 2.25rem;
    font-size: 31px;
    margin: 25px 0 0 10px;
`

const RenterPhone = styled.div`
    height: 1.5rem;
    font-size: 18px;
    margin: 0 0 0 10px;
`

const RenterEmail = styled.div`
    font-size: 18px;
    margin: 0 0 0 10px;
`

const RenterReturnContainer = styled.div`
    width: 100%;
    height: 135px;
`

type Props = {
    name: string;
    phoneNumber: string;
    email: string;
}

const books = [
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"},
    {title: "To Kill a Mockingbird", author: "Harper Lee", imageLink: "http://www.prepressure.com/images/book-cover-to-kill-a-mocking-bird.jpg"}
]

const RenterCard: React.FC<Props> = ({ name, phoneNumber, email }) => (
    <RenterCardContainer>
        <RenterImageContainer>
            <RenterImagePlaceholder
                src="https://avatars3.githubusercontent.com/u/47925772?s=400&v=4" />
        </RenterImageContainer>
        <RenterInfoContainer>
            <RenterName>
                {name}
            </RenterName>
            <RenterPhone>
                {phoneNumber}
            </RenterPhone>
            <RenterEmail>
                {email}
            </RenterEmail>
        </RenterInfoContainer>
        <RenterReturnContainer>
            {books.map(book => (
                <BookReturn
                    imageLink={book.imageLink}
                />
            ))}
        </RenterReturnContainer>
    </RenterCardContainer>
)

export default RenterCard;