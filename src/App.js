import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Tabs from './components/Tabs/Tabs';
import PendingPage from './pages/Pending/Pending';
import CompletedPage from './pages/Completed/Completed';
import DeletedPage from './pages/Deleted/Deleted';
import EditPage from './pages/Edit/Edit';
import NotFoundPage from './pages/NotFound/NotFound';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="row justify-content-center">
        <h1>TODO APP</h1>
      </header>
      <Provider store={store}>
        <BrowserRouter>
          <main className="container p-0">
            <Tabs></Tabs>
            <div className="card">
              <Switch>
                <Route exact path="/" component={PendingPage}></Route>
                <Route exact path="/completed" component={CompletedPage}></Route>
                <Route exact path="/deleted" component={DeletedPage}></Route>
                <Route exact path="/create" component={EditPage}></Route>
                <Route exact path="/edit/:id" component={EditPage}></Route>
                <Route component={NotFoundPage}></Route>
              </Switch>
            </div>
          </main>
        </BrowserRouter>
      </Provider>
      <footer></footer>
    </div>
  );
}

export default App;
