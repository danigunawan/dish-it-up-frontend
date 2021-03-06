import React, { Component } from "react";
import { Form, Input, Icon } from "semantic-ui-react";

// import { Button } from 'semantic-ui-react'

class BasicSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  handleOnChange = e => {
    // console.log(e.target.value)
    let newSearch = e.target.value;
    this.setState(prevState => ({
      searchTerm: newSearch
    }));
  };

  handleSearch = e => {
    console.log("searching");
    if (this.props.redirect === true) {
      this.props.history.push("/search");
    }
    if (!this.props.redirect){
      console.log('onstartsearch')
      this.props.onStartSearch();
    }
    e.preventDefault();
    let searchTerm = this.state.searchTerm;
    this.props.onRecipeInput("byText", searchTerm);
    
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Input
            onChange={this.handleOnChange}
            className="icon"
            icon={<Icon color='olive' name="search" onClick={this.handleSearch} />}
            placeholder="Search for Recipes"
          />
        </Form>
      </div>
    );
  }
}

export default BasicSearch;
