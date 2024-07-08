import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Row className="mb-3">
            <Col xs={12} className="text-center">
              <img src={movie.image} alt={movie.title} className="img-Fluid" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Title:
            </Col>
            <Col xs={8}>{movie.title}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Director:
            </Col>
            <Col xs={8}>{movie.director}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Genre:
            </Col>
            <Col xs={8}>{movie.genre}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="font-weight-bold">
              Description:
            </Col>
            <Col xs={8}>{movie.description}</Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button onClick={onBackClick} variant="primary">
                Back
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
MovieView.PropTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
};
