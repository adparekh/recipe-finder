import React, { useEffect, useState } from "react";
import Recipe from "./Recipe/Recipe";
import styles from "./App.module.css";

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
    <div className={styles.App}>
      <form onSubmit={getSearch} className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchBar}
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <div className={styles.recipes}>
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
      <div>
        <p className={styles.footer}>
          Made By Aditya Parekh using the React.js Framework.
        </p>
        <p className={styles.smaller}>
          <a
            href="https://github.com/adparekh/covid19-tracker"
            target="_blank"
            rel="noreferrer"
          >
            You can find the code here
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
