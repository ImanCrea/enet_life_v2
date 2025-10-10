import {
    configureStore,
    combineReducers,
    ThunkAction,
    Action,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './features/userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const reducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
