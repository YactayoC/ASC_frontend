import { Chat, CloseOutlined, SendOutlined } from "@mui/icons-material";
import {
  Tooltip,
  Box,
  IconButton,
  Button,
  TextField,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import theme from "../../../theme";

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [chatMessages, setChatMessages] = useState([
    { sender: "soporte", text: "¡Hola! ¿Cómo puedo ayudarte hoy?" },
    {
      sender: "usuario",
      text: "Hola, no puedo acceder a mi cuenta, me dice que mi correo no está registrado",
    },
    {
      sender: "soporte",
      text: "¿Cuál es tu correo?",
    },
    {
      sender: "usuario",
      text: "Mi correo es: luis@gmail.com",
    },
  ]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "usuario", text: userMessage },
      ]);
      setUserMessage("");
    }
  };

  return (
    <>
      <Tooltip title="Chatea con nosotros" placement="left" arrow>
        <Box
          onClick={handleChatToggle}
          sx={{
            position: "fixed",
            right: "30px",
            bottom: "20px",
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            gap: "10px",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IconButton>
            <Chat
              sx={{
                fontSize: "2rem",
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </IconButton>
        </Box>
      </Tooltip>

      {isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            right: isSmallScreen ? "20px" : "6rem",
            bottom: isSmallScreen ? "6rem" : "6rem",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "20px",
            width: isSmallScreen ? "90%" : "30rem",
            zIndex: "1000",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h6">Chat de Soporte</Typography>
            <IconButton onClick={handleCloseChat}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              height: "100%",
              overflowY: "auto",
              maxHeight: "25rem",
            }}
          >
            {chatMessages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor:
                    message.sender === "soporte" ? "#e0f7fa" : "#f3f3f3",
                  borderRadius: "8px",
                  padding: "8px",
                  marginBottom: "8px",
                  alignSelf:
                    message.sender === "soporte" ? "flex-start" : "flex-end",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: "15rem",
                    width: "fit-content",
                  }}
                >
                  {message.text}
                </Typography>
              </Box>
            ))}
          </Box>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              marginTop: "auto",
              padding: "1rem",
              borderTop: "1px solid #ccc",
            }}
          >
            <TextField
              label="Escribe tu mensaje"
              variant="outlined"
              fullWidth
              multiline
              rows={1}
              margin="normal"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{
                height: "100%",
                padding: "1rem",
              }}
            >
              <SendOutlined />
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ChatButton;
