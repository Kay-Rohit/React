import React from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes.js';
import Dishdetail from './DishdetailComponent';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  onDishSelect(dishID) {
    this.setState({ selectedDish: dishID});
}

  render() {

    const HomePage = ()=> {
        return(
            <Home />
        );
    }
    return (
      <div>
        <Header/>
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}
 

export default Main;
