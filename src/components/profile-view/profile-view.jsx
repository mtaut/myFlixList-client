import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { ProfileUpdate } from "./profile-update";
import { DeleteProfile } from "./profile-delete";
import { useNavigate } from "react-router-dom";
import "./profile-view.scss";

export const ProfileView = ({
  username,
  token,
  movies,
  onUpdatedUserInfo,
  handleUpdateFavorites,
}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, token]);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    onUpdatedUserInfo(updatedUser);
  };

  const handleProfileDeleted = () => {
    onDelete();
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  const favoriteMovies = user.FavoriteMovies
    ? movies.filter((m) => user.FavoriteMovies.includes(m._id))
    : [];

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
            <Card.Body>
              <ProfileUpdate
                username={username}
                token={token}
                user={user}
                onProfileUpdate={handleUpdate}
              />
              <DeleteProfile
                user={user}
                token={token}
                onProfileDeleted={handleProfileDeleted}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies
        favoriteMovies={favoriteMovies}
        user={user}
        token={token}
        onUpdateFavorites={handleUpdateFavorites}
      />
    </Container>
  );
};

ProfileView.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  onUpdatedUserInfo: PropTypes.func.isRequired,
  onDeregister: PropTypes.func.isRequired,
  handleUpdateFavorites: PropTypes.func.isRequired,
};

export default ProfileView;
