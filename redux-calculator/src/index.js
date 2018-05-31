// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

//------------------------------------

// import React from 'react';
// import ReactDOM from 'react-dom';
// import CalculatorContainer from './containers/CalculatorContainer';
// import './index.css';

// ReactDOM.render(
//   <CalculatorContainer />,
//   document.getElementById('root')
// );

//------------------------------------

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CalculatorContainer from './containers/CalculatorContainer';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <CalculatorContainer />
  </Provider>,
  document.getElementById('root')
);