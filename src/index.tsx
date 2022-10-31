import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/redux-store';
import {Provider} from 'react-redux';


// просто сотка 20.10.22

// const renderTree = () => {

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )

// удалить StrictMode
//     <React.StrictMode>
//
// </React.StrictMode>,

// renderTree(state)
// renderTree();
// store.subscribe(renderTree);
reportWebVitals();

//
// store.subscribe(()=>{
//     let state = store.getState();
//     renderTree(state);
// });