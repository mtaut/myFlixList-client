import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./profile-update";
import "./profile-view.scss";

export const ProfileView = ({ movies, onUpdatedUserInfo }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`
        );
        const userData = response.data.find(
          (user) => user.username === username
        );
        setUser(userData);
        setFavoriteMovies(userData.favoriteMovies || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, token]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/users/${user.id}`, user);
      setUpdateSuccess(true);
    } catch (err) {
      setUpdateError(err);
    }
  };

  const handleDeregister = async () => {
    try {
      await axios.delete(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`
      );
      // add logic to log out the user and redirect after degregistration
    } catch (err) {
      setError(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFavorite = async () => {
    try {
      const updateFavorites = [...favoriteMovies, movieTitle];
      setFavoriteMovies(updateFavorites);
      await axios.put(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.id}`,
        { ...user, favoriteMovies: updatedFavorites }
      );
      setMovieTitle("");
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user date</div>;

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
};
