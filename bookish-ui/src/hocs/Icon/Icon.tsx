import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const IconContainer = styled.div`
    display: inline-block;
    text-align: center;
    width: 100%;
    margin-right: 30px;
    width: 40px;
    height: 40px;
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 28px;
    color: #D97925;
`

type OtherProps = {
    icon: IconDefinition;
}

const Icon: React.FC<OtherProps> = ({ icon }) => (
    <IconContainer>
        <StyledIcon icon={icon} />
    </IconContainer>
)

export default Icon;