import React from 'react';
import styled from 'styled-components';

import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { actionTypes } from '../../../../constants/books/action_types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.div`
    width: 350px;
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
    padding: 0 40px 0 20px;
    box-shadow: 10px 5px 15px rgba(0,0,0,50)
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: #D97925;
    position: absolute;
    right: 50px;
    font-size: 20px;
`

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const displaySearch = location.pathname === '/library' || location.pathname === '/';

    return (
        <>
            {displaySearch && <SearchContainer>
                <StyledInput
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        dispatch({ type: actionTypes.SET_FILTER, data: e.currentTarget.value });
                    }}
                    />
                <StyledIcon icon={faSearch} />
            </SearchContainer>}
        </>
    )
}

export default Search;