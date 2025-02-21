import React from 'react';
import '../styles/PizzaCard.css';

function PizzaCard({ name, description, price, image }) {
  return (
    <div className="pizza-card">
      <img src={image} alt={name} className="pizza-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="pizza-footer">
        <span className="price">${price}</span>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default PizzaCard;
