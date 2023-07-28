import React from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {IDishMut} from "../../types";
import {addDishToCart} from "../../container/AdminPage/adminPageSlice";

interface Props {
    id: string,
    title: string,
    price: number,
    img: string,
    dish: IDishMut,
}

const DishesBlockModified: React.FC<Props> = (props) => {
    const dispatch:AppDispatch = useDispatch();
    const addToCart = async () => {
        await dispatch(addDishToCart(props.dish));
    };

    return (
        <div>
            <div className="card my-3" onClick={addToCart} style={{ width: '15rem' }}>
                <img src={props.img} className="card-img-top img-pizza" alt='pizza'/>
                <div className="card-body">
                    <h4 className="card-title">{props.title}</h4>
                    <p className="card-text"><b>{props.price}KGS</b></p>
                </div>
            </div>
        </div>
    );
};

export default DishesBlockModified;