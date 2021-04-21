import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchbox";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {
            path: "title",
            order: "asc",
        },
    };

    async componentDidMount() {
        const genresResult = await getGenres();
        const genresData = genresResult.data;
        const genres = [{ _id: "", name: "All Genres" }, ...genresData];

        const { data: movies } = await getMovies();
        this.setState({ movies, genres });
    }

    handleDelete = async movie => {
        const originalMovies = this.state.movies;

        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                toast.error("This movie has already been deleted.");
            }

            this.setState({ movies: originalMovies });
        }
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movie.liked;

        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({
            selectedGenre: genre,
            searchQuery: "",
            currentPage: 1,
        });
    };

    handleSearch = query => {
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1,
        });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, selectedGenre, searchQuery, movies: allMovies } = this.state;

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(movie => movie.genre._id === selectedGenre._id);
        }

        // Filter Without Search Input
        // const filtered =
        //     selectedGenre && selectedGenre._id
        //         ? allMovies.filter(
        //               (movie) => movie.genre._id === selectedGenre._id
        //           )
        //         : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, genres, selectedGenre, sortColumn, searchQuery } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                    <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect} />
                </div>

                <div className="col">
                    <Link className="btn btn-primary mb-4" to="/movies/new">
                        New Movie
                    </Link>

                    <p>Showing {totalCount} movies in the database.</p>

                    <SearchBox value={searchQuery} onChange={this.handleSearch} />

                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
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

export default Movies;
