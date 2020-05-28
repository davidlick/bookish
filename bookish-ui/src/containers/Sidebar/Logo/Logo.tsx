import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    color: #D97925;
    font-size: 3rem;
    font-family: 'Dancing Script', cursive;
    text-decoration: none;
`

const Logo: React.FC = () => (
    <StyledLink
        to="/"
        >
        bookish
    </StyledLink>
)

export default Logo;