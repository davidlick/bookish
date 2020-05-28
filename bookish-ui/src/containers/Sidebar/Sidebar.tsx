import React from 'react';
import styled from 'styled-components';

import Logo from './Logo/Logo'
import Menu from './Menu/Menu'

const SidebarContainer = styled.div`
    background: #011126;
    box-shadow: 0px 0px 5px rgba(0,0,0,50);
    padding-top: 2.5%;
    min-width: 275px;
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    float: left;
`

const Sidebar: React.FC = () => (
        <SidebarContainer>
            <Logo />
            <Menu />
        </SidebarContainer>
);

export default Sidebar;