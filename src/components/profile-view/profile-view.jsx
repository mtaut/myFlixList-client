import React, { useState, useEffect } from "react";
import { UserInfo } from "./user-info";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { ProfileUpdate } from "./profile-update";
import { DeleteProfile } from "./profile-delete";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import "./profile-view.scss";

export const ProfileView = ({ token, movies }) => {
  const [user, setUser] = useState({});
  const setIsLoading = useState(true);
  const setError = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user.Username) {
      fetchUserData();
    }
  }, [user.Username, token]);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);

    navigate(`/users/${updatedUser.Username}`, { replace: true });
  };

  const onDelete = async (username, token) => {
    const response = await axios.delete(
      `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status !== 200) {
      throw new Error("Could not delete profile");
    }
  };

  const favoriteMovieList = movies.filter((m) =>
    user.FavoriteMovieList ? user.FavoriteMovies.includes(m._id) : false
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <h5>Update Your Info</h5>
            <Card.Body>
              <ProfileUpdate
                username={user.Username}
                token={token}
                user={user}
                onProfileUpdate={handleUpdate}
              />

              <DeleteProfile onDelete={onDelete} isDeleting={false} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies
        favoriteMovieList={favoriteMovieList}
        user={user}
        token={token}
        onUpdateFavorites={(movieId) => {
          setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: prevUser.FavoriteMovies.filter(
              (id) => id !== movieId
            ),
          }));
        }}
      />
    </Container>
  );
};

ProfileView.propTypes = {
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileView;
