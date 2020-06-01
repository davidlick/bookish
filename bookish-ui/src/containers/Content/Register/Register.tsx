import React, { useState } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { registerRenter } from '../../../actions/renters';

import { RouteComponentProps } from 'react-router-dom';

import Panel from '../../UIKit/Panel/Panel';

const RegistrationContainer = styled.div`
    font-family: 'Helvetica';
    width: 80%;
    max-width: 600px;
    margin: auto;
`

const RegistrationForm = styled.form`
    width: 100%;
`

const RegistrationRow = styled.div`
    width: 100%;
    display: block;
`

const RegistrationColumn = styled.div`
    width: 100%;
    display: inline-block;
`

const RegistrationLabel = styled.label`
    width: 30%;
    max-width: 100px;
    float: left;
    color: #13334A;
    height: 38px;
    line-height: 38px;
    text-align: right;
`

const RegistrationInput = styled.input`
    width: 60%;
    float: right;
    height: 38px;
    border: 1px solid #ccc;
    color: #13334A;
    font-size: 1.25rem;
    outline: none;
    box-shadow: 10px 5px 15px rgba(175,175,175,50)
`
const RegistrationButton = styled.button`
    display: block;
    height: 38px;
    width: 200px;
    margin: 15px auto 0 auto;
    cursor: pointer;
`

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <Panel>
            <RegistrationContainer>
                <RegistrationForm>
                    <RegistrationRow>
                        <RegistrationColumn>
                            <RegistrationLabel>
                                Name:
                            </RegistrationLabel>
                            <RegistrationInput
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                                />
                        </RegistrationColumn>
                        <RegistrationColumn>
                            <RegistrationLabel>
                                Addresss:
                            </RegistrationLabel>
                            <RegistrationInput
                                onChange={e => {
                                    setAddress(e.target.value);
                                }}
                                />
                        </RegistrationColumn>
                        <RegistrationColumn>
                            <RegistrationLabel>
                                Email:
                            </RegistrationLabel>
                            <RegistrationInput
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                />
                        </RegistrationColumn>
                        <RegistrationColumn>
                            <RegistrationLabel>
                                Phone:
                            </RegistrationLabel>
                            <RegistrationInput
                                onChange={e => {
                                    setPhone(e.target.value);
                                }}
                                />
                        </RegistrationColumn>
                    </RegistrationRow>
                </RegistrationForm>
            </RegistrationContainer>
            <RegistrationButton
                onClick={() => {
                    dispatch(registerRenter(name, address, email, phone));
                    history.push('/renters');
                }}
                >Submit</RegistrationButton>
        </Panel>
    );
};

export default Register;