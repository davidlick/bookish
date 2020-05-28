import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router';

import Header from './Header/Header';
import Library from './Library/Library';
import Renters from './Renters/Renters';

const ContentContainer = styled.div`
    width: 100%;
    flex: 4;
`

const Content: React.FC = () => (
    <ContentContainer>
        <Header />
        <Route path="/" exact component={Library} />
        <Route path="/library" component={Library} />
        <Route path="/renters" component={Renters} />
        <Route path="/return" component={Renters} />
    </ContentContainer>
)

export default Content;