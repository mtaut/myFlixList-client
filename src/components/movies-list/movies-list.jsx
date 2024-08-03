import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row className="mb-4">
        <Col xs={12}>
          <MoviesFilter />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {movies.length === 0 ? (
          <Col>One moment please...</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard movie={movie} />
              <br></br>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
