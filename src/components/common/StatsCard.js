import React from "react";
import "./ProductCard.css";

const StatsCard = ({ listTopFiveSell, listTopFiveUniqueSell, listPastFiveDays }) => {
  return (
    <>
      <div className="card-container">
        <div className="card-title">
          <span>TOP 5 sell</span>
        </div>
        <div className="card-content">
          <div className="description">
            <ul>
              {listTopFiveSell && listTopFiveSell.map((item) => (
                <li key={item.product.title}>
                  {item.product.title + "  " + item.times}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="card-container">
        <div className="card-title">
          <span>TOP 5 sell Unique</span>
        </div>
        <div className="card-content">
          <div className="description">
            <ul>
              {listTopFiveUniqueSell && listTopFiveUniqueSell.map((item) => (
                <li key={item.product.title}>
                  {item.product.title + "  " + item.times}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="card-container">
        <div className="card-title">
          <span>Past 5 days</span>
        </div>
        <div className="card-content">
          <div className="description">
            <ul>
              {listPastFiveDays && listPastFiveDays.map((item) => (
                <li key={item[0]}>
                  {item[0] + "            " + item[1] + "$"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
