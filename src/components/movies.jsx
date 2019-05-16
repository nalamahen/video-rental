import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  fetchMovies,
  deleteMovie,
  likeMovie,
  fetchGenres,
  selectGenre
} from "./../actions/index";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.props.fetchGenres();
    this.props.fetchMovies();
  }

  handleDelete = movie => {
    this.props.deleteMovie(movie._id);
  };

  handleLike = movie => {
    this.props.likeMovie(movie._id);
  };

  handleGenreSelect = genre => {
    this.props.selectGenre(genre);
    this.setState({ currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { selectedGenre } = this.props;

    const filtered =
      selectedGenre && selectedGenre._id
        ? this.props.movies.filter(m => m.genre._id === selectedGenre._id)
        : this.props.movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.props.movies;
    const { pageSize, currentPage } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.props.genres}
            selectedItem={this.props.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: Object.values(state.movies),
    genres: [{ _id: "", name: "All Genres" }, ...state.genres.listOfGenres],
    selectedGenre: state.genres.selectedGenre
  };
};
export default connect(
  mapStateToProps,
  { fetchMovies, deleteMovie, likeMovie, fetchGenres, selectGenre }
)(Movies);
