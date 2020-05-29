import React from 'react';
import styled from 'styled-components';

import Button from './Button/Button';

const ButtonBayContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 35px;
    width: 320px;
    height: 100%;
`

const ButtonBay: React.FC = () => (
    <ButtonBayContainer>
        <Button
            text="Register new renter"
            destination="/renters"
            />
       <Button
            text="Checkout"
            destination="/checkout"
            />
    </ButtonBayContainer>
)

export default ButtonBay;