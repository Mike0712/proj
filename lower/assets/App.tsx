import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes';
import { useDispatch } from 'react-redux';
import { authThunk } from './store/thunks/userThunk';
import { ToastContainer } from 'react-toastify';
import { useWebsocket } from './hooks/websocket';
// Import scss
import "styles/scss/theme.scss";
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from './store';

const App = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(authThunk());
    }, []);

    useWebsocket((status: any) => console.log(status))

    return (
        <BrowserRouter>
            <Routes />
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App