import React from 'react';
import styled from 'styled-components';

const BookReturnContainer = styled.div`
    display: inline-flex;
    height: 135px;
    float: right;
`

const CoverImage = styled.img`
    height: 100px;
    object-fit: contain;
    margin: auto 15px;
`

type Props = {
    imageLink: string;
}

const BookReturn: React.FC<Props> = ({ imageLink }) => (
    <BookReturnContainer>
        <CoverImage src={imageLink} />
    </BookReturnContainer>
);

export default BookReturn;