import React from 'react';
import {Link} from "react-router-dom";
import './dishesInfoBlock.css';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import Spinner from "../Spinner/Spinner";

interface Props {
    id: string,
    title: string,
    price: number,
    img: string,
    onDelete:() => void;
}

const DishesInfoBlock: React.FC<Props> = (props) => {
    const deleteLoading = useSelector((state:RootState) => state.adminPage.deleteLoading);

    let btn = (
        <div className="card-body">
            <Link className='btn btn-secondary mx-2' to={`/admin/edit/${props.id}`}>Edit </Link>
            <button className='btn btn-danger card-link' onClick={props.onDelete}>Delete</button>
        </div>
    );

    if (deleteLoading && deleteLoading === props.id) {
        btn= <Spinner />
    }

    return (
    <div className="card my-3" style={{ width: '15rem' }}>
        <img src={props.img} className="card-img-top img-pizza" alt='pizza'/>
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text"><b>{props.price}KGS</b></p>
            </div>
        {btn}
    </div>
    );
};

export default DishesInfoBlock;