import { configureStore } from '@reduxjs/toolkit';

import employeesReducer from './reducers/employees';

export const store = configureStore({
  reducer: { employees: employeesReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
