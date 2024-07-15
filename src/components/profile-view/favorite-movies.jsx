import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";

export const FavoriteMovies = ({
  favoriteMovies = [],
  user,
  token,
  onUpdateFavorites,
}) => {
  const handleRemoveFav = async (movieId) => {
    try {
      await axios.delete(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdateFavorites(movieId);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (!favoriteMovies || favoriteMovies.length === 0) {
    return <div>No favorite movies to display</div>;
  }

  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} xl={8} className="g-4">
        {favoriteMovies.map((movie) => (
          <Col key={movie._id}>
            <Card className="favorite-movies-card">
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Button
                  variant="secondary"
                  onClick={() => handleRemoveFav(movie._id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onUpdateFavorites: PropTypes.func.isRequired,
};
