import _ from "lodash";
import { FETCH_MOVIES, DELETE_MOVIE, LIKE_MOVIE } from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case DELETE_MOVIE:
      return _.omit(state, action.payload);
    case LIKE_MOVIE:
      const movies = { ...state };
      movies[action.payload].liked = !movies[action.payload].liked;
      return movies;
    default:
      return state;
  }
};
