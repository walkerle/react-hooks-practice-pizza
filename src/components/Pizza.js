import React from "react";

function Pizza({pizza, onEditClick}) {
  // Destructured pizza object
  const {topping, size, vegetarian} = pizza;

  // Event Listener: Edit Pizza click
  function handleEditClick() {
    // console.log('handleEditClick');
    onEditClick(pizza);
  }

  return (
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{(vegetarian ? 'Yes' : 'No')}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={handleEditClick}>
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
