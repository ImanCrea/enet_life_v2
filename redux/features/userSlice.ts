import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: [],
    isLoggedIn: false,
    isLoading: false,
    userToken: null,
    onBoardingStatus: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
        },
        logoutUser: () => {
        },
        setOnBoardingStatus: state => {
        },
    },
});

export const {loginUser, logoutUser, setOnBoardingStatus} = userSlice.actions;

export default userSlice.reducer;
