import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Redux 
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./state"
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: authReducer
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
