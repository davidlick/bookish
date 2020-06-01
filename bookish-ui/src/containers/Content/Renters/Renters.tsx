import React, { useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchRenters } from '../../../actions/renters';

import Panel from '../../UIKit/Panel/Panel';
import RenterCard from './RenterCard/RenterCard';

import { RenterType } from '../../../types/renter';

import { useLocation } from 'react-router-dom';

type Props = {
    checkout: Function;
}

const Renters: React.FC<Props> = ({ checkout }) => {
    const renters = useSelector((state: RootStateOrAny) => state.renters.renters);
    const dispatch = useDispatch();
    const location = useLocation();

    const displayRentals = location.pathname === '/return';
    const displayCheckout = location.pathname === '/checkout';

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
            {renters && renters.map((renter: RenterType) => (
                <RenterCard
                    key={renter.id}
                    id={renter.id}
                    name={renter.name}
                    phoneNumber={renter.phoneNumber}
                    email={renter.email}
                    rentals={renter.rentals}
                    displayRentals={displayRentals}
                    displayCheckout={displayCheckout}
                    handleCheckoutClicked={checkout}
                    />    
            ))}
        </Panel>
    )
}

export default Renters;