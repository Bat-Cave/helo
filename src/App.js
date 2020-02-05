import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './dux/store';

function App() {
  return (
      <HashRouter>
    <Provider store={store}>
        <div className="component-container">
          <Nav />
          {routes}
        </div>
    </Provider>
      </HashRouter>
  );
}

export default App;
