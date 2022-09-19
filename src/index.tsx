import React from 'react';
// import store from './component/redux/store';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import store from './component/redux/redux-store';




const renderTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App store={store}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )
    ;

}
// renderTree(state)
renderTree();
store.subscribe(renderTree);
reportWebVitals();

//
// store.subscribe(()=>{
//     let state = store.getState();
//     renderTree(state);
// });