import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/movies`;

export function getMovies() {
  return http.get(apiEndpoint);
}

export function removeMovie(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}
