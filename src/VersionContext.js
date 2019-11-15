import React from "react";
import { restaurants } from "./data";

const initialState = {
  rating: 3,
  price: 1
};

const actions = {
  SET_RATING: "SET_RATING",
  SET_PRICE: "SET_PRICE",
  RESET: "RESET"
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_RATING:
      return { ...state, rating: action.value };
    case actions.SET_PRICE:
      return { ...state, price: action.value };
    case actions.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export default function VersionContext() {
  return (
    <Provider>
      <Filters />
      <Results />
    </Provider>
  );
}

const RestaurantContext = React.createContext();

function Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    rating: state.rating,
    price: state.price,
    setRating: value => {
      dispatch({ type: actions.SET_RATING, value });
    },
    setPrice: value => {
      dispatch({ type: actions.SET_PRICE, value });
    },
    reset: () => {
      dispatch({ type: actions.RESET });
    }
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

function Filters() {
  const { rating, setRating, price, setPrice, reset } = React.useContext(
    RestaurantContext
  );

  return (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            onClick={() => {
              setRating(num);
            }}
            className={rating >= num ? "active" : ""}
          >
            <span role="img" aria-label={`${num} star`}>
              ⭐️
            </span>
          </button>
        ))}
      </div>

      <div>
        {[1, 2, 3].map(num => (
          <button
            key={num}
            onClick={() => {
              setPrice(num);
            }}
            className={price >= num ? "active" : ""}
          >
            <span role="img" aria-label={`${num} money bag`}>
              💰
            </span>
          </button>
        ))}
      </div>

      <div>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}

function Results() {
  const { rating, price } = React.useContext(RestaurantContext);
  const filtered = restaurants.filter(
    restaurant => restaurant.rating >= rating && restaurant.price >= price
  );

  return (
    <ul>
      {filtered.map(restaurant => (
        <li key={restaurant.name}>
          <h2>{restaurant.name}</h2>

          <p>
            {[...Array(restaurant.rating)].map((_, n) => (
              <span role="img" aria-label="star" key={n}>
                ⭐️
              </span>
            ))}
            <br />
            {[...Array(restaurant.price)].map((_, n) => (
              <span role="img" aria-label="money bag" key={n}>
                💰
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
