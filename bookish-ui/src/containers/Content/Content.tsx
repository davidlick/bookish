import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router';

import Header from './Header/Header';
import Library from './Library/Library';
import Cart from './Cart/Cart';
import Renters from './Renters/Renters';
import Register from './Register/Register';

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
        <Route path="/register" component={Register} />
        <Route path="/return" component={Renters} />
        <Route path="/checkout" component={Cart} />
    </ContentContainer>
)

export default Content;