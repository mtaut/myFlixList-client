import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { ProfileUpdate } from "./profile-update";
import { DeleteProfile } from "./profile-delete";
import { useNavigate } from "react-router-dom";
import "./profile-view.scss";

export const ProfileView = ({ token, movies, onLogout }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`,
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
        setLoading(false);
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to deregister?")) {
      setIsDeleting(true);
      try {
        const response = await axios.delete(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          alert("Profile successfully deleted");
          onLogout();
          navigate("/login");
        } else {
          alert("Something went wrong");
          setIsDeleting(false);
        }
      } catch (error) {
        console.error("There was an error deleting the profile", error);
        setIsDeleting(false);
      }
    }
  };

  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies ? user.FavoriteMovies.includes(m._id) : false
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
              <DeleteProfile onDelete={handleDelete} isDeleting={isDeleting} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies
        favoriteMovies={favoriteMovies}
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
