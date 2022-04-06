import { Typography } from "@mui/material";
import * as React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Typography variant="h1">😞</Typography>
      <Typography variant="h2">404</Typography>
      <Typography variant="h3">Page not found</Typography>
    </div>
  );
};

export default NotFoundPage;
