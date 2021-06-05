import React from "react";

import { Box, Typography, makeStyles } from "@material-ui/core";

import ReactEmoji from "react-emoji";
import { firstUppercaseText } from "../utils";

const useStyles = makeStyles((theme) => ({
  textWrapper: {
    display: "flex",
    alignItems: "center",
  },
  receivedText: {
    backgroundColor: "#e2eafc",
    padding: theme.spacing(1),
    borderRadius: "10px",
    margin: theme.spacing(1),
  },
  sentText: {
    backgroundColor: "#00b4d8",
    padding: theme.spacing(1),
    borderRadius: "10px",
    margin: theme.spacing(1),
  },
}));

const Message = ({ message: { user, text }, name }) => {
  const classes = useStyles();

  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <Box className={classes.textWrapper} style={{ alignSelf: "flex-end" }}>
      <Typography>{firstUppercaseText(trimmedName)}</Typography>
      <Box className={classes.sentText}>
        <Typography>{ReactEmoji.emojify(text)}</Typography>
      </Box>
    </Box>
  ) : (
    <Box className={classes.textWrapper}>
      <Box className={classes.receivedText}>
        <Typography>{ReactEmoji.emojify(text)}</Typography>
      </Box>
      <Typography>{firstUppercaseText(user)}</Typography>
    </Box>
  );
};

export default Message;
