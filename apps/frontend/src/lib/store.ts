import {
  Action,
  ThunkAction,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";

// slices
import sessionReducer from "../redux/slices/sessionSlice";
import userReducer from "../redux/slices/userSlice";

// RTK Queries
import { LoginQueries } from "../redux/queries/login.query";
import { TaskQueries } from "../redux/queries/task.query";
import { UserQueries } from "../redux/queries/user.query";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["session", "user"],
  stateReconciler: autoMergeLevel1,
};

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  [LoginQueries.reducerPath]: LoginQueries.reducer,
  [TaskQueries.reducerPath]: TaskQueries.reducer,
  [UserQueries.reducerPath]: UserQueries.reducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(
        LoginQueries.middleware,
        TaskQueries.middleware,
        UserQueries.middleware
      ),
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
