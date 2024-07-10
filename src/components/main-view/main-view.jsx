import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Navbar } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixlist-7625107afe99.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  const moviesFromApi = movies.map((movie) => {
    return {
      id: movie.key,
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      director: movie.director,
      image: movie.image,
    };
  });
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary navbar-light"
        style={{ width: "100%" }}
      >
        <Navbar.Brand>Welcome to myFlixList</Navbar.Brand>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
      </Navbar>
      <Row className="justify-content-md-center">
        <div style={{ marginBottom: "8px" }}></div>
        {!user ? (
          <Col md={8}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <div style={{ marginBottom: "8px" }}></div>
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              style={{ border: "1px solid grey" }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};
