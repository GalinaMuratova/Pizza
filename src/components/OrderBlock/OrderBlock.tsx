import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import { fetchDish} from "../../container/AdminPage/adminPageSlice";
import {IDish} from "../../types";
import OrderInfo from "../OrderInfo/OrderInfo";

interface Props {
    id:string;
    amount:number
}

const OrderBlock:React.FC<Props> = (props) => {
    const dish = useSelector((state:RootState) => state.adminPage.dish);
    const [order, setOrder] = useState<IDish | null>(null);
    const dispatch:AppDispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchDish(props.id));
        setOrder(dish);
    }, [dispatch, props.id]);

    useEffect(() => {
        setOrder(dish);
    }, [dish]);

    let el = <></>

    if (order) {
        el = <OrderInfo title={order.title} price={order.price} />
    }

    return (
        <div className='card'>
            <li>
                {el}
                <p>{dish?.title}</p>
                Dish ID: {props.id}, Amount: {props.amount}
            </li>
        </div>
    );
};

export default OrderBlock;