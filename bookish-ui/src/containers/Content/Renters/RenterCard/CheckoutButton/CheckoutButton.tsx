import React from 'react';
import styled from'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const CheckoutButtonContainer = styled.div`
    height: 100%;
    width: 200px;
    float: right;
    text-align: center;
    line-height: 135px;
    cursor: pointer;
    font-family: 'Helvetica';
    font-size: 24px;
    font-weight: 100;
    color: #777;
`

type Props = {
    clickHandler: Function;
}

const CheckoutButton: React.FC<Props> = ({ clickHandler }) => (
    <CheckoutButtonContainer
        onClick={() => clickHandler()}
        >
        Checkout <FontAwesomeIcon icon={faShoppingBasket} />
    </CheckoutButtonContainer>
);

export default CheckoutButton;