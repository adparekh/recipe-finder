import React, { useEffect, useState } from "react";
import Recipe from "./Recipe/Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "2768935d";
  const APP_KEY = "617cd4a57bad116d8770cd729eb361b2";

  const baseURL = `https://api.edamam.com/`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([""]);
  const [query, setQuery] = useState("chicken");

  const getRecipes = async () => {
    const response = await fetch(
      `${baseURL}search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={Math.round(Number(recipe.recipe.calories))}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
