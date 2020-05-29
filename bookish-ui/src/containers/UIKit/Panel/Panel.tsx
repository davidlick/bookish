import React from 'react';
import styled from 'styled-components';
import CSS from 'csstype';

const PanelContainer = styled.div`
    background-color: #ECECEC;
    border: 2px solid #13334A;
    box-shadow: 10px 5px 15px rgba(0,0,0,50);
    width: 90%;
    margin: 10px auto;
    padding: 20px;
`

type Props = {
    children: React.ReactNode;
    style?: CSS.Properties;
}

const Panel: React.FC<Props> = ({ children, style }) => (
    <PanelContainer style={style}>
        {children}
    </PanelContainer>
)

export default Panel;