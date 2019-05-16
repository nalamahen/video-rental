import {
  FETCH_MOVIES,
  DELETE_MOVIE,
  LIKE_MOVIE,
  FETCH_GENRES,
  SELECT_GENRE
} from "./types";
import { getMovies, removeMovie } from "./../services/movieService";
import { getGenres } from "./../services/genreService";

export const fetchMovies = () => async dispatch => {
  const response = await getMovies();

  dispatch({ type: FETCH_MOVIES, payload: response.data });
};

export const deleteMovie = id => async dispatch => {
  await removeMovie(id);

  dispatch({ type: DELETE_MOVIE, payload: id });
};

export const likeMovie = id => dispatch => {
  dispatch({ type: LIKE_MOVIE, payload: id });
};

export const fetchGenres = () => async dispatch => {
  const response = await getGenres();

  dispatch({ type: FETCH_GENRES, payload: response.data });
};

export const selectGenre = genre => dispatch => {
  dispatch({ type: SELECT_GENRE, payload: genre });
};
