import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchDish, updateDish} from "../AdminPage/adminPageSlice";
import Spinner from "../../components/Spinner/Spinner";
import {IDish} from "../../types";

const AdminEditDish = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [dish, setDish] = useState<IDish>();
    const newDish = useSelector((state:RootState)=> state.adminPage.dish);
    const saveLoading = useSelector((state:RootState) => state.adminPage.saveLoading);

    useEffect(()=> {
        dispatch(fetchDish(id!))
    }, [dispatch, id]);

    useEffect(() => {
        setDish(newDish!);
    }, [newDish]);

    const submit = async (e:React.FormEvent) => {
        e.preventDefault();
        if (id && dish) {
            await dispatch(updateDish({ id, dish }));
            navigate('/admin/dishes');
        }
    };

    const change = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDish(prevState => ({
            ...prevState!,
            [name]: value,
        }));
    };

    let btns = (
        <div className='text-center my-3'>
            <button type='submit' className='btn btn-primary mx-2'>Save</button>
            <Link className='btn btn-dark' to='/admin/dishes'>Home</Link>
        </div>
    );

    if (saveLoading) {
        btns = <Spinner />;
    }
    let form = <></>;

    if (dish) {
       form = <form onSubmit={submit}>
            <input
                type='text'
                id='title'
                name='title'
                value={dish.title}
                onChange={change}
                className='form-control my-3'
                placeholder='Enter pizza`s name'
                required
            />
            <input
                type='number'
                id='price'
                name='price'
                value={dish.price}
                onChange={change}
                className='form-control my-3'
                placeholder='Enter pizza`s price'
                required
            />
            <input
                type='text'
                id='image'
                name='image'
                value={dish.image}
                onChange={change}
                className='form-control my-3'
                placeholder='Enter photo`s url'
                required
            />
            {btns}
        </form>
    }

    return (
        <div className='form-add'>
            <Link to='/admin/dishes'>Click home</Link>
            <h2 className='my-3 text-center'>Edit dish</h2>
            {form}
        </div>
    );
};

export default AdminEditDish;