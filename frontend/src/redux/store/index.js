import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import wordDetailsReducer from "../slices/wordDetailsSlice"
import storage from 'redux-persist/lib/storage'
import { 
        persistStore, 
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
    } from 'redux-persist'

//create the root reducer
const rootReducer = combineReducers({
    word: wordDetailsReducer,
    user: userReducer
})

//create the persist config 
const persistConfig = {
    key: 'root',
    storage,
}

//create the persisted reducer 
const persistedReducer = persistReducer(persistConfig, rootReducer)

//create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})


//create the persistor 
const persistor = persistStore(store)

//export the store and the persistor

export {
    store,
    persistor
}
