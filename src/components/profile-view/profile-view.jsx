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
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdatedUserInfo(response.data);
    } catch (err) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeregister = async () => {
    try {
      await axios.delete(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onDeregister();
    } catch (error) {
      console.error("Error deregistering user:", error);
    }
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
