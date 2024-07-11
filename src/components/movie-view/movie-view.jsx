import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

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
