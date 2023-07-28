import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchDishes} from "../AdminPage/adminPageSlice";
import DishesBlockModified from "../../components/DishesBlockModified/DishesBlockModified";
import Spinner from "../../components/Spinner/Spinner";
import {ICartDish} from "../../types";
import CartModal from "../CartModal/CartModal";

const UserDishesPage = () => {
    const dispatch: AppDispatch= useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const dishes = useSelector((state:RootState) => state.adminPage.dishes);
    const loading = useSelector((state:RootState) => state.adminPage.loading);
    const cartDishes = useSelector((state:RootState) => state.adminPage.cartDishes);

    useEffect(()=> {
        dispatch(fetchDishes());
    }, [dispatch]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const open = async () => {
        handleOpenModal();
    };

    const calculateTotalOrderPrice = (cartDishes: ICartDish[]): number => {
        let total = 0;
        for (const cartDish of cartDishes) {
            total += cartDish.dish.price * cartDish.amount;
        }
        return total;
    };

    const totalOrderPrice = calculateTotalOrderPrice(cartDishes);

    let dishesBlock = (
       <>
           <div className='block-dishes'>
               {dishes.map((dish) => (
                   <DishesBlockModified key={dish.id} id={dish.id} title={dish.title} price={dish.price} img={dish.image} dish={dish}/>
               ))}
           </div>
           <footer className='d-flex justify-content-around border-top py-3 my-3'>
               <h4>Order total price {totalOrderPrice} KGS</h4>
               <button onClick={open} className='btn btn-primary'>Checkout</button>
           </footer>
       </>
    );

    if (loading) {
        dishesBlock = <Spinner />
    }

    return (
        <div>
            <header>
                <nav className='d-flex justify-content-around border-bottom'>
                    <h1>Pizza</h1>
                </nav>
            </header>
            {dishesBlock}
            {isModalOpen && (
                <CartModal onClose={handleCloseModal}/>
            )}
        </div>
    );
};

export default UserDishesPage;