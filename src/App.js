import logo from './logo.svg';
import './App.css';
import Header from './components/header/component';
import Questions from './components/questions/component';
import Signin from './components/signin/component';
import Signup from './components/signup/component';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  console.log(store.getState());
  return (
    <Provider store={store} >
      <div className="App">
        <BrowserRouter>
          <Header />
          <div className="page-wrapper">
            <Switch>
              <Route exact path="/questions" component={Questions} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
