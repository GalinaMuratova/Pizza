export interface IDish {
    title: string;
    price: number;
    image: string;
}

export interface ICartDish {
    dish: IDishMut;
    amount: number;
}

export interface IDishMut {
    id: string;
    title:string;
    price:number;
    image: string;
}