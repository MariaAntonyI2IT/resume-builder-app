import { createSlice } from '@reduxjs/toolkit'

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        userId: 1,
        name: 'Maria Antony',
        resume: [

        ]
    },
    reducers: {
        updateUserName: (state, { payload }) => {
            state.name = payload;
        },
        updateUserID: (state, { payload }) => {
            state.userId = payload;
        },
        updateResume: (state, { payload }) => {
            state.resume = payload;
        }
    }
})

export const { updateResume, updateUserID, updateUserName } = userProfileSlice.actions
