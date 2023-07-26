import { configureStore } from '@reduxjs/toolkit';
import {adminPageReducer} from "../container/AdminPage/adminPageSlice";

export const store = configureStore({
    reducer: {
        adminPage:adminPageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;