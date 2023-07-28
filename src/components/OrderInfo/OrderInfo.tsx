import React from 'react';

interface Props {
    title: string,
    price:number,
}

const OrderInfo:React.FC<Props> = ({title, price}) => {
    return (
        <div>
            <p>Title{title}</p>
            <p>{price}</p>
        </div>
    );
};

export default OrderInfo;