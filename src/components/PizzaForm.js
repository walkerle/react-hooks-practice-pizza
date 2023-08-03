import React from "react";

function PizzaForm({selectedPizza, onFormChange, onPizzaSubmit}) {
  // Destructured pizza object
  const {topping, size, vegetarian} = selectedPizza;

  // React state(s)
  // NOTE: 'formData' state does not belong here because of the behavior of the 'Edit Pizza' button makes the selectedPizza the typical 'formData'

  // Make form a controlled input
  function handleFormChange(e) {
    // console.log(e.target);
    // e.target.value is a String, so it won't work with radio buttons
    // ==> Need a separate controlled input function
    onFormChange(e.target.name, e.target.value);
  }
  
  // Make form a controlled input for radio buttons
  function handleRadioChange(e) {
    // console.log(e.target);
    onFormChange(e.target.name, e.target.value === "true");
  }

  // Event Listener: handleFormSubmit
  function handleFormSubmit(e) {
    e.preventDefault();

    // console.log('handleFormSubmit');
    onPizzaSubmit(selectedPizza);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping}
            onChange={handleFormChange}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            name="size"
            value={size}
            onChange={handleFormChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              // value="Vegetarian"
              value={true}
              checked={vegetarian}
              onChange={handleRadioChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              // value="Not Vegetarian"
              value={false}
              checked={!vegetarian}
              onChange={handleRadioChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
