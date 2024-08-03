import { useState, useEffect } from "react";
import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.list);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixlist-7625107afe99.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        dispatch(setMovies(movies));
      });
  }, [token, dispatch]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const addFavorite = async (movieId) => {
    if (!user) return;

    try {
      const response = await axios.post(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Add favorite response:", response.data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (movieId) => {
    if (!user) return;

    try {
      const response = await axios.delete(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Remove favorite response:", response.data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const onFavorite = (movieId, isFavorite) => {
    if (isFavorite) {
      addFavorite(movieId);
    } else {
      removeFavorite(movieId);
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Routes>
              <Route
                path="/users"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView
                          onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("token", token);
                          }}
                        />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>One moment please...</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView
                          movies={movies}
                          user={user}
                          token={token}
                          onFavorite={onFavorite}
                        />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/users/:Username"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <Col md={8}>
                        <ProfileView token={token} movies={movies} />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? <Navigate to="/login" replace /> : <MoviesList />}
                  </>
                }
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
