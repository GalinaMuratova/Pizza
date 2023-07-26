import React, {useState} from 'react';
import './adminAddDish.css'
import {Link, useNavigate} from "react-router-dom";
import {IDish} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {addDish} from "../AdminPage/adminPageSlice";
import Spinner from "../../components/Spinner/Spinner";

const dishInfo = {
    title: '',
    price: 0,
    image: ''
};

const AdminAddDish = () => {
    const [dishes, setDishes] = useState<IDish>(dishInfo);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const addLoading = useSelector((state:RootState) => state.adminPage.addLoading);

    const submit = async (e:React.FormEvent) => {
        e.preventDefault();
        await dispatch(addDish(dishes));
        setDishes(prevState => ({
            ...prevState,
            image:'',
            price:0,
            title:''
        }));
        navigate('/admin/dishes');
    };

    const change = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDishes(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    let btns = (
        <div className='text-center my-3'>
            <button type='submit' className='btn btn-primary mx-2'>Add</button>
            <Link className='btn btn-dark' to='/admin/dishes'>Home</Link>
        </div>
    );

    if (addLoading) {
        btns = <Spinner />;
    }

    return (
        <div className='form-add'>
            <h2 className='my-3 text-center'>Add new dish</h2>
            <form onSubmit={submit}>
                <input
                    type='text'
                    id='title'
                    name='title'
                    value={dishes.title}
                    onChange={change}
                    className='form-control my-3'
                    placeholder='Enter pizza`s name'
                    required
                />
                <input
                    type='number'
                    id='price'
                    name='price'
                    value={dishes.price}
                    onChange={change}
                    className='form-control my-3'
                    placeholder='Enter pizza`s price'
                    required
                />
                <input
                    type='text'
                    id='image'
                    name='image'
                    value={dishes.image}
                    onChange={change}
                    className='form-control my-3'
                    placeholder='Enter photo`s url'
                    required
                />
                {btns}
            </form>
        </div>
    );
};

export default AdminAddDish;