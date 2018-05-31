import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import { TodoLoader } from './containers/Todo/TodoLoader';
import Home from './containers/Home';

export const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>初期化中...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/todo" component={TodoLoader} />
        </Switch>
      </Suspense>
    </Router>
  );
};
