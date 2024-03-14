import React from "react";
import "./UserAvathar.css";

const UserProfile = ({ userName, avatarUrl }) => {
  const generateAvatar = () => {
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt="User Avatar"
          style={{
            height: "70px",
            width: "70px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      );
    } else {
      const initials = userName ? userName.charAt(0).toUpperCase() : "";
      return (
        <div className="avatar" style={{ fontSize: "30px" }}>
          {initials}
        </div>
      );
    }
  };

  return (
    <div className="profile-container">
      <div className="avatar-container">
        {generateAvatar()}
      </div>
    </div>
  );
};

export default UserProfile;
