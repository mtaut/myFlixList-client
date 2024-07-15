import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { ProfileUpdate } from "./profile-update";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  token,
  movies,
  onUpdatedUserInfo,
  onDeregister,
  handleRemoveFav,
}) => {
  const [username, setUsername] = useState(user.Username);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeregistering, setIsDeregistering] = useState(user.Birthday);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsername(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, token]);

  const handleDeregister = async () => {
    if (alert.confirm("Do you want to deregister and delete your profile?")) {
      isDeregistering(true);
      try {
        const response = await axios.delete(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          alert("You have deleted your profile");
          onDeregister();
          navigate("/login");
        } else {
          alert("Did not degregister profile:", response.error);
          setIsDeregistering(false);
        }
      } catch (error) {
        console.error("Error deregistering user:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

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
        token={token}
        onUpdateFavorites={movieId}
      />
    </Container>
  );
};

export default ProfileView;
