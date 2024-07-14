import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovies }) {
  const removeFav = async (id) => {
    let token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    let url = `https://myflixlist-7625107afe99.herokuapp.com/users/${username}/movies/${id}`;
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
                <Link to={`/movies/${movies._id}`}>
                  <Figure.Image src={movie.ImagePath} alt={movie.Title} />
                  <Figure.Caption>{movie.Title}</Figure.Caption>
                </Link>
              </Figure>
              <Button variant="secondary" onClick={() => removeFav(movie._id)}>
                Remove
              </Button>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMovies;
