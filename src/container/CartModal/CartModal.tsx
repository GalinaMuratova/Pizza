import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {ICartDish, IOrder} from "../../types";
import CartItem from "../../components/CartItem/CartItem";
import './cartModal.css';
import {cleanCart, postOrder, removeFromCart} from "../AdminPage/adminPageSlice";

interface Props {
    onClose: () => void;
}

const CartModal:React.FC<Props> = ({onClose}) => {
    const cartDishes = useSelector((state:RootState) => state.adminPage.cartDishes);
    const dispatch:AppDispatch = useDispatch();

    const calculateTotalOrderPrice = (cartDishes: ICartDish[]): number => {
        let total = 150;
        for (const cartDish of cartDishes) {
            total += cartDish.dish.price * cartDish.amount;
        }
        return total;
    };

    const totalOrderPrice = calculateTotalOrderPrice(cartDishes);

    const removeDish = async (id:string) => {
        await dispatch(removeFromCart(id));
    };

    const handleOrder = async () => {
        if (cartDishes.length === 0) {
            return;
        }

        const orders: IOrder = cartDishes.reduce((acc:any, cartDish) => {
            acc[cartDish.dish.id] = Number(cartDish.amount);
            return acc;
        }, {});

        await dispatch(postOrder(orders));

        cartDishes.forEach((cartDish) => dispatch(cleanCart(cartDish.dish.id)));

        onClose();
    };

    let order = (
        <div className='text-center modal-info'>
            <h2>Cart is empty</h2>
            <p>Order something</p>
            <button onClick={onClose} className='btn btn-secondary col-5'>Cancel</button>
        </div>
    );

    if (cartDishes.length !== 0) {
        order =
            <>
                <div className='modal-info'>
                    <h3 className='text-center mb-3'>Your order</h3>
                    <div>
                        {cartDishes.map((el) => (
                            <CartItem key={el.dish.id} cartDish={el} removeDish={() => removeDish(el.dish.id)}/>
                        ))}
                    </div>
                    <div className='d-flex justify-content-between px-1 mb-3'>
                        <span>Delivery</span>
                        <span className=' price-text'>150 KGS</span>
                    </div>
                    <div className='d-flex justify-content-between px-1 border-top'>
                        <span><b>Total</b></span>
                        <span className=' price-text'><b>{totalOrderPrice} KGS</b></span>
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                        <button onClick={onClose} className='btn btn-secondary col-5'>Cancel</button>
                        <button onClick={handleOrder} className='btn btn-primary col-5'>Order</button>
                    </div>
                </div>
            </>;
    }

    return (
        <div className='block-modal'>
            {order}
        </div>
    );
};

export default CartModal;