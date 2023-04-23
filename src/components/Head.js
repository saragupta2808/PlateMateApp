import React from "react";
import IngredientList from "./IngredientList";
import FavoriteList from "./FavoriteList";
import ChatBot from "./ChatBot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faHeart,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

export default function Head(props) {
  const meal = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"].map(
    (meals) => {
      return (
        <li>
          <a onClick={() => props.handleFilter("meal", meals)}>{meals}</a>
        </li>
      );
    }
  );
  const cuisine = [
    "American",
    "Asian",
    "Indian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "French",
    "Eastern Europe",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ].map((meals) => {
    return (
      <li>
        <a onClick={() => props.handleFilter("cuisine", meals)}>{meals}</a>
      </li>
    );
  });
  const dish = [
    "Biscuits and cookies",
    "Bread",
    "Cereals",
    "Desserts",
    "Drinks",
    "Main Course",
    "Condiments and sauces",
    "Pancake",
    "Salad",
    "Sandwiches",
    "Side dish",
    "Soup",
    "Starter",
    "Preserve",
    "Preps",
  ].map((meals) => {
    return (
      <li>
        <a onClick={() => props.handleFilter("dish", meals)}>{meals}</a>
      </li>
    );
  });
  return (
    <header>
      <nav>
        <ul className="menu">
          <li>
            <a href="#" style={{ fontSize: "25px", fontWeight: "500" }}>
              Categories
            </a>
            <ul className="submenu">
              <li>
                <a href="#">
                  Meal Type<i className="arrow right"></i>
                </a>
                <ul className="submenu2">{meal}</ul>
              </li>
              <li>
                <a href="#">
                  Cuisine <i className="arrow right"></i>
                </a>
                <ul className="submenu2">{cuisine}</ul>
              </li>
              <li>
                <a href="#">
                  Dish Type <i className="arrow right"></i>
                </a>
                <ul className="submenu2">{dish}</ul>
              </li>
            </ul>
          </li>
        </ul>
        <h2 className="logo">Plate Mate</h2>
      </nav>
      <span onClick={props.handleOpenFavs} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon
          icon={faHeart}
          size="2xl"
          style={{
            color: "rgb(171 40 31)",
            position: "absolute",
            top: "42px",
            left: "265px",
          }}
        />
      </span>
      <span onClick={props.handleShowList} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon
          icon={faBasketShopping}
          size="2xl"
          style={{
            color: "#034d4f",
            position: "absolute",
            top: "42px",
            left: "208px",
          }}
        />
      </span>
      <span onClick={props.handleShowBot} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon
          icon={faMessage}
          size="2xl"
          style={{
            color: "#034d4f",
            position: "absolute",
            top: "44px",
            left: "317px",
          }}
        />
      </span>
      <form className="search-bar" onSubmit={props.handleSubmit}>
        <input
          type="text"
          placeholder="What are you looking for?"
          onChange={props.handleSearch}
          name="search"
          value={props.search}
        />
        <button className="submit-button">submit</button>
      </form>
      <FavoriteList
        showFavs={props.showFavs}
        handleCloseList={props.handleCloseFavs}
        handleOpenList={props.handleOpenFavs}
        favList={props.favList}
      />

      <IngredientList
        showList={props.showList}
        handleCloseList={props.handleCloseList}
        handleShowList={props.handleShowList}
        shoppingList={props.shoppingList}
        handleStrike={(foodId, isStriked) =>
          props.handleStrike(foodId, isStriked)
        }
        handleDeleteRecipe={(item) => props.handleDeleteRecipe(item)}
      />

      <ChatBot
        chatBot={props.chatBot}
        handleShowBot={props.handleShowBot}
        handleCloseBot={props.handleCloseBot}
      />
    </header>
  );
}
