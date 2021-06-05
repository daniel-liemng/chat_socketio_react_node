import React from "react";

import { List, ListItem, makeStyles, Typography } from "@material-ui/core";

import { firstUppercaseText } from "../utils";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { theme } from "../theme";

const useStyles = makeStyles({
  title: {
    padding: theme.spacing(2),
  },
  icon: {
    color: "#25a18e",
    marginRight: "0.7rem",
  },
});

const People = ({ users }) => {
  const classes = useStyles();
  return (
    <List>
      <Typography className={classes.title} variant='h6'>
        People in room
      </Typography>
      {users.map((user, index) => (
        <ListItem key={index}>
          <CheckCircleOutlineIcon fontSize='default' className={classes.icon} />{" "}
          <Typography>{firstUppercaseText(user.name)}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default People;
