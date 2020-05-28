import React from 'react';
import styled from 'styled-components';

import MenuItem from './MenuItem/MenuItem';
import { faBookReader, faUser, faShoppingCart, faReply } from '@fortawesome/free-solid-svg-icons';

const MenuContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-flow: column nowrap;
    width: 275px;
`

export default () => (
    <MenuContainer>
        <MenuItem
            title="Library"
            destination="/library"
            icon={faBookReader}
            />
        <MenuItem
            title="Renters"
            destination="/renters"
            icon={faUser}
            />
        <MenuItem
            title="Checkout"
            destination="/checkout"
            icon={faShoppingCart}
            />
        <MenuItem
            title="Return"
            destination="/return"
            icon={faReply}
            />
    </MenuContainer>
)