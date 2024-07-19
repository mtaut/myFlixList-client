import React from "react";

export const UserInfo = ({ email, name }) => {
  return (
    <>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </>
  );
};
export default UserInfo;
