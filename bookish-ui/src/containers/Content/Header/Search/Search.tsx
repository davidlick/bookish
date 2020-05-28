import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.div`
    width: 250px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledInput = styled.input`
    background-color: #ECECEC;
    border: 2px solid #13334A;
    border-radius: 25px;
    width: 210px;
    height: 38px;
    color: #13334A;
    font-size: 1.25rem;
    outline: none;
    padding-left: 20px;
    box-shadow: 10px 5px 15px rgba(0,0,0,50)
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: #D97925;
    position: absolute;
    right: 25px;
    font-size: 20px;
`

const Search: React.FC = () => (
    <SearchContainer>
        <StyledInput />
        <StyledIcon icon={faSearch} />
    </SearchContainer>
)

export default Search;