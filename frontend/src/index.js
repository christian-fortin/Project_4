import React from 'react';
// This^ isn't used anymre but just nice to have
import ReactDOM from 'react-dom';
// ReactDOM helps render the app on the webpage. It is a package that provides DOM-specific methods that are used at the top level of an application. 
import './index.css';
// CSS
import App from './App';
import { store } from './app/store'; 
// -- 410 What is this^ for?
import { Provider } from 'react-redux';
// This component makes the redux store available to any nested components that need to access the redux store
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* ^where our application actually is in */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
