import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedMovie = movies.find((movie) => movie._id === movieId);
    if (selectedMovie) {
      setMovie(selectedMovie);
      setLoading(false);
    }
  }, [movieId, movies]);

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
