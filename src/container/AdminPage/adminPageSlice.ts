import {createSlice} from '@reduxjs/toolkit';

interface Dishes {
    dish:[] | null;
}

const initialState: Dishes = {
    dish: null,
};


const contactsSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},

});

export const contactsReducer = contactsSlice.reducer;