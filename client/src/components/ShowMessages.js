import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    minHeight: "80%",
    marginBottom: theme.spacing(7),
  },
}));

const ShowMessages = ({ messages, name }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {messages.map((message, index) => (
        <div key={index}>
          <Message {...{ message, name }} />
        </div>
      ))}
    </Box>
  );
};

export default ShowMessages;
