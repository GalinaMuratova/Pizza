import React, {useEffect} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import { fetchOrders} from "../AdminPage/adminPageSlice";
import OrderBlock from "../../components/OrderBlock/OrderBlock";

const AdminOrdersPage = () => {
    const dispatch:AppDispatch = useDispatch();
    const orders =useSelector((state:RootState) => state.adminPage.orders);

    useEffect(()=> {
        dispatch(fetchOrders())
    }, [dispatch]);

    return (
       <>
           <div>
               <NavBar />
               <h2>Orders</h2>
           </div>
           {orders.map((order, index) => (
               <div key={index}>
                   <h3>Order ID: {order.orderId}</h3>
                   <ul>
                       {order.items.map((item, itemIndex) => (
                           <OrderBlock key={item.dishId} id={item.dishId} amount={item.amount} />
                       ))}
                   </ul>
               </div>
           ))}
       </>
    );
};

export default AdminOrdersPage;