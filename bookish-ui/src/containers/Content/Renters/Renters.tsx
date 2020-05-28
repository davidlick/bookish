import React from 'react';
// import styled from 'styled-components';

import Panel from '../../UIKit/Panel/Panel';
import RenterCard from './RenterCard/RenterCard';

const renters = [
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'},
    {name: 'John Doe', phone: '555-555-5555', email: 'john@doe.com'}
]

const Renters: React.FC = () => (
    <Panel style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }}>
        {renters.map(renter => (
            <RenterCard
                name={renter.name}
                phone={renter.phone}
                email={renter.email}
                />
        ))}
    </Panel>
)

export default Renters;