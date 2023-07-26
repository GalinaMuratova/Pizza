import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IDish} from "../../types";
import axiosApi from "../../axiosApi";


interface IDishMut {
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
    deleteLoading:boolean;
}

const initialState: Dishes = {
    dishes: [],
    dish: null,
    addLoading: false,
    loading: false,
    editLoading:false,
    saveLoading:false,
    deleteLoading:false
};

export const fetchDishes = createAsyncThunk<IDishMut[]> (
    'dishes/getDishes',
    async () => {
        const response = await axiosApi.get('/dishes.json');
        let dishes:IDishMut[] = [];
        if (response.data) {
            dishes = Object.keys(response.data).map((key) => {
                const newDish = response.data[key];
                newDish.id = key;
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
        return {
            ...response.data
        };
    },
);

export const addDish = createAsyncThunk<void, IDish >(
    'dishes/fetchAdd',
    async (dish) => {
        await axiosApi.post('/dishes.json', dish);
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
    }
);

const adminPageSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
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
        builder.addCase(deleteDish.pending, (state) => {
            state.deleteLoading = true;
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