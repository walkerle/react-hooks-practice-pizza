import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  // Initial selected pizza => empty key-value pairs
  const initialPizza = {
    id: '',
    topping: '',
    size: '',
    vegetarian: false
  };

  // React state(s)
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(initialPizza);

  // Fetch initial pizza menu once using useEffect
  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
    .then(res => res.json())
    .then(data => setPizzaMenu(data))
  }, []);

  // Event Handler: onEditClick
  function onEditClick(pizzaDetails) {
    // console.log(typeof pizzaDetails);
    setSelectedPizza(pizzaDetails);
  }

  // Event Handler: Make form controlled input here!!
  // selectedPizza === formData => formData state is not in PizzaForm component because the 'edit pizza' button pushes the pizza data into selectedPizza! selectedPizza state is the controlled input
  function onFormChange(name, value) {
    // console.log('onFormChange');
    // console.log(name);
    // console.log(value, typeof value);
    setSelectedPizza({...selectedPizza, [name]: value});
  }

  // Event Handler: onPizzaSubmit
  function onPizzaSubmit(pizzaDetails) {
    // console.log('onPizzaSubmit');
    // console.log(pizzaDetails);
    
    // ---OPTIMISTIC frontend rendering---
    // setPizzaMenu(pizzaMenu.map(pizza => (pizza.id === pizzaDetails.id ? pizzaDetails : pizza)))
    // ------------------------------------

    // backend
    fetch(`http://localhost:3001/pizzas/${pizzaDetails.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(pizzaDetails)
    })
    .then(res => res.json())
    // ---PESSIMISTIC frontend rendering---
    .then(data => setPizzaMenu(pizzaMenu.map(pizza => (pizza.id === data.id ? data : pizza))))
    // ------------------------------------


    // Reset pizza form
    setSelectedPizza(initialPizza);
  }

  return (
    <>
      <Header />
      <PizzaForm selectedPizza={selectedPizza} onFormChange={onFormChange} onPizzaSubmit={onPizzaSubmit} />
      <PizzaList pizzaMenu={pizzaMenu} onEditClick={onEditClick} />
    </>
  );
}

export default App;