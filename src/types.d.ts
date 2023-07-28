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

interface UpdateDish {
    id: string;
    dish: IDish;
}

interface Dishes {
    dishes:IDishMut[];
    dish:IDish | null;
    addLoading: boolean;
    loading: boolean;
    editLoading:boolean;
    saveLoading:boolean;
    deleteLoading:boolean | string;
    updateDish: UpdateDish[];
    cartDishes: ICartDish[];
    orders:IOrderMut[];
}

interface IOrder {
    [id: string]: number;
}

interface IOrderNew {
    dishId: string,
    amount: number,
}

interface IOrderMut {
    orderId: string;
    items: IOrderNew[]
}




