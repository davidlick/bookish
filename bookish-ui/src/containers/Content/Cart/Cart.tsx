import React from 'react';
import Panel from '../../UIKit/Panel/Panel';
import BookCoverCard from './BookCoverCard/BookCoverCard';
import CartDetail from './CartDetail/CartDetail';
import Renters from '../Renters/Renters';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { checkoutBook } from '../../../actions/books';
import { actionTypes } from '../../../constants/books/action_types';

const Cart: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootStateOrAny) => state.books.cart);

    let panelStyle = {};
    if (cart.length !== 0) {
        panelStyle = {
            display: 'flex', justifyContent: 'space-between'
        }
    }

    const checkoutHandler = (renterId: string) => {
        if (cart.length === 0) {
            alert("Add items to your cart before checking out");
            return
        }

        // Checkout each cart item.
        cart.map(cartItem => {
            dispatch(checkoutBook(cartItem, renterId))
        })

        // After each item has been checked out clear the cart.
        dispatch({ type: actionTypes.CLEAR_CART });

        // Redirect to the homepage.
        history.push('/');
    }

    return (
        <>
            <Panel style={panelStyle}>
                <BookCoverCard />
                {cart.length !== 0 && <CartDetail />}
            </Panel>
            <Renters
                checkout={checkoutHandler}
                />
        </>
    );
}

export default Cart;