import React, { Component } from "react";
import "./App.css";
import Dashboard from "./containers/Dashboard";
import SearchPage from "./containers/SearchPage";
import LoginPage from "./containers/LoginPage";
import MyRecipesPage from "./containers/MyRecipesPage";
import NavBar from "./containers/NavBar";
import Pantry from "./containers/Pantry";
import { BrowserRouter as Router, Route } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class App extends Component {
  constructor(){
    super()
 

    this.state = {
      query: "",
      logged_in: false,
      searchResults: []
    };
  }

  logIn = username => {
    console.log("loggin in!", username);
    fetch(BASE_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })
      .then(response => response.json())
      .then(user => {
        localStorage.setItem("user_id", user.user_id);
        this.setState({logged_in: true})
      });
    // this.setState(prevState => {
    //   ...prevState,
    //   currentUser:
    // })
  };

  logOut = () => {
    localStorage.setItem('user_id', null)
    this.setState({logged_in: false})
  }

  changeQuery = searchTerm => {
    console.log(searchTerm);
    this.setState(
      prevState => ({
        query: searchTerm
      }),
      () => this.fetchRecipes()
    );
  };

  fetchRecipes = () => {
    console.log("fetchin those recipes");
    console.log(this.state.query);
    let searchTerm = this.state.query;
    fetch("http://localhost:3000/getrecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        searchTerm: searchTerm
      })
    })
      .then(response => response.json())
      .then(results =>
        this.setState({
          searchResults: results
        })
      );
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Route path='/' render={props => <NavBar key='nav-bar' onLogOut={this.logOut} loggedIn={this.state.logged_in} />} />


          {this.state.logged_in ? (
          <Route path="/" exact render={() => <Dashboard />} />
          ) : (
            <Route
              path="/"
              exact
              render={() => <LoginPage onLogIn={this.logIn} />}
            />
          )}
          <Route
            path="/search"
            render={props => (
              <SearchPage currentUser={localStorage.getItem('user_id')}
              { ...props }
                onRecipeInput={this.changeQuery}
                searchResults={this.state.searchResults}
              />
            )}
          />
          <Route path="/pantry" render={() => <Pantry currentUser={localStorage.getItem('user_id')} />} />
          <Route
            path="/recipes"
            render={() => (
              <MyRecipesPage currentUser={localStorage.getItem('user_id')} />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;

// <Router>
// {(this.state.logged_in) ?
// // <Route path='/' render={ props => <NavBar />} />,
// <Route path='/' exact render={ props => <Dashboard onRecipeInput={this.changeQuery} />} />
// :
//   <Route path='/' exact render={props => <LoginPage />} />
// }
// </Router>
