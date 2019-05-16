import { FETCH_GENRES } from "../actions/types";
import { SELECT_GENRE } from "./../actions/types";

const INITIAL_STATE = {
  listOfGenres: [],
  selectedGenre: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GENRES:
      return {
        listOfGenres: [...state.listOfGenres, ...action.payload],
        selectGenre: { ...state.selectedGenre }
      };
    case SELECT_GENRE:
      return {
        listOfGenres: [...state.listOfGenres],
        selectedGenre: { ...action.payload }
      };
    default:
      return state;
  }
};
