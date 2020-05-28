import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;
    background-color: #fff;
    border: 0.1px solid #8C8C8C;
    box-shadow: 10px 5px 15px rgba(0,0,0,50);
    width: 200px;
    height: 350px;
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
    transform: translate(220px, -15px);
    font-size: 38px;
`

const CoverImage = styled.img`
    max-width: 90%;
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
    imageLink: string;
}

const Book: React.FC<Props> = ({ title, author, imageLink }) => (
    <BookContainer>
        <IconContainer>
            <StyledIcon icon={faCartPlus} />
        </IconContainer>
        <CoverImage
            src={imageLink}
            />
        <Title>{title}</Title>
        <Author>{author}</Author>
    </BookContainer>
)

export default Book;