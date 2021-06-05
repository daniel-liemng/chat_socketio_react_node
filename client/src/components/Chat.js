import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Box, Grid, Paper, makeStyles } from "@material-ui/core";
import Input from "./Input";
import Room from "./Room";
import ShowMessages from "./ShowMessages";
import People from "./People";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    width: "100%",
    height: "100vh",
  },
  paper: {
    width: "60%",
    height: "80vh",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
  },
  input: {
    position: "absolute",
    bottom: "0",
    right: "2rem",
  },
}));

let socket;

const Chat = ({ location }) => {
  const classes = useStyles();

  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://chat-socketio-api.herokuapp.com/";

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // 1st: handle JOIN
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // Fix CORS problem
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    setName(name);
    setRoom(room);

    // Send data to server
    // 3rd param: error handling
    socket.emit("join", { name, room }, () => {});

    // console.log(socket);

    // clean-up func: disconnect socket.io
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // 2nd: Handle message
  useEffect(() => {
    // listen from backend and add message
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // User join -> user List
  useEffect(() => {
    socket.on("roomData", (roomData) => {
      setUsers(roomData.users);
    });
  }, [name, room]);

  // Function to send message from frontend
  const sendMessage = (e) => {
    e.preventDefault();

    // Callback func is to clean message
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} style={{ height: "100%" }}>
          <Grid item sm={12} md={4}>
            <Paper elevation={0}>
              <Room {...{ room }} />
              <People {...{ users }} />
            </Paper>
          </Grid>
          <Grid item sm={12} md={8} style={{ height: "100%" }}>
            <Box className={classes.messageContainer}>
              {/* name: to define who send/receive message */}
              <ShowMessages {...{ messages, name }} />
              <Input
                {...{ message, setMessage, sendMessage }}
                className={classes.input}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Chat;
