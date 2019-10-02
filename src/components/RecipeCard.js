import React, { Component } from "react";
import { Button, Icon, Item, Divider } from "semantic-ui-react";
import RecipeModal from "./RecipeModal";

const BASE_URL = "http://localhost:3000/";

class RecipeCard extends Component {
  constructor() {
    super();
    this.state = {
      saved: false,
      deleted: false
    };
  }

  componentDidMount() {
    this.setState({
      saved: this.props.saved
    });
  }

  saveRecipe = e => {
    if (this.state.saved === false) {
      this.setState({
        saved: true
      });
      console.log("saving: ", this.props.recipe);
      fetch(`${BASE_URL}saverecipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recipe: this.props.recipe,
          user_id: localStorage.getItem("user_id")
        })
      });
    }
  };

  deleteRecipe = e => {
    console.log("delete this recipe!");
    fetch(`${BASE_URL}deleterecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipe: this.props.recipe,
        user_id: localStorage.getItem("user_id")
      })
    }).then(
      this.setState({
        deleted: true
      })
    );
  };

  showModal = () => {
    console.log("clicking");
    return <RecipeModal recipe={this.props.recipe} />;
  };

  // <RecipeModal recipe={this.props.recipe}/>

  // componentDidMount = () =>{
  //     this.props.onMountFinishProgress()
  // }

  render() {
    let { title, link, img, madeBy, description } = this.props.recipe;
    return (
      // <div id='recipe-card' >
      <>
        {this.state.deleted ? null : (
          <Item id="recipe-card">
            <Item.Image
              className="recipe-photo"
              size="medium"
              src={img}
              akt="recipe photo"
              onClick={this.showModal}
            />
            <Item.Content>
              <Item.Header>{title}</Item.Header>
              <Item.Extra as="a" href={link}>
                Created By: {madeBy}
              </Item.Extra>
              <Item.Description>{description}</Item.Description>
              <Item.Extra>
                <RecipeModal
                  saved={this.state.saved}
                  recipe={this.props.recipe}
                  onSaveRecipe={this.saveRecipe}
                />
                {this.props.saved === false ? (
                  <Button icon onClick={this.saveRecipe}>
                    <Icon name={this.state.saved ? "heart" : "heart outline"} />
                  </Button>
                ) : (
                  <Button icon onClick={this.deleteRecipe}>
                    <Icon color='red' name="delete" />
                  </Button>
                )}
              </Item.Extra>
            </Item.Content>
          </Item>
        )}
      </>
    );
  }
}

export default RecipeCard;
