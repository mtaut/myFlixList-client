import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import "./movie-view.scss";
import { useSelector } from "react-redux";

export const MovieView = ({ movies, user, token, onFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movieId)) {
      setIsFavorite(true);
    }
    setLoading(false);
  }, [movieId, user.FavoriteMovies]);

  const handleFavorite = async () => {
    try {
      console.log("Token being used:", token);
      console.log("User being used:", user.Username);
      if (isFavorite) {
        const response = await axios.delete(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Remove favorite response:", response.data);
        setIsFavorite(false);
        onFavorite(movieId, false);
      } else {
        const response = await axios.post(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Add favorite response:", response.data);
        setIsFavorite(true);
        onFavorite(movieId, true);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            Loading...
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Row className="mb-3">
            <Col xs={12} className="text-center"></Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Title:
            </Col>
            <Col xs={8}>{movie.Title}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Director:
            </Col>
            <Col xs={8}>{movie.Director.Name}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Genre:
            </Col>
            <Col xs={8}>{movie.Genre.Name}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Description:
            </Col>
            <Col xs={8}>{movie.Description}</Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Link to={"/"}>
                <Button className="back-button">Back</Button>
              </Link>
              <Button
                onClick={handleFavorite}
                className="favorite-button"
                variant={isFavorite ? "primary" : "primary"}
              >
                {isFavorite ? "Unfavorite" : "Favorite"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
};
