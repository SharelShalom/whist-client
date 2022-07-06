import React from "react";
import "./ProductCard.css";

const ProductCard = ({ title, description, price, image, handleClick }) => {
  return (
    <>
      <div className="card-container">
        <div className="card-title">
          <div className="image">
            <img src={image} alt="Image will be here bcd" />
          </div>
        </div>
        <div className="card-content">
          <div className="description">
            <h5>{title}</h5>
            <h5>{description}</h5>
            <h5>{price}</h5>
          </div>
        </div>
        <div className="btn1">
          <button onClick={handleClick}>
            <a>Buy</a>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
