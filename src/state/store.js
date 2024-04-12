import { configureStore } from '@reduxjs/toolkit';

import jsonGraphReducer from './slices/jsonGraphSlice';
import analyticsDataReducer from './slices/analyticsSlice';


export const store = configureStore({
    reducer: {
        jsonGraph: jsonGraphReducer,
        analyticsData: analyticsDataReducer
        // Other reducers...
    },
});
