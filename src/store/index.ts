import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit';
import charactersReducer from 'src/modules/characters/slice';
import characterReducer from 'src/modules/character/slice';

const store = configureStore({
	reducer: {
		charactersReducer,
		characterReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export default store;
