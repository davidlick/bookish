import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const StyledButton = styled(Link)`
    border: 2px solid #13334A;
    color: #13334A;
    text-decoration: none;
    font-family: 'Helvetica';
    font-size: 13px;
    text-align: center;
    line-height: 38px;
    border-radius: 28px;
    box-shadow: 10px 5px 15px rgba(0,0,0,50);
    background-color: #B4D6E9;
    display: block;
    width: 150px;
    height: 38px;
`

type Props = {
    text: string;
    destination: string;
}

const Button: React.FC<Props> = ({ text, destination }) => (
    <StyledButton to={destination}>
        {text}
    </StyledButton>
)

export default Button;