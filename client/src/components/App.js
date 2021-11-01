import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import ShoppingList from './ShoppingList';
import Header from './Header';
import history from '../history';
import '../styles/reset.css';


const App = () => {

  return (
    <div>
      <Router history={history}>
        <Header></Header>

        <Switch>
          <Route path='/' exact component={RecipeList} />
          <Route path='/recipe/:id' component={RecipeDetails} />
          <Route path='/shopping-list' component={ShoppingList}></Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
