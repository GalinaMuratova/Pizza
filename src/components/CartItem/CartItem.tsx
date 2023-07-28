import React from 'react';
import {ICartDish} from "../../types";

interface Props {
    cartDish: ICartDish;
    removeDish: () => void;
}

const CartItem: React.FC<Props> = ({cartDish, removeDish}) => {
    const price = cartDish.dish.price * cartDish.amount;

    return (
        <div className="card mb-1 p-2">
            <div className="row align-items-center">
                <div className="col">{cartDish.dish.title}</div>
                <div className="col-2">{cartDish.amount}</div>
                <div className="col-3 text-rightxp">
                    {price} KGS
                </div>
                <button className='col-2 btn btn-danger me-2' onClick={removeDish} type='button'>Delete</button>
            </div>
        </div>
    );
};
export default CartItem;