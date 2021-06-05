import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    width: "100%",
    height: "100vh",
  },
  card: {
    minWidth: "450px",
    height: "300px",
    marginTop: theme.spacing(8),
    backgroundColor: "white",
  },
  cardTitle: {
    textAlign: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginBottom: theme.spacing(3),
    width: "70%",
  },
}));

const Join = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardTitle} title="Let's Chat" />
        <CardContent className={classes.cardContent}>
          <TextField
            variant='outlined'
            size='small'
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.textInput}
          />
          <TextField
            variant='outlined'
            size='small'
            label='Room'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={classes.textInput}
          />
          <Link to={`/chat?name=${name}&room=${room}`}>
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            >
              Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Join;
