import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favorites }) => {
  return (
    <div className="favorite-movies">
      {favorites.length === 0 ? (
        <p>No favorite movies</p>
      ) : (
        favorites.map((movie) => (
          <Card key={movie._id} className="mb-3">
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Director.Name}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="primary">Movie Info</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

FavoriteMovies.propTypes = {
  favorites: PropTypes.array.isRequired,
};

export default FavoriteMovies;
