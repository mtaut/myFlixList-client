import React from "react";
import PropTypes from "prop-types";

export const UserInfo = ({ email, name }) => {
  return (
    <>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </>
  );
};

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default UserInfo;
