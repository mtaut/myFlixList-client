import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";

export const FavoriteMovies = ({
  favoriteMovies,
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

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovies.map((movie) => (
            <Col xs={12} md={6} lg={3} key={movie._id} className="fav-movie">
              <Figure>
                <Link to={`/movies/${movie._id}`}>
                  <Figure.Image src={movie.ImagePath} alt={movie.Title} />
                  <Figure.Caption>{movie.Title}</Figure.Caption>
                </Link>
              </Figure>
              <Button
                variant="secondary"
                onClick={() => handleRemoveFav(movie._id)}
              >
                Remove
              </Button>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FavoriteMovies;
