import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {deleteDish, fetchDishes} from "./adminPageSlice";
import DishesInfoBlock from "../../components/DishesInfoBlock/DishesInfoBlock";
import './adminPage.css';

const AdminPage = () => {
    const dispatch: AppDispatch= useDispatch();
    const dishes = useSelector((state:RootState) => state.adminPage.dishes);

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const onDeleteDish = async(id : string) => {
        if (window.confirm(`Do you want to delete task?`)) {
            await dispatch(deleteDish(id));
            await dispatch(fetchDishes());
        }
    };

    return (
        <div>
            <NavBar />
            <div className='d-flex justify-content-around my-3'>
                <h2>Dishes</h2>
                <Link className='btn btn-primary my-2' to='/admin/addDish'>Add new dish</Link>
            </div>
            <div className='block-dishes'>
                {dishes.map((dish) => (
                    <DishesInfoBlock key={dish.id} id={dish.id} title={dish.title} price={dish.price} img={dish.image} onDelete={()=> onDeleteDish(dish.id)}/>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;