import React from 'react';
import styled from 'styled-components';

import { useSelector, RootStateOrAny } from 'react-redux';

import BookReturn from './BookReturn/BookReturn';
import CheckoutButton from './CheckoutButton/CheckoutButton';

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
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    rentals: [string];
    displayRentals: boolean;
    displayCheckout: boolean;
    handleCheckoutClicked: Function;
}

const RenterCard: React.FC<Props> = ({
    id,
    name,
    phoneNumber,
    email,
    rentals,
    displayRentals,
    displayCheckout,
    handleCheckoutClicked
}) => {
    const books = useSelector((state: RootStateOrAny) => state.books.books);

    return (
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
                {books && displayRentals && rentals && rentals.map(rental => {
                    return (
                        <BookReturn
                            key={id}
                            renterId={id}
                            book={books.find(book => book.title === rental)}
                            />
                    );
                })}
                {displayCheckout && 
                    <CheckoutButton
                        clickHandler={() => handleCheckoutClicked(id)}
                        />}
            </RenterReturnContainer>
        </RenterCardContainer>
    );
};

export default RenterCard;