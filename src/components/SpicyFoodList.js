import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  function handleAddFood() {
    // Use the spread operator to make a copy of our foods array,
    // and insert it into a new array. Add the newly generated food
    // returned by the getNewSpicyFood function at the end of the array.
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood];
    
    // Pass a new array to setState to update state
    setFoods(newFoodArray);
  }

  function handleLiClick(id) {
    // .map will iterate through the array and return a new array
    // Whatever value is returned by the callback function that
    // we pass to .map will be added to this new array
    const newFoodArray = foods.map((food) => {
      // If the ID of the food we're iterating over matches the ID of the
      // food we're updating, return a new food object with the heat level
      // incremented by 1
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        // Otherwise, return the original food object
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  // function handleLiClick(id) {
  //   // Use .filter to look for all foods except the number we're trying
  //   // to remove to get back a new, shortened list of foods.
  //   const newFoodArray = foods.filter((food) => food.id !== id);

  //   // Set state with this updated list of foods to re-render our component,
  //   // causing the food to be removed from the list.
  //   setFoods(newFoodArray);
  // }

  // const foodList = foods.map((food) => (
  //   <li key={food.id} onClick={() => handleLiClick(food.id)}>
  //     {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  //   </li>
  // ));

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // return (
  //   <div>
  //     <button onClick={handleAddFood}>Add New Food</button>
  //     <ul>{foodList}</ul>
  //   </div>
  // );

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }
  
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
