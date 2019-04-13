import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

const theme = createMuiTheme({
    palette: {
      primary: red,
      secondary: {
        main: '#f44336',
      },
    },
    typography: {
        useNextVariants: true,
    },
  });

firebase.initializeApp({
  apiKey: "AIzaSyCCzQysUTO_AiHUC7cdjSPMIyzOey-4Cdc",
  authDomain: "green-groupie.firebaseapp.com",
  databaseURL: "https://green-groupie.firebaseio.com",
  projectId: "green-groupie",
  storageBucket: "green-groupie.appspot.com",
  messagingSenderId: "926880650381"
});

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { theme };
