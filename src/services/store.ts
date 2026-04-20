import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice/ingredientsSlice';
import { combineReducers } from '@reduxjs/toolkit';
import feedsReducer from '../services/slices/feedsSlice/feedsSlice';
import ingredientsConstructorReducer from '../services/slices/constructorIngredientsSlice/constructorIngredientsSlice';
import userLoginReducer from '../services/slices/userSlice/userSlice';
import ordersReducer from '../services/slices/orderSlice/orderSlice';
import userOrdersReducer from '../services/slices/userOrdersSlice/userOrderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  constructorIngredients: ingredientsConstructorReducer,
  user: userLoginReducer,
  order: ordersReducer,
  userOrders: userOrdersReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
