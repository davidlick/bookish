import React from 'react';
import './App.css';
import styled from 'styled-components';
import Sidebar from './containers/Sidebar/Sidebar';
import Content from './containers/Content/Content';

const AppContainer = styled.div`
    background: #13334A;
    min-height: 100%;
    display: flex;
`

const App: React.FC = () => (
    <AppContainer>
      <Sidebar/>
      <Content />
    </AppContainer>
)

export default App;
