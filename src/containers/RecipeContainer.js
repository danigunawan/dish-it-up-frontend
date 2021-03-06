import React, { Component } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipesHeader from "../components/RecipesHeader";
import { Item, Segment } from "semantic-ui-react";
import LoadingHOC from "../HOC/LoadingHOC";

class RecipeContainer extends Component {
  createRecipeCards = () => {
    console.log("creating recipe cards", this.props.recipes);
    if (this.props.recipes === undefined || this.props.recipes === []) {
      return;
    }
    console.log("recipes: ", this.props.recipes);
    return this.props.recipes.map((recipe, index) => {
      return (
        <RecipeCard
          recipe={recipe}
          onMountFinishProgress={this.props.onMountFinishProgress}
          key={index}
          saved={this.props.saved}
        />
      );
    });
    // () => {this.onMountFinishProgress()}
  };

  ifNoRecipes = () => {
    return this.props.recipes.length === 0 ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>You have no recipes yet, add some through the search bar above!</p>
      </div>
    ) : null;
  };

  render() {
    return (
      <div>
        <ul>
          {this.props.page === "Cookbook" ? (
            <RecipesHeader title={this.props.page} />
          ) : null}
          <div id="recipe-card-list">
            <Segment>
              <Item.Group>{this.createRecipeCards()}</Item.Group>
              <Item.Group>{this.ifNoRecipes()}</Item.Group>
            </Segment>
          </div>
        </ul>
      </div>
    );
  }
}

export default LoadingHOC(RecipeContainer);
