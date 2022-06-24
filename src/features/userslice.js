import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    Email : "user",
    initialState : {
        user : null,
    },
    reducers : {
        login : (state , action) => {
            state.user  = action.payload;

        },
        
    }
})