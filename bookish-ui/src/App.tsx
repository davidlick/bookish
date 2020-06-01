import React, { useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Sidebar from './containers/Sidebar/Sidebar';
import Content from './containers/Content/Content';
import { useDispatch } from 'react-redux';
import { fetchBooks } from './actions/books';
import { fetchRenters } from './actions/renters';

const AppContainer = styled.div`
    background: #13334A;
    min-height: 100%;
    display: flex;
`

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchRenters());
  }, []);
  
  return (
    <AppContainer>
      <Sidebar/>
      <Content />
    </AppContainer>
  );
};

export default App;
