import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-view.scss";
import axios from "axios";

export const MovieView = ({ movies, user, token, onUpdateFavorites }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  useEffect(() => {
    if (user.FavoriteMovies.includes(movieId)) {
      setIsfavorite(true);
    }
  }, [movieId, user.Favorite.Movies]);

  const handleAddToFavorites = async () => {
    try {
      await axios.post(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdateFavorites(movieId);
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
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};
