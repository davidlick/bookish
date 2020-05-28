import React from 'react';
import styled from 'styled-components';

import ButtonBay from './ButtonBay/ButtonBay';
import Search from './Search/Search';

const HeaderContainer = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
`

const Header: React.FC = () => (
    <HeaderContainer>
        <ButtonBay />
        <Search />
    </HeaderContainer>
)

export default Header;