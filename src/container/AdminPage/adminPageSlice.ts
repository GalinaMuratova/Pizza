import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dishes, IDish, IDishMut, IOrder, UpdateDish} from "../../types";
import axiosApi from "../../axiosApi";

const initialState: Dishes = {
    dishes: [],
    dish: null,
    addLoading: false,
    loading: false,
    editLoading:false,
    saveLoading:false,
    deleteLoading:false,
    updateDish: [],
    cartDishes:[],
    orders:[],
};

export const fetchDishes = createAsyncThunk<IDishMut[]> (
    'dishes/getDishes',
    async () => {
        const response = await axiosApi.get('/dishes.json');
        let dishes:IDishMut[] = [];
        let number = 0;
        if (response.data) {
            dishes = Object.keys(response.data).map((key) => {
                const newDish = response.data[key];
                newDish.id = key;
                number = Number(newDish.price);
                newDish.price = number;
                return newDish
            });
        }
        return dishes;
    },
);

export const fetchDish = createAsyncThunk<IDish, string>(
    'contacts/getContact',
    async (id) => {
        const response = await axiosApi.get<IDish>(`/dishes/${id}.json`);
        let number = 0;
        number = Number(response.data.price);
        response.data.price = number;
        return {
            ...response.data
        };
    },
);

export const fetchOrders = createAsyncThunk(
    'orders/getOrders',
    async () => {
        const response = await axiosApi.get<IOrder>('/orders.json');
        const ordersArray = Object.entries(response.data).map(([orderId, orderItems]) => {
            const itemsArray = Object.entries(orderItems).map(([dishId, amount]) => ({
                dishId,
                amount,
            }));
            return {
                orderId,
                items: itemsArray,
            };
        });
        return ordersArray;
    }
);

export const addDish = createAsyncThunk<void, IDish >(
    'dishes/fetchAdd',
    async (dish) => {
        await axiosApi.post('/dishes.json', dish);
    },
);

export const postOrder = createAsyncThunk<void, IOrder>(
    'orders/fetchPost',
    async (order: IOrder) => {
        await axiosApi.post('/orders.json', order);
    },
);

export const updateDish = createAsyncThunk<void, UpdateDish> (
    'dishes/updateDish',
    async (element) => {
        await axiosApi.put(`/dishes/${element.id}.json`, element.dish);
    },
);

export const deleteDish = createAsyncThunk<void, string>(
    'dishes/delete',
    async (id: string) => {
        await axiosApi.delete(`dishes/${id}.json`);
    },
);

export const completeOrder = createAsyncThunk<void, string>(
    'orders/completeOrder',
    async (id: string) => {
        await axiosApi.delete(`/orders/${id}.json`);
    }
);

const adminPageSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        addDishToCart: (state, {payload: dish}: PayloadAction<IDishMut>) => {
            const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);
            if (index !== -1) {
                state.cartDishes[index].amount++;
            } else {
                state.cartDishes.push({
                    amount: 1,
                    dish,
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const index = state.cartDishes.findIndex((cartDish) => cartDish.dish.id === action.payload);
            if (index !== -1) {
                if (state.cartDishes[index].amount > 1) {
                    state.cartDishes[index].amount--;
                } else {
                    state.cartDishes = state.cartDishes.filter((cartDish) => cartDish.dish.id !== action.payload);
                }
            }
        },
        cleanCart: (state, action: PayloadAction<string>) => {
            state.cartDishes = state.cartDishes.filter((cartDish) => cartDish.dish.id !== action.payload);
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchDishes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDishes.fulfilled, (state, action) => {
            state.dishes = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchDishes.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchDish.pending, (state) => {
            state.editLoading = true;
        });
        builder.addCase(fetchDish.fulfilled, (state, action) => {
            state.dish = action.payload;
            state.editLoading = false;
        });
        builder.addCase(fetchDish.rejected, (state) => {
            state.editLoading = false;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
        builder.addCase(updateDish.pending, (state) => {
            state.saveLoading = true;
        });
        builder.addCase(updateDish.fulfilled, (state) => {
            state.saveLoading = false;
        });
        builder.addCase(updateDish.rejected, (state) => {
            state.saveLoading = false;
        });
        builder.addCase(addDish.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(addDish.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(addDish.rejected, (state) => {
            state.addLoading = false;
        });
        builder.addCase(deleteDish.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteDish.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteDish.rejected, (state) => {
            state.deleteLoading = false;
        });
    }

});

export const adminPageReducer = adminPageSlice.reducer;
export const {addDishToCart, removeFromCart, cleanCart} = adminPageSlice.actions;