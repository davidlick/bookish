import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Icon from '../../../../hocs/Icon/Icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const MenuItemContainer = styled.div`
    margin-top: 20px;
    margin-left: 25px;
`

const MenuLink = styled(Link)`
    color: #7C7C7C;
    font-family: 'Helvetica';
    font-size: 28px;
    font-weight: 100;
    text-decoration: none;
`

type OtherProps = {
    title: string;
    destination: string;
    icon: IconDefinition;
}

const MenuItem: React.FC<OtherProps> = ({ title, destination, icon }) => (
    <MenuItemContainer>
        <MenuLink to={destination}>
            <Icon
                icon={icon}
                />{title}
        </MenuLink>
    </MenuItemContainer>

)

export default MenuItem;