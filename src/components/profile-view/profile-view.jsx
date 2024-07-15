import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { ProfileUpdate } from "./profile-update";
import "./profile-view.scss";

export const ProfileView = ({
  movies,
  onUpdatedUserInfo,
  onDeregister,
  handleUpdateFavorites,
  handleUpdate,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("user");
        const response = await axios.get(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`
        );
        setUser(response.data);
        setFavoriteMovies(response.data.favoriteMovies || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUpdateSuccess(true);
      onUpdatedUserInfo(response.data);
    } catch (err) {
      setUpdateError(err);
    }
  };

  const handleDeregister = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onDeregister();
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  /*const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };*/

  const handleUpdateFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie._id !== movieId
    );
    setFavoriteMovies(updatedFavorites);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

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
              <ProfileUpdate
                user={user}
                onUpdatedUserInfo={onUpdatedUserInfo}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Button
                type="button"
                class="btn btn-warning"
                onClick={handleDeregister}
              >
                Deregister
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies
        favoriteMovie={favoriteMovies}
        user={user}
        token={localStorage.getItem("token")}
        onUpdateFavorites={handleUpdateFavorites}
      />
    </Container>
  );
};

export default ProfileView;
