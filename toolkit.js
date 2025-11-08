import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const addTooCart = createAction("ADD_TO_CART");

const cartReducer = createReducer([], (builder) => {
  builder.addCase(addTooCart, (state, action) => {
    state.push(action.payload);
  });
});

const login = createAction("CREATE_SESSION");

const loginReducer = createReducer({ status: false }, (builder) => {
  builder.addCase(login, (state, action) => {
    state.status = true;
  });
});

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  console.log("STORE CHANGED :", store.getState());
});

store.dispatch(addTooCart({ id: 1, qty: 10 }));
store.dispatch(addTooCart({ id: 2, qty: 20 }));
store.dispatch(login());
