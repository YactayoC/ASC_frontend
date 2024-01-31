import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const ButtonSocials = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "0",
        top: "58%",
        transform: "translateY(-50%)",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: "100",
      }}
    >
      <IconButton component="a" href="https://www.facebook.com">
        <Facebook
          sx={{
            fontSize: "2.5rem",
            color: "#0866ff",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        />
      </IconButton>
      <IconButton component="a" href="https://www.linkedin.com">
        <LinkedIn
          sx={{
            fontSize: "2.5rem",
            color: "#0e76a8",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        />
      </IconButton>
      <IconButton component="a" href="https://www.twitter.com">
        <Twitter
          sx={{
            fontSize: "2.5rem",
            color: "#00acee",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        />
      </IconButton>
    </Box>
  );
};

export default ButtonSocials;
