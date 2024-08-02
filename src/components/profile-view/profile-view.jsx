import React, { useState, useEffect } from "react";
import { UserInfo } from "./user-info";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { ProfileUpdate } from "./profile-update";
import { DeleteProfile } from "./profile-delete";
import PropTypes from "prop-types";
import axios from "axios";
import "./profile-view.scss";

export const ProfileView = ({ movies, token }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      axios
        .get(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [user, token]);

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status !== 200) {
        throw new Error("Could not delete profile");
      }

      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={4} md={6} lg={8}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Header>Update Your Info</Card.Header>
            <Card.Body>
              <ProfileUpdate
                user={user}
                token={token}
                onProfileUpdate={handleProfileUpdate}
              />
              <DeleteProfile onDelete={onDelete} isDeleting={false} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Card>
            <Card.Header>Favorite Movies</Card.Header>
            <Card.Body>
              <FavoriteMovies favorites={favoriteMovies} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

export default ProfileView;
