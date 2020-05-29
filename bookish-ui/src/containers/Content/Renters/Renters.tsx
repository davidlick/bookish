import React, { useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchRenters } from '../../../actions/renters';

import Panel from '../../UIKit/Panel/Panel';
import RenterCard from './RenterCard/RenterCard';

import { RenterType } from '../../../types/renter';

const Renters: React.FC = () => {
    const renters = useSelector((state: RootStateOrAny) => state.renters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRenters())
    }, []);

    return (
        <Panel style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            {renters && renters.renters.map((renter: RenterType) => (
                <RenterCard
                    name={renter.name || ''}
                    phoneNumber={renter.phoneNumber || ''}
                    email={renter.email || ''}
                    />    
            ))}
        </Panel>
    )
}

export default Renters;